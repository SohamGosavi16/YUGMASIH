const SUPABASE_URL = 'https://eynqtscwrepndronybwp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ioQVRqBT2tQd7hlCWB5Rbg_MEXJ_4_M';

async function testSupabase() {
  console.log('Testing Supabase REST endpoints...');
  try {
    const headers = {
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json'
    };

    // Test querying tables
    const res1 = await fetch(`${SUPABASE_URL}/rest/v1/voice_guide_usage?select=*&limit=1`, { headers });
    console.log('GET voice_guide_usage status:', res1.status, await res1.text());

    const res2 = await fetch(`${SUPABASE_URL}/rest/v1/listening_history?select=*&limit=1`, { headers });
    console.log('GET listening_history status:', res2.status, await res2.text());

    const res3 = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers });
    console.log('GET auth settings status:', res3.status, await res3.text());

  } catch (e) {
    console.error('Exception during test:', e);
  }
}

testSupabase();

