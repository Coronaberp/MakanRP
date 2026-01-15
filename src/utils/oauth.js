// PKCE helpers and OAuth helper functions for SPA authorization code + PKCE
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return hash;
}

export function randomString(length = 64) {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (dec) => ('0' + dec.toString(16)).slice(-2)).join('');
}

export async function createCodeChallenge(verifier) {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
}

export async function authorize({ authEndpoint, clientId, redirectUri, scope, extraParams, provider } = {}) {
  const codeVerifier = randomString(64);
  const codeChallenge = await createCodeChallenge(codeVerifier);
  sessionStorage.setItem('pkce_code_verifier', codeVerifier);

  const state = randomString(16);
  sessionStorage.setItem('oauth_state', state);
  if (provider) sessionStorage.setItem('oauth_provider', provider);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
  });

  // merge any provider-specific additional params (e.g., prompt, access_type, allow_signup)
  if (extraParams && typeof extraParams === 'object') {
    Object.keys(extraParams).forEach((k) => params.set(k, extraParams[k]));
  }

  window.location.href = `${authEndpoint}?${params.toString()}`;
}

export async function exchangeToken({ tokenEndpoint, clientId, redirectUri, code }) {
  const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
  if (!codeVerifier) throw new Error('Missing PKCE code verifier in sessionStorage');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  // Some providers (GitHub) expect Accept: application/json to return JSON
  const res = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: body.toString(),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Token endpoint error: ${res.status} ${text}`);
  }

  // Try parse JSON first, fall back to urlencoded response
  try {
    return JSON.parse(text);
  } catch (_) {
    const parsed = Object.fromEntries(new URLSearchParams(text));
    return parsed;
  }
}
