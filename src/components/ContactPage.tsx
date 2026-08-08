import React, { useState } from 'react';
import { CLINIC_INFO } from '../data';
import ClinicMap from './ClinicMap';
import { Phone, MessageSquare, Mail, Clock, ShieldAlert, Send, CheckCircle, Database, Sparkles, Copy, X, AlertCircle, Settings, Check } from 'lucide-react';
import { 
  supabase, 
  isSupabaseConfigured, 
  SUPABASE_SQL_SETUP_SCRIPT, 
  getActiveSupabaseUrl, 
  getActiveSupabaseAnonKey, 
  saveCustomSupabaseConfig 
} from '../lib/supabase';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Editable Supabase credentials state in modal
  const [inputUrl, setInputUrl] = useState(getActiveSupabaseUrl());
  const [inputKey, setInputKey] = useState(getActiveSupabaseAnonKey());
  const [configSaved, setConfigSaved] = useState(false);

  const configured = isSupabaseConfigured();
  const currentActiveUrl = getActiveSupabaseUrl();

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomSupabaseConfig(inputUrl, inputKey);
    setConfigSaved(true);
    setErrorMsg('');
    setTimeout(() => {
      setConfigSaved(false);
      setShowSqlModal(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    // 1. Always save locally first so user inquiry is never lost
    const newInquiry = {
      id: `INQ-${Date.now()}`,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const existingInquiries = JSON.parse(localStorage.getItem('docplus_inquiries') || '[]');
      localStorage.setItem('docplus_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }

    if (!configured) {
      // Local mode confirmation
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 8000);
      return;
    }

    // 2. Attempt Supabase Backend save
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      // Insert into appointments table in Supabase so it appears in Supabase Table Editor
      const { error: apptError } = await supabase
        .from('appointments')
        .insert([
          {
            patient_name: name,
            patient_email: email,
            patient_phone: 'Via Contact Form',
            treatment_id: 'inquiry',
            treatment_name: 'Contact Form Inquiry',
            date: todayStr,
            time: timeStr,
            notes: message,
            status: 'new_inquiry',
          },
        ]);

      // Also insert into inquiries table in Supabase
      const { error: inqError } = await supabase
        .from('inquiries')
        .insert([
          {
            name,
            email,
            message,
            status: 'unread',
          },
        ]);

      if (apptError && inqError) {
        if (apptError.code === '42P01' || inqError.code === '42P01') {
          setErrorMsg('Supabase table missing. Click "View SQL Setup" to run table creation script in your Supabase SQL Editor!');
        } else {
          setErrorMsg(`Supabase Notice: ${apptError.message || inqError.message}`);
        }
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      console.error('Supabase save error:', err);
      const isFetchErr = String(err).includes('Failed to fetch') || String(err.message).includes('Failed to fetch');
      if (isFetchErr) {
        setErrorMsg('Could not reach Supabase endpoint. Please verify your Supabase URL (e.g. https://sebycurnfactdrrzzag.supabase.co) and anon key in Supabase Settings.');
      } else {
        setErrorMsg(err.message || 'Error communicating with Supabase.');
      }
      // Still show success for user because local copy was saved
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-white">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          Contact Our Faisalabad Sanctuary
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Have an inquiry, feedback, or need direction? Connect with our desk team or visit our clinical facility.
        </p>
      </section>

      {/* Main Grid: Info widgets and Quick contact form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-[#1C1917]">
        {/* Left side: Contact widgets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-serif text-[#1C1917] border-b border-[#E5DFD5] pb-3">Sanctuary Information</h3>
            
            <div className="space-y-5 text-xs sm:text-sm">
              {/* Call */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">Helpline Phone</span>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="font-bold text-[#1C1917] hover:text-[#C5A880] transition-colors block">
                    {CLINIC_INFO.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">WhatsApp Desk</span>
                  <a href={`https://wa.me/${CLINIC_INFO.whatsapp.replace('+', '').replace(/ /g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-[#1A3121] hover:underline block">
                    {CLINIC_INFO.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">Official Email</span>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="font-bold text-[#1C1917] hover:text-[#C5A880] transition-colors block">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex gap-4 items-start pt-2 border-t border-[#E5DFD5]">
                <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">Weekly Operating Hours</span>
                  <div className="space-y-1.5 text-xs text-[#1C1917]">
                    {CLINIC_INFO.openingHours.map((oh, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{oh.days}:</span>
                        <strong className="font-bold">{oh.hours}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency support badge */}
          <div className="bg-[#FBF9F5] border border-red-300 rounded-[28px] p-6 flex gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-red-700 uppercase tracking-wider">Emergency Complications?</h4>
              <p className="text-[#1C1917] leading-relaxed">
                If you experience unexpected complications after active laser or chemical resurfacing, call our private nurse on-duty helpline:
              </p>
              <a href={`tel:${CLINIC_INFO.emergencyContact.split(' ')[0]}`} className="font-bold text-red-700 hover:underline block text-sm">
                {CLINIC_INFO.emergencyContact}
              </a>
            </div>
          </div>
        </div>

        {/* Right side: Quick messaging contact form */}
        <div className="lg:col-span-7 bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          
          {/* Supabase Connection Banner */}
          <div className="mb-6 p-3.5 rounded-full bg-white border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${configured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-bold text-[#1C1917]">
                {configured ? 'Supabase Integration: LIVE' : 'Supabase Environment: Pending Credentials'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowSqlModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A3121] text-[#C5A880] hover:bg-[#26452F] font-bold text-[11px] transition-all cursor-pointer border border-[#C5A880]/30"
            >
              <Database className="w-3.5 h-3.5" /> View Supabase SQL Script
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif text-[#1C1917]">Send Us a Message</h3>
              <p className="text-xs text-[#6E6A63]">We usually respond to inquiries within 2 working hours.</p>
            </div>

            {errorMsg && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSqlModal(true)}
                  className="px-2.5 py-1 bg-amber-600 text-white font-bold rounded-full text-[10px] shrink-0"
                >
                  View SQL Setup
                </button>
              </div>
            )}

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-xs flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {configured 
                    ? 'Your clinical inquiry has been directly recorded in your Supabase backend database!' 
                    : 'Your inquiry has been recorded locally. Connect VITE_SUPABASE_URL to sync with live Supabase database.'}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">Your Full Name</label>
                <input
                  id="contact-input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full text-xs p-3.5 rounded-full border border-[#E5DFD5] bg-white focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">Email Address</label>
                <input
                  id="contact-input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@domain.com"
                  className="w-full text-xs p-3.5 rounded-full border border-[#E5DFD5] bg-white focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#1C1917]">Inquiry Message</label>
                <textarea
                  id="contact-input-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you like to ask our dermatologists or desk coordinators?"
                  className="w-full text-xs p-3.5 rounded-2xl border border-[#E5DFD5] bg-white focus:outline-hidden focus:border-[#C5A880]"
                />
              </div>
            </div>

            <button
              id="btn-contact-submit"
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A3121] hover:bg-[#26452F] disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase rounded-full transition-all shadow-md border border-[#C5A880]/30 cursor-pointer"
            >
              {submitting ? 'Sending Inquiry...' : 'Send Inquiry'} <Send className="w-4 h-4 text-[#C5A880]" />
            </button>
          </form>

          {/* Socials bar */}
          <div className="pt-6 mt-6 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6A63]">
            <span>Connect on social media:</span>
            <div className="flex gap-4 font-bold text-[#1C1917]">
              <a href={CLINIC_INFO.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#C5A880]">Instagram</a>
              <a href={CLINIC_INFO.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-[#C5A880]">Facebook</a>
              <a href={CLINIC_INFO.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-[#C5A880]">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* SQL & Connection Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D180E]/90 backdrop-blur-md">
          <div className="bg-[#FBF9F5] rounded-[32px] border border-[#E5DFD5] shadow-2xl max-w-xl w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto text-[#1C1917]">
            <button
              onClick={() => setShowSqlModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
              <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center border border-[#C5A880]/30">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-[#1C1917]">Supabase Connection & SQL Setup</h3>
                <p className="text-xs text-[#6E6A63]">Connect your Supabase project and create backend tables</p>
              </div>
            </div>

            {/* Config Form */}
            <form onSubmit={handleSaveConfig} className="bg-white border border-[#E5DFD5] rounded-2xl p-4 space-y-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
                <Settings className="w-4 h-4 text-[#1A3121]" />
                <span>Supabase API Credentials</span>
              </div>
              
              <div className="space-y-1">
                <label className="font-semibold text-[#6E6A63] block text-[11px]">Project URL (e.g. https://sebycurnfactdrrzzag.supabase.co)</label>
                <input 
                  type="text" 
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5DFD5] rounded-xl text-xs font-mono focus:border-[#C5A880] focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#6E6A63] block text-[11px]">Anon / Public Key</label>
                <input 
                  type="text" 
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full p-2.5 bg-[#FBF9F5] border border-[#E5DFD5] rounded-xl text-xs font-mono focus:border-[#C5A880] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-500">
                  {configSaved ? <span className="text-emerald-600 font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Saved & Connected!</span> : 'Saves locally to connect instantly'}
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A3121] hover:bg-[#26452F] text-white font-bold rounded-full text-xs transition-all shadow-xs border border-[#C5A880]/30 cursor-pointer"
                >
                  Save Credentials
                </button>
              </div>
            </form>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#1C1917]">Supabase SQL Table Schema Script</h4>
              <p className="text-xs text-[#6E6A63] leading-relaxed">
                Open your Supabase project dashboard at <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-[#1A3121] underline font-bold">supabase.com/dashboard</a>, navigate to <strong>SQL Editor</strong>, paste this script, and click <strong>Run</strong>:
              </p>
            </div>

            <div className="relative">
              <pre className="bg-[#122315] text-[#EAE4DC] p-4 rounded-2xl text-[10px] font-mono max-h-48 overflow-y-auto leading-normal border border-[#C5A880]/30">
                {SUPABASE_SQL_SETUP_SCRIPT}
              </pre>

              <button
                type="button"
                onClick={handleCopySql}
                className="absolute top-2 right-2 px-3 py-1.5 bg-[#1A3121] hover:bg-[#26452F] text-[#C5A880] text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm transition-all border border-[#C5A880]/30 cursor-pointer"
              >
                {copiedSql ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied!' : 'Copy SQL Script'}</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="px-5 py-2.5 bg-[#1A3121] text-white font-bold text-xs rounded-full cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Clinic Map container block */}
      <section className="space-y-6 pt-6">
        <div className="text-center">
          <h3 className="text-2xl font-serif text-white">Interactive Clinic Location Map</h3>
          <p className="text-xs text-[#EAE4DC] mt-1">Easily find us with our custom Faisalabad map directory.</p>
        </div>
        <ClinicMap />
      </section>
    </div>
  );
}


