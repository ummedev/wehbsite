import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, UserPlus, AlertCircle, CheckCircle2, Shield, Sparkles, Copy, Database } from 'lucide-react';
import { supabase, isSupabaseConfigured, SUPABASE_SQL_SETUP_SCRIPT } from '../lib/supabase';

interface SupabaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function SupabaseAuthModal({ isOpen, onClose, onSuccess }: SupabaseAuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'sql'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  const configured = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    if (!configured) {
      setError('Supabase credentials are not set in your environment settings (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY).');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || email.split('@')[0],
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          setSuccessMsg('Account created successfully! Check your email or log in.');
          onSuccess(data.user);
          setTimeout(() => {
            onClose();
          }, 1200);
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        if (data?.user) {
          setSuccessMsg('Successfully logged in with Supabase!');
          onSuccess(data.user);
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] shadow-2xl max-w-md w-full overflow-hidden relative"
        >
          {/* Header */}
          <div className="bg-[#1A3121] border-b border-[#C5A880]/30 p-6 text-center relative text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-3 text-[#C5A880]">
              <Shield className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-serif text-white">
              {mode === 'sql' ? 'Supabase Database Schema' : mode === 'login' ? 'Supabase Sanctuary Login' : 'Create Supabase Account'}
            </h3>
            <p className="text-xs text-[#EAE4DC] mt-1">
              {configured ? 'Connected to Supabase Authentication & Database' : 'Supabase Credentials Pending in Environment'}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              <span>Supabase Integration Active</span>
            </div>
          </div>

          <div className="p-6">
            {!configured && (
              <div className="mb-5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Supabase Environment Variables Required
                </div>
                <p className="text-[11px] text-amber-700">
                  Please add <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> in your project settings to complete live connection.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {mode === 'sql' ? (
              <div className="space-y-4">
                <p className="text-xs text-[#6E6A63] leading-relaxed">
                  Run this SQL script in your <strong>Supabase SQL Editor</strong> to create the required <code>appointments</code> and <code>reviews</code> database tables with Row Level Security:
                </p>

                <div className="relative">
                  <pre className="bg-[#1C1917] text-gray-200 p-4 rounded-xl text-[10px] font-mono max-h-48 overflow-y-auto leading-normal">
                    {SUPABASE_SQL_SETUP_SCRIPT}
                  </pre>

                  <button
                    onClick={handleCopySql}
                    className="absolute top-2 right-2 px-2.5 py-1.5 bg-[#1A3121] hover:bg-[#26452F] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-xs transition-all border border-[#C5A880]/30 cursor-pointer"
                  >
                    {copiedSql ? <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" /> : <Copy className="w-3.5 h-3.5 text-[#C5A880]" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setMode('login')}
                  className="w-full py-2.5 text-xs font-bold text-[#1A3121] hover:underline text-center block cursor-pointer"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1C1917]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Zainab Fatima"
                      className="w-full text-xs rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden focus:border-[#1A3121] bg-white"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1917]">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden focus:border-[#1A3121] bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C1917]">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden focus:border-[#1A3121] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-[#1A3121] hover:bg-[#26452F] disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md border border-[#C5A880]/30 cursor-pointer"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : mode === 'login' ? (
                    <>
                      <LogIn className="w-4 h-4 text-[#C5A880]" />
                      <span>Log In with Supabase</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 text-[#C5A880]" />
                      <span>Sign Up with Supabase</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Toggle Modes */}
            <div className="mt-6 pt-4 border-t border-[#E5DFD5] flex flex-col gap-2 text-center text-xs">
              {mode === 'login' ? (
                <p className="text-[#6E6A63]">
                  Don't have a Supabase account yet?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setError('');
                    }}
                    className="font-bold text-[#1A3121] hover:underline cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              ) : mode === 'signup' ? (
                <p className="text-[#6E6A63]">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className="font-bold text-[#1A3121] hover:underline cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              ) : null}

              {mode !== 'sql' && (
                <button
                  onClick={() => setMode('sql')}
                  className="mt-1 text-[11px] text-[#6E6A63] hover:text-[#1C1917] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>View Supabase SQL Table Setup Script</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
