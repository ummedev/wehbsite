import React from 'react';
import { CLINIC_INFO } from '../data';
import { Target, Award, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-white">
      {/* Intro Hero banner */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Decade of Excellence
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          About LUMÉA Dermatology
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Pioneering clinical excellence, advanced lasers, and authentic aesthetic restorations in Faisalabad, Pakistan.
        </p>
      </section>

      {/* History Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-4/3 rounded-[28px] overflow-hidden shadow-2xl border border-[#C5A880]/30">
            <img 
              src="/src/assets/images/clinic_interior_1784604026769.jpg" 
              alt="LUMÉA Sanctuary Environment" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/src/assets/images/adelaide_hero_clinic_1785847678316.jpg";
              }}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[#FBF9F5] border border-[#E5DFD5] p-5 rounded-[20px] shadow-xl max-w-xs hidden sm:block text-[#1C1917]">
            <span className="block text-3xl font-serif text-[#1A3121]">15,000+</span>
            <span className="block text-xs font-medium text-[#6E6A63] mt-0.5">Satisfied Sanctuary Guests</span>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest block">Our Clinical Heritage</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">
            A Legacy of Skin Science in Faisalabad
          </h2>
          <p className="text-sm text-[#EAE4DC] leading-relaxed whitespace-pre-line">
            {CLINIC_INFO.history}
          </p>
        </div>
      </section>

      {/* Mission & Vision cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#1C1917]">
        <div className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-8 flex gap-5 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
            <Target className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif text-[#1C1917]">Our Dedicated Mission</h3>
            <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed">{CLINIC_INFO.mission}</p>
          </div>
        </div>

        <div className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-8 flex gap-5 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-serif text-[#1C1917]">Our Vision</h3>
            <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed">{CLINIC_INFO.vision}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#C5A880] uppercase tracking-widest block">What We Stand For</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white">Our Foundational Values</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[#1C1917]">
          {CLINIC_INFO.values.map((val, idx) => (
            <div key={idx} className="bg-[#FBF9F5] p-6 rounded-[24px] border border-[#E5DFD5] space-y-3 shadow-md hover:border-[#C5A880] transition-all">
              <span className="w-9 h-9 rounded-full bg-[#1A3121] flex items-center justify-center font-bold text-xs text-[#C5A880] border border-[#C5A880]/30">
                0{idx + 1}
              </span>
              <h4 className="font-serif text-base text-[#1C1917]">{val.title}</h4>
              <p className="text-xs text-[#6E6A63] leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and Awards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#1C1917]">
        <div className="bg-[#FBF9F5] rounded-[28px] p-8 border border-[#E5DFD5] space-y-6 shadow-lg">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1A3121]" />
            <h3 className="text-lg font-serif text-[#1C1917]">Sanctuary Certifications</h3>
          </div>
          <ul className="space-y-3">
            {CLINIC_INFO.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C1917]">
                <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FBF9F5] rounded-[28px] p-8 border border-[#E5DFD5] space-y-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#1A3121]" />
            <h3 className="text-lg font-serif text-[#1C1917]">Clinical Awards & Accolades</h3>
          </div>
          <ul className="space-y-3">
            {CLINIC_INFO.awards.map((award, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1C1917]">
                <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{award}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clinic Environment section */}
      <section className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-8 sm:p-10 space-y-6 shadow-xl text-[#1C1917]">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#1A3121] uppercase tracking-widest block">Pristine Infrastructure</span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917]">Serene Sanctuary Atmosphere</h3>
          <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed max-w-2xl">
            Our sanctuary is designed to induce calm and comfort. We enforce strict hospital-grade air-sterilization and medical sanitization across our waiting lounges, diagnostics rooms, and private fractional laser suites.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="aspect-video rounded-2xl overflow-hidden border border-[#E5DFD5]">
            <img src="/src/assets/images/clinic_interior_1784604026769.jpg" alt="Interior Lobby" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-[#E5DFD5]">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=400&h=350&fit=crop" alt="Consultation Lounge" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-[#E5DFD5]">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=400&h=350&fit=crop" alt="Surgical Center" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
}


