import { createClient, SupabaseClient } from '@supabase/supabase-js';

const metaEnv = (import.meta as any).env || {};

export function getActiveSupabaseUrl(): string {
  const localUrl = typeof localStorage !== 'undefined' ? localStorage.getItem('docplus_supabase_url') : null;
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const raw = (localUrl && localUrl.trim()) ? localUrl : envUrl;
  return normalizeSupabaseUrl(raw);
}

export function getActiveSupabaseAnonKey(): string {
  const localKey = typeof localStorage !== 'undefined' ? localStorage.getItem('docplus_supabase_anon_key') : null;
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';
  const raw = (localKey && localKey.trim()) ? localKey : envKey;
  return raw.trim() || 'placeholder-key';
}

function normalizeSupabaseUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return 'https://placeholder.supabase.co';
  }
  let trimmed = url.trim();
  if (!trimmed || trimmed === 'YOUR_SUPABASE_URL') {
    return 'https://placeholder.supabase.co';
  }
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    trimmed = `https://${trimmed}`;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin;
    }
  } catch (e) {
    console.warn('Invalid Supabase URL format provided, using fallback placeholder:', trimmed);
  }
  return 'https://placeholder.supabase.co';
}

export const isSupabaseConfigured = (): boolean => {
  const url = getActiveSupabaseUrl();
  const key = getActiveSupabaseAnonKey();
  return Boolean(
    url &&
    key &&
    url !== 'https://placeholder.supabase.co' &&
    key !== 'YOUR_SUPABASE_ANON_KEY' &&
    key !== 'placeholder-key'
  );
};

let cachedClientUrl = '';
let cachedClientKey = '';
let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  const currentUrl = getActiveSupabaseUrl();
  const currentKey = getActiveSupabaseAnonKey();

  if (cachedClient && cachedClientUrl === currentUrl && cachedClientKey === currentKey) {
    return cachedClient;
  }

  cachedClientUrl = currentUrl;
  cachedClientKey = currentKey;
  cachedClient = createClient(currentUrl, currentKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return cachedClient;
}

// Export default singleton instance
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export function saveCustomSupabaseConfig(url: string, key: string): void {
  if (typeof localStorage !== 'undefined') {
    if (url.trim()) {
      localStorage.setItem('docplus_supabase_url', url.trim());
    } else {
      localStorage.removeItem('docplus_supabase_url');
    }
    if (key.trim()) {
      localStorage.setItem('docplus_supabase_anon_key', key.trim());
    } else {
      localStorage.removeItem('docplus_supabase_anon_key');
    }
  }
}

// Database SQL Schema Helper script for user reference
export const SUPABASE_SQL_SETUP_SCRIPT = `
-- Run this script in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- 1. Create appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  patient_email TEXT,
  patient_phone TEXT NOT NULL,
  treatment_id TEXT NOT NULL,
  treatment_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  patient_name TEXT NOT NULL,
  treatment_name TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create inquiries / contact messages table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) & Policies
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public read & insert for appointments
DROP POLICY IF EXISTS "Allow public insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow users select appointments" ON public.appointments;
CREATE POLICY "Allow public insert appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users select appointments" ON public.appointments FOR SELECT USING (true);

-- Allow public read & insert for reviews
DROP POLICY IF EXISTS "Allow public insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow public select reviews" ON public.reviews;
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select reviews" ON public.reviews FOR SELECT USING (true);

-- Allow public read & insert for inquiries
DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public select inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select inquiries" ON public.inquiries FOR SELECT USING (true);
`;
