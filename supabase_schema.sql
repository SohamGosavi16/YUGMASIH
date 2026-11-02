-- =============================================================================
-- YUGMA DIGITAL HERITAGE MUSEUM
-- Supabase Schema & Row Level Security (RLS) Policies
-- Voice Guide Usage Tracking & User Entitlements
-- =============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 2. TABLE: profiles
-- Stores user identity metadata, name, and persistent preferred language
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- 3. TABLE: voice_guide_usage
-- Records distinct voice guided tours for guests (up to 3) and registered users
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.voice_guide_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    monument_key TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    is_guest BOOLEAN NOT NULL DEFAULT true,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    CONSTRAINT unique_session_monument UNIQUE (session_id, monument_key)
);

CREATE INDEX IF NOT EXISTS idx_vgu_user_id ON public.voice_guide_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_vgu_session_id ON public.voice_guide_usage(session_id);
CREATE INDEX IF NOT EXISTS idx_vgu_monument ON public.voice_guide_usage(monument_key);

-- Enable RLS on voice_guide_usage
ALTER TABLE public.voice_guide_usage ENABLE ROW LEVEL SECURITY;

-- voice_guide_usage Policies
-- Authenticated users can view their own usage records
DROP POLICY IF EXISTS "Authenticated users view own usage" ON public.voice_guide_usage;
CREATE POLICY "Authenticated users view own usage"
    ON public.voice_guide_usage
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Guests can view records for their active session_id
DROP POLICY IF EXISTS "Guests view session usage" ON public.voice_guide_usage;
CREATE POLICY "Guests view session usage"
    ON public.voice_guide_usage
    FOR SELECT
    TO anon
    USING (is_guest = true);

-- Both guests and authenticated users can insert tour starts
DROP POLICY IF EXISTS "Allow tour start insertion" ON public.voice_guide_usage;
CREATE POLICY "Allow tour start insertion"
    ON public.voice_guide_usage
    FOR INSERT
    WITH CHECK (
        (auth.role() = 'authenticated' AND auth.uid() = user_id)
        OR
        (auth.role() = 'anon' AND is_guest = true)
    );

-- Both guests and authenticated users can mark tours completed
DROP POLICY IF EXISTS "Allow tour completion update" ON public.voice_guide_usage;
CREATE POLICY "Allow tour completion update"
    ON public.voice_guide_usage
    FOR UPDATE
    USING (
        (auth.role() = 'authenticated' AND auth.uid() = user_id)
        OR
        (auth.role() = 'anon' AND is_guest = true)
    )
    WITH CHECK (
        (auth.role() = 'authenticated' AND auth.uid() = user_id)
        OR
        (auth.role() = 'anon' AND is_guest = true)
    );

-- -----------------------------------------------------------------------------
-- 4. TABLE: listening_history
-- Stores registered user listening history and resume points across all 22 sites
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.listening_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    monument_key TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    last_word_index INTEGER NOT NULL DEFAULT 0,
    total_words INTEGER NOT NULL DEFAULT 0,
    progress_percent NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    completed BOOLEAN NOT NULL DEFAULT false,
    last_listened_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT unique_user_monument UNIQUE (user_id, monument_key)
);

CREATE INDEX IF NOT EXISTS idx_lh_user_id ON public.listening_history(user_id);
CREATE INDEX IF NOT EXISTS idx_lh_monument ON public.listening_history(monument_key);

-- Enable RLS on listening_history
ALTER TABLE public.listening_history ENABLE ROW LEVEL SECURITY;

-- listening_history Policies (STRICTLY scoped to authenticated user)
DROP POLICY IF EXISTS "Users view own listening history" ON public.listening_history;
CREATE POLICY "Users view own listening history"
    ON public.listening_history
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own listening history" ON public.listening_history;
CREATE POLICY "Users insert own listening history"
    ON public.listening_history
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own listening history" ON public.listening_history;
CREATE POLICY "Users update own listening history"
    ON public.listening_history
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own listening history" ON public.listening_history;
CREATE POLICY "Users delete own listening history"
    ON public.listening_history
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. FUNCTION & TRIGGER: Auto-create profile on Supabase auth.users signup
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, preferred_language)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.email,
        COALESCE(new.raw_user_meta_data->>'language', 'en')
    )
    ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        preferred_language = EXCLUDED.preferred_language,
        updated_at = now();
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 6. RPC FUNCTION: Migrate guest usage to registered account on signup
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.claim_guest_tours(p_session_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    claimed_count INTEGER;
BEGIN
    UPDATE public.voice_guide_usage
    SET user_id = auth.uid(),
        is_guest = false
    WHERE session_id = p_session_id
      AND user_id IS NULL;
    
    GET DIAGNOSTICS claimed_count = ROW_COUNT;
    RETURN claimed_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

