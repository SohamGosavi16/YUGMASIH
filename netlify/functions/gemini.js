/**
 * YUGMA Netlify Serverless Function: Gemini Multi-Agent Proxy
 * 
 * Securely communicates with Google Gemini API using the server-side
 * environment variable `GEMINI_API_KEY`. The API key is NEVER exposed
 * to client-side code, network requests, or repository commits.
 * 
 * Endpoint:
 * - Production / Netlify Dev: /.netlify/functions/gemini
 * - Rewritten clean route:   /api/gemini
 */

const https = require('https');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

/**
 * Make an HTTPS POST request with a timeout
 */
function makeHttpsRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 14000
    };

    const req = https.request(options, (res) => {
      let rawData = '';
      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(rawData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data: parsed });
          } else {
            reject({ statusCode: res.statusCode, data: parsed, message: `HTTP Error ${res.statusCode}` });
          }
        } catch (err) {
          reject({ statusCode: res.statusCode, raw: rawData, message: 'Invalid JSON response from upstream API' });
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject({ statusCode: 504, message: 'Request to Gemini API timed out' });
    });

    req.on('error', (err) => {
      reject({ statusCode: 502, message: err.message || 'Network error connecting to Gemini API' });
    });

    req.write(postData);
    req.end();
  });
}

exports.handler = async function (event, context) {
  // 1. Handle CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // 2. Health Check (GET)
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        status: 'ok',
        service: 'yugma-gemini-serverless',
        configured: Boolean(apiKey && apiKey.trim().length > 5)
      })
    };
  }

  // 3. Only allow POST requests for generation
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  // 4. Validate Environment Variable
  if (!apiKey || !apiKey.trim()) {
    console.error('[YUGMA AI] GEMINI_API_KEY is not defined in server environment variables.');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'GEMINI_API_KEY is not configured on the server. Please set it in Netlify Site Configuration -> Environment Variables.',
        code: 'MISSING_API_KEY'
      })
    };
  }

  // 5. Parse and Validate Request Payload
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  const prompt = (body.prompt || body.query || '').trim();
  const systemPrompt = body.systemPrompt || 'You are YUGMA AI, an expert, respectful guide for Indian cultural heritage.';
  const agentName = body.agentName || 'YUGMA AI';
  const agentTitle = body.agentTitle || 'Virtual Heritage Guide';

  if (!prompt) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing required field: prompt' })
    };
  }

  const history = Array.isArray(body.history) ? body.history : [];
  const contents = [];

  // Include up to last 6 dialogue turns for true multi-turn context
  const recentHistory = history.slice(-6);
  recentHistory.forEach(msg => {
    if (msg.role && msg.content && typeof msg.content === 'string') {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content.trim() }]
      });
    }
  });

  // Append current user turn
  contents.push({
    role: 'user',
    parts: [
      {
        text: contents.length === 0
          ? `User is exploring Indian heritage on the YUGMA platform. Answer the following question from your perspective as ${agentName} (${agentTitle}):\n\n${prompt}`
          : prompt
      }
    ]
  });

  const geminiPayload = {
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600,
      topP: 0.95
    }
  };

  // 6. Call Gemini API with Fast Production Models & Fallbacks
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-3.5-flash', 'gemini-3.8-flash'];
  let lastError = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;
    try {
      const response = await makeHttpsRequest(url, geminiPayload);
      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            success: true,
            text: text.trim(),
            model: model,
            agentName: agentName
          })
        };
      }
    } catch (err) {
      lastError = err;
      console.warn(`[YUGMA AI] Model ${model} failed, attempting next model if available:`, err.message || err);
    }
  }

  // 7. If all models fail, return structured error
  console.error('[YUGMA AI] All Gemini models failed:', lastError);
  return {
    statusCode: lastError?.statusCode || 502,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      error: 'Upstream Gemini API error',
      details: lastError?.message || 'Failed to generate response',
      fallbackAvailable: true
    })
  };
};

