import React, { useState } from 'react';
import { CLINIC_INFO } from '../data';
import ClinicMap from './ClinicMap';
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldAlert, Heart, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Get in Touch
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Contact Our Faisalabad Clinic
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Have an inquiry, feedback, or need coordinate maps? Connect with our front-desk operators or visit our facility.
        </p>
      </section>

      {/* Main Grid: Info widgets and Quick contact form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left side: Contact widgets */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#F6D6D8]/15 p-8 space-y-6 shadow-xs">
            <h3 className="text-lg font-semibold text-[#2E2E2E] border-b border-gray-100 pb-3">Clinic Coordinates</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              {/* Call */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/20 flex items-center justify-center shrink-0 text-[#A8C3A0]">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Helpline Phone</span>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="font-semibold text-slate-800 hover:text-[#A8C3A0] transition-colors block">
                    {CLINIC_INFO.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/20 flex items-center justify-center shrink-0 text-emerald-500">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">WhatsApp Instant Desk</span>
                  <a href={`https://wa.me/${CLINIC_INFO.whatsapp.replace('+', '').replace(/ /g, '')}`} target="_blank" rel="noreferrer" className="font-semibold text-emerald-600 hover:underline block">
                    {CLINIC_INFO.whatsapp}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/20 flex items-center justify-center shrink-0 text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Official Email</span>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="font-semibold text-slate-800 hover:text-[#A8C3A0] transition-colors block">
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              {/* Opening hours */}
              <div className="flex gap-4 items-start pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/20 flex items-center justify-center shrink-0 text-amber-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Weekly Opening Hours</span>
                  <div className="space-y-1.5 text-xs text-[#2E2E2E]/80">
                    {CLINIC_INFO.openingHours.map((oh, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{oh.days}:</span>
                        <strong className="font-medium">{oh.hours}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency support badge */}
          <div className="bg-[#FAF8F8] border border-red-200 rounded-3xl p-6 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-500 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-red-600 uppercase font-mono tracking-wider">Post-Procedure Complications?</h4>
              <p className="text-[#2E2E2E]/70 leading-relaxed">
                If you experience unexpected complications after active laser or chemical resurfacing, call our private nurse on-duty helpline right away:
              </p>
              <a href={`tel:${CLINIC_INFO.emergencyContact.split(' ')[0]}`} className="font-mono font-bold text-red-600 hover:underline block text-sm">
                {CLINIC_INFO.emergencyContact}
              </a>
            </div>
          </div>
        </div>

        {/* Right side: Quick messaging contact form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F6D6D8]/15 p-8 shadow-xs flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Send Front Desk a Message</h3>
              <p className="text-xs text-gray-500">We usually respond to inquiries within 2 working hours.</p>
            </div>

            {success && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-xs flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Your clinical inquiry has been dispatched. A coordinator will email you shortly!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2E2E2E]">Your Full Name</label>
                <input
                  id="contact-input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full text-xs p-3 rounded-xl border border-[#F6D6D8]/40 focus:outline-hidden focus:border-[#A8C3A0]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2E2E2E]">Email Address</label>
                <input
                  id="contact-input-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@domain.com"
                  className="w-full text-xs p-3 rounded-xl border border-[#F6D6D8]/40 focus:outline-hidden focus:border-[#A8C3A0]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#2E2E2E]">Inquiry / Feedback Message</label>
                <textarea
                  id="contact-input-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What would you like to ask our dermatologists or desk coordinators?"
                  className="w-full text-xs p-3 rounded-xl border border-[#F6D6D8]/40 focus:outline-hidden focus:border-[#A8C3A0]"
                />
              </div>
            </div>

            <button
              id="btn-contact-submit"
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#F6D6D8] font-semibold text-xs tracking-wider uppercase rounded-full transition-all shadow-md"
            >
              Send Inquiry <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Socials bar */}
          <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>Connect on social coordinates:</span>
            <div className="flex gap-4 font-mono font-bold text-slate-800">
              <a href={CLINIC_INFO.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#A8C3A0]">Instagram</a>
              <a href={CLINIC_INFO.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-[#A8C3A0]">Facebook</a>
              <a href={CLINIC_INFO.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-[#A8C3A0]">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Clinic Map container block */}
      <section className="space-y-6 pt-6">
        <div className="text-center">
          <h3 className="text-xl font-display font-semibold text-[#2E2E2E]">Interactive Clinic Location Map</h3>
          <p className="text-xs text-gray-500 mt-1">Easily find us with our custom-built Faisalabad vector directory map.</p>
        </div>
        <ClinicMap />
      </section>
    </div>
  );
}
