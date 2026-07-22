import React from 'react';
import { CLINIC_INFO } from '../data';
import { ShieldCheck, Target, Heart, Award, Sparkles, Flame, CheckCircle, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      {/* Intro Hero banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Decade of Excellence
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          About Doc+ Dermatology
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Pioneering clinical excellence, advanced lasers, and authentic aesthetic restorations in Faisalabad, Pakistan.
        </p>
      </section>

      {/* History Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-lg border border-[#F6D6D8]/20">
            <img 
              src="/src/assets/images/clinic_interior_1784604026769.jpg" 
              alt="Doc+ Clinic Environment" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white border border-[#F6D6D8]/40 p-4 rounded-2xl shadow-md max-w-xs hidden sm:block">
            <span className="block text-2xl font-display font-bold text-[#A8C3A0]">15,000+</span>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-[#2E2E2E]/60">Patients Restored Safely</span>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-mono font-bold text-[#A8C3A0] uppercase tracking-widest block">Our Clinical History</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#2E2E2E]">
            A Legacy of Skin Science in Faisalabad
          </h2>
          <p className="text-xs sm:text-sm text-[#2E2E2E]/70 leading-relaxed whitespace-pre-line">
            {CLINIC_INFO.history}
          </p>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-[#F6D6D8]/20 p-8 flex gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[#A8C3A0]/15 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-[#A8C3A0]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Our Dedicated Mission</h3>
            <p className="text-xs text-[#2E2E2E]/70 leading-relaxed">{CLINIC_INFO.mission}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#F6D6D8]/20 p-8 flex gap-5 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-[#F6D6D8]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#2E2E2E]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Our Vision</h3>
            <p className="text-xs text-[#2E2E2E]/70 leading-relaxed">{CLINIC_INFO.vision}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#A8C3A0] uppercase tracking-widest block">What We Stand For</span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#2E2E2E]">Our Foundational Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINIC_INFO.values.map((val, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-[#F6D6D8]/15 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#FAF8F8] flex items-center justify-center font-mono text-xs font-bold text-[#A8C3A0] border border-[#F6D6D8]/10">
                0{idx + 1}
              </span>
              <h4 className="font-semibold text-sm text-[#2E2E2E]">{val.title}</h4>
              <p className="text-xs text-[#2E2E2E]/60 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Awards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="bg-[#FAF8F8] rounded-3xl p-8 border border-[#F6D6D8]/20 space-y-6">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#A8C3A0]" />
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Clinic Certifications</h3>
          </div>
          <ul className="space-y-3">
            {CLINIC_INFO.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2E2E2E]/80">
                <CheckCircle className="w-4 h-4 text-[#A8C3A0] shrink-0 mt-0.5" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FAF8F8] rounded-3xl p-8 border border-[#F6D6D8]/20 space-y-6">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#A8C3A0]" />
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Clinical Awards & Accolades</h3>
          </div>
          <ul className="space-y-3">
            {CLINIC_INFO.awards.map((award, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2E2E2E]/80">
                <CheckCircle className="w-4 h-4 text-[#A8C3A0] shrink-0 mt-0.5" />
                <span>{award}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clinic Environment & Team Preview section */}
      <section className="bg-white rounded-3xl border border-[#F6D6D8]/15 overflow-hidden p-8 sm:p-10 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#A8C3A0] uppercase tracking-widest block">Prinstine Infrastructure</span>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#2E2E2E]">Comfortable Clinic Healing Environment</h3>
          <p className="text-xs text-[#2E2E2E]/70 leading-relaxed max-w-2xl">
            Our clinic is designed to induce calm and comfort. We enforce strict hospital-grade air-sterilization and medical sanitization across our waiting lounges, diagnostics rooms, and private fractional laser suites.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="aspect-video rounded-xl overflow-hidden border border-gray-100">
            <img src="/src/assets/images/clinic_interior_1784604026769.jpg" alt="Interior Lobby" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-gray-100">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=400&h=350&fit=crop" alt="Consultation Lounge" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-gray-100">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400&h=350&fit=crop" alt="Surgical Center" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>
    </div>
  );
}
