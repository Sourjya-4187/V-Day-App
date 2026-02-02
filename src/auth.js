/**
 * Client-side only "auth" for the Valentine app.
 * No backend, no API – hardcoded credentials, state in localStorage.
 * NOT real authentication.
 */

const AUTH_STORAGE_KEY = 'valentine-logged-in';

/** Hardcoded credentials (for demo only). */
const CREDENTIALS = {
  username: 'shash',
  password: '9438860142',
};

export function isLoggedIn() {
  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setLoggedIn() {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } catch {
    // ignore
  }
}

/**
 * Validate username and password (client-side only).
 * Returns true if match, false otherwise.
 */
export function validate(username, password) {
  const u = String(username ?? '').trim().toLowerCase();
  const p = String(password ?? '').trim();
  return u === CREDENTIALS.username.toLowerCase() && p === CREDENTIALS.password;
}

/**
 * Clear all client-side data and "log out".
 * Clears: localStorage, sessionStorage, cookies, Cache API (if available).
 * Call this before returning to the login screen.
 */
export function clearAllAndLogout() {
  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch {
    // ignore
  }
  // Clear all cookies (document.cookie is the only way from JS)
  try {
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^\s+/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  } catch {
    // ignore
  }
  // Clear Cache API (service worker caches) if available
  try {
    if ('caches' in window && typeof caches.keys === 'function') {
      caches.keys().then((names) => {
        names.forEach((name) => caches.delete(name));
      });
    }
  } catch {
    // ignore
  }
}
