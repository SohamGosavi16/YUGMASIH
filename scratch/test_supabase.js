const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ioQVRqBT2tQd7hlCWB5Rbg_MEXJ_4_M';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function testSupabase() {
  console.log('Testing Supabase connection...');
  try {
    // Check auth status
    const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
    console.log('getSession:', { sessionData, sessionErr });

    // Test anonymous sign in
    const { data: anonData, error: anonErr } = await supabase.auth.signInAnonymously();
    console.log('signInAnonymously:', { user: anonData?.user?.id, is_anonymous: anonData?.user?.is_anonymous, anonErr: anonErr?.message });

    // Test listing existing tables / querying
    const { data: tablesData, error: tablesErr } = await supabase.from('voice_guide_usage').select('*').limit(1);
    console.log('Table voice_guide_usage:', { tablesData, tablesErr: tablesErr?.message });

    const { data: historyData, error: historyErr } = await supabase.from('listening_history').select('*').limit(1);
    console.log('Table listening_history:', { historyData, historyErr: historyErr?.message });

    const { data: profilesData, error: profilesErr } = await supabase.from('profiles').select('*').limit(1);
    console.log('Table profiles:', { profilesData, profilesErr: profilesErr?.message });

  } catch (e) {
    console.error('Exception during test:', e);
  }
}

testSupabase();

