-- =============================================================================
-- YUGMA DIGITAL HERITAGE MUSEUM
-- Migration: Smart Heritage Journey Planner (user_journeys)
-- Author: Yugma Core Heritage Engineering
-- Date: 2026-11-06
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'My Heritage Journey',
    start_location JSONB NOT NULL DEFAULT '{"name": "New Delhi", "lat": 28.6139, "lng": 77.2090}'::jsonb,
    duration_days INTEGER NOT NULL DEFAULT 3,
    pace TEXT NOT NULL DEFAULT 'balanced' CHECK (pace IN ('relaxed', 'balanced', 'intensive')),
    travel_mode TEXT NOT NULL DEFAULT 'car' CHECK (travel_mode IN ('car', 'transit', 'flight', 'bike', 'walking')),
    selected_monuments JSONB NOT NULL DEFAULT '[]'::jsonb,
    itinerary_data JSONB NOT NULL DEFAULT '{"days": []}'::jsonb,
    notes TEXT DEFAULT '',
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices for rapid user queries and sorting
CREATE INDEX IF NOT EXISTS idx_user_journeys_user_id ON public.user_journeys(user_id);
CREATE INDEX IF NOT EXISTS idx_user_journeys_created_at ON public.user_journeys(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_journeys_is_public ON public.user_journeys(is_public) WHERE is_public = true;

-- Enable Row Level Security
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY POLICIES
-- -----------------------------------------------------------------------------

-- 1. SELECT: Users can view their own journeys, or public journeys
DROP POLICY IF EXISTS "Users can view own or public journeys" ON public.user_journeys;
CREATE POLICY "Users can view own or public journeys"
    ON public.user_journeys
    FOR SELECT
    USING (
        (auth.role() = 'authenticated' AND auth.uid() = user_id)
        OR
        (is_public = true)
    );

-- 2. INSERT: Authenticated users can insert journeys for themselves
DROP POLICY IF EXISTS "Users can insert own journeys" ON public.user_journeys;
CREATE POLICY "Users can insert own journeys"
    ON public.user_journeys
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- 3. UPDATE: Authenticated users can update only their own journeys
DROP POLICY IF EXISTS "Users can update own journeys" ON public.user_journeys;
CREATE POLICY "Users can update own journeys"
    ON public.user_journeys
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 4. DELETE: Authenticated users can delete only their own journeys
DROP POLICY IF EXISTS "Users can delete own journeys" ON public.user_journeys;
CREATE POLICY "Users can delete own journeys"
    ON public.user_journeys
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- TRIGGER: Automatically update `updated_at` on row change
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_user_journey_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_user_journey_updated ON public.user_journeys;
CREATE TRIGGER on_user_journey_updated
    BEFORE UPDATE ON public.user_journeys
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_journey_updated_at();

