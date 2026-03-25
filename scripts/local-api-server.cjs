const http = require('http');
const { URL } = require('url');

const PORT = process.env.LOCAL_API_PORT || 3001;
const COUNTER_BASE = process.env.COUNTER_BASE || 'https://api.counterapi.dev/v2/dikshitas-team-3462/dikshita-page-visior';
const API_KEY = process.env.COUNTER_API_KEY;

function jsonRes(res, status, obj) {
  const s = JSON.stringify(obj);
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(s);
}

async function proxyIncrement() {
  const headers = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  headers['Content-Type'] = 'application/json';
  const resp = await fetch(`${COUNTER_BASE}/up`, { method: 'GET', headers });
  const data = await resp.json();
  return data;
}

async function proxyGet() {
  const headers = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  headers['Content-Type'] = 'application/json';
  const resp = await fetch(`${COUNTER_BASE}`, { headers });
  const data = await resp.json();
  return data;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`);
  if (url.pathname === '/api/visitors' && req.method === 'POST') {
    // consume body
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      await proxyIncrement();
      return jsonRes(res, 200, { success: true });
    } catch (err) {
      console.error('increment error', err);
      return jsonRes(res, 500, { success: false, error: 'increment failed' });
    }
  }

  if (url.pathname === '/api/visitors' && req.method === 'GET') {
    try {
      const data = await proxyGet();
      return jsonRes(res, 200, { uniqueVisitors: data?.data?.up_count ?? 0 });
    } catch (err) {
      console.error('get error', err);
      return jsonRes(res, 500, { error: 'failed to fetch stats' });
    }
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Local API proxy listening on http://localhost:${PORT}`);
  console.log(`COUNTER_BASE=${COUNTER_BASE}`);
});
