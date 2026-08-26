/**
 * Cloudflare Pages Function — /api/quote
 * Forwards a GXON lead (quote request) to the DingTalk group robot.
 *
 * Frontend POSTs a JSON body: { source: string, items: [{label, value}] }
 * This function builds a DingTalk markdown message and POSTs it to the
 * configured robot webhook.
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   DINGTALK_WEBHOOK   — full robot webhook URL (access_token included)
 *
 * The DingTalk robot uses the security rule "自定义关键词 (custom keyword)".
 * To satisfy it, every message deliberately contains "GXON询单".
 */

const KEYWORD = 'GXON询单';

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

/** Build the DingTalk markdown payload from parsed lead items. */
function buildPayload(items) {
  const lines = ['### ' + KEYWORD + ' 新询价'];
  const seen = {};
  (items || []).forEach(function (it) {
    if (!it || !it.value) return;
    if (seen[it.label]) return; // dedupe same label
    seen[it.label] = true;
    lines.push('- **' + it.label + '**: ' + it.value);
  });
  lines.push('> 来源：' + KEYWORD);
  return {
    msgtype: 'markdown',
    markdown: {
      title: KEYWORD + ' 新询价',
      text: lines.join('\n')
    }
  };
}

export async function onRequestPost(context) {
  const request = context.request;
  const env = context.env || {};

  const webhook = env.DINGTALK_WEBHOOK;
  if (!webhook) {
    return json(500, { ok: false, error: 'DINGTALK_WEBHOOK not configured' });
  }

  let payload;
  try {
    const body = await request.json();
    payload = buildPayload(body && body.items);
  } catch (err) {
    return json(400, { ok: false, error: 'invalid JSON body' });
  }

  const MAX_ATTEMPTS = 2;
  let lastErr = null;
  let respJson = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const resp = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const text = await resp.text();
      let parsed = null;
      try { parsed = JSON.parse(text); } catch (e) { parsed = null; }
      if (resp.ok && parsed && parsed.errcode === 0) {
        return json(200, { ok: true });
      }
      lastErr = 'DingTalk responded ' + resp.status + ': ' + text;
      respJson = parsed;
    } catch (err) {
      lastErr = 'network error: ' + err.message;
    }
    await new Promise(function (r) { setTimeout(r, 400); }); // brief backoff
  }

  // Return 502 when DingTalk cannot be reached after retries.
  const detail = (respJson && respJson.errmsg) ? respJson.errmsg : lastErr;
  return json(502, { ok: false, error: 'dingtalk delivery failed', detail });
}

// Allow CORS preflight (harmless, keeps the endpoint flexible).
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}