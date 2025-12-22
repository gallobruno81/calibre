
import { createClient } from '@supabase/supabase-js';

// Keys for local storage
export const LS_SUPABASE_URL = 'calibre_sb_url';
export const LS_SUPABASE_KEY = 'calibre_sb_key';

// Helper to safely access process.env
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return typeof process !== 'undefined' && process.env ? process.env[key] : undefined;
  } catch (e) {
    return undefined;
  }
};

const getStoredConfig = () => {
  try {
    const url = localStorage.getItem(LS_SUPABASE_URL);
    let key = localStorage.getItem(LS_SUPABASE_KEY);
    
    // CRITICAL FIX: Detect and remove the incompatible 'sb_publishable' key if it exists in storage
    if (key && key.startsWith('sb_publishable')) {
        console.warn('Incompatible key detected. Removing from storage.');
        localStorage.removeItem(LS_SUPABASE_KEY);
        key = null;
    }

    return { url, key };
  } catch (e) {
    return { url: null, key: null };
  }
}

const envUrl = getEnv('SUPABASE_URL');
const envKey = getEnv('SUPABASE_ANON_KEY');
const stored = getStoredConfig();

// Use placeholders if no valid config is found. 
// WE DO NOT USE THE 'sb_publishable' key anymore as it crashes the library.
const finalUrl = envUrl || stored.url;
const finalKey = envKey || stored.key;

export const isSupabaseConfigured = () => {
  return !!finalUrl && !!finalKey && finalUrl.length > 0 && finalKey.length > 0 && !finalKey.startsWith('sb_');
};

// Ensure we never pass null/undefined or invalid keys to createClient
// Passing a dummy string is safer than a malformed key
const safeUrl = finalUrl && finalUrl.length > 0 ? finalUrl : 'https://placeholder.supabase.co';
const safeKey = finalKey && finalKey.length > 0 ? finalKey : 'placeholder-jwt-token';

// Initialize the client
export const supabase = createClient(safeUrl, safeKey);

export const saveSupabaseConfig = (newUrl: string, newKey: string) => {
  if (newKey.startsWith('sb_')) {
      alert("Error: Esa parece ser una 'Publishable Key'. Supabase necesita la 'anon / public' key que empieza con 'ey...'");
      return;
  }
  localStorage.setItem(LS_SUPABASE_URL, newUrl);
  localStorage.setItem(LS_SUPABASE_KEY, newKey);
  window.location.reload(); // Force reload to re-init client
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(LS_SUPABASE_URL);
  localStorage.removeItem(LS_SUPABASE_KEY);
  window.location.reload();
};
