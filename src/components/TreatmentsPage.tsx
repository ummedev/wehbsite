import React, { useState } from 'react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import { Clock, Tag, Sparkles, X, Check, Eye, HelpCircle, Activity, Heart, ArrowRight } from 'lucide-react';

interface TreatmentsPageProps {
  onBookNow: (treatmentId: string) => void;
  preselectedId?: string;
}

export default function TreatmentsPage({ onBookNow, preselectedId }: TreatmentsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'medical' | 'cosmetic' | 'hair'>('all');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'medical', label: 'Medical Dermatology' },
    { id: 'cosmetic', label: 'Cosmetic Dermatology' },
    { id: 'hair', label: 'Hair Treatments' }
  ];

  const filteredTreatments = selectedCategory === 'all' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Advanced Formulary
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Clinical & Aesthetic Treatments
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Expert-designed dermatological procedures categorized specifically to restore skin health, reverse aging damage, and repair hair follicles.
        </p>
      </section>

      {/* Category Pills Bar */}
      <section className="flex flex-wrap justify-center items-center gap-2 max-w-xl mx-auto">
        {categories.map((cat) => (
          <button
            id={`treatment-cat-pill-${cat.id}`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#A8C3A0] text-white shadow-xs'
                : 'bg-white border border-[#F6D6D8]/35 hover:border-[#F6D6D8] text-[#2E2E2E]/70 hover:text-[#2E2E2E]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Treatments Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTreatments.map((t) => (
          <div
            id={`treatment-card-list-${t.id}`}
            key={t.id}
            className="bg-white rounded-3xl border border-[#F6D6D8]/15 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
          >
            {/* Image banner */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-[#F6D6D8]/20 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-slate-800">
                {t.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#A8C3A0]/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-white">
                {t.price}
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-[#2E2E2E] tracking-tight line-clamp-1">{t.name}</h3>
                <p className="text-xs text-[#2E2E2E]/65 leading-relaxed line-clamp-2">{t.shortDescription}</p>
                <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#A8C3A0]" /> {t.duration}</span>
                  <span>•</span>
                  <span>{t.skinTypes[0]} compatible</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  id={`btn-view-details-${t.id}`}
                  onClick={() => setSelectedTreatment(t)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A8C3A0] hover:text-[#96b18f] transition-all px-2 py-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Details & FAQs
                </button>
                <button
                  id={`btn-quick-book-${t.id}`}
                  onClick={() => onBookNow(t.id)}
                  className="px-4 py-1.5 rounded-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#F6D6D8] text-[11px] font-semibold transition-all shadow-xs"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* IMMERSIVE DETAILS DIALOG/OVERLAY */}
      {selectedTreatment && (
        <div 
          id="treatment-details-modal"
          className="fixed inset-0 z-50 bg-[#2E2E2E]/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl border border-[#F6D6D8]/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in">
            {/* Close icon */}
            <button
              id="btn-close-treatment-modal"
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 hover:scale-105 shadow-sm transition-all z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header banner background */}
            <div className="relative aspect-3/1 sm:aspect-4/1 bg-slate-100 overflow-hidden">
              <img 
                src={selectedTreatment.image} 
                alt={selectedTreatment.name} 
                className="w-full h-full object-cover brightness-95" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:left-8 space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-widest bg-[#A8C3A0] text-white uppercase font-bold">
                  {selectedTreatment.category} Dermatology
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-[#2E2E2E]">
                  {selectedTreatment.name}
                </h2>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Grid with description and basic details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">About the Procedure</h4>
                  <p className="text-xs sm:text-sm text-[#2E2E2E]/85 leading-relaxed">
                    {selectedTreatment.fullDescription}
                  </p>
                  
                  {/* Recovery guidelines - Highly Important! */}
                  <div className="bg-[#FAF8F8] border-l-4 border-[#A8C3A0] rounded-r-xl p-4 space-y-1.5">
                    <h5 className="text-xs font-bold text-[#2E2E2E] flex items-center gap-1.5 uppercase font-mono tracking-wide">
                      <Activity className="w-4 h-4 text-[#A8C3A0]" /> Recovery & Aftercare Guidance
                    </h5>
                    <p className="text-xs text-[#2E2E2E]/80 leading-relaxed">
                      {selectedTreatment.recovery}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#FAF8F8] border border-[#F6D6D8]/20 p-5 rounded-2xl space-y-4 text-xs">
                  <h4 className="font-mono font-bold text-gray-400 uppercase tracking-widest border-b border-[#F6D6D8]/20 pb-2">Session Parameters</h4>
                  
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Duration:</span>
                    <strong className="text-[#2E2E2E] font-medium">{selectedTreatment.duration}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Service Fee:</span>
                    <strong className="text-[#A8C3A0] font-bold text-sm">{selectedTreatment.price}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Dermatologist:</span>
                    <strong className="text-[#2E2E2E] font-medium">Doc+ Specialized Board</strong>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-[#F6D6D8]/20">
                    <span className="text-gray-500 block">Skin Compatibility:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTreatment.skinTypes.map((st, idx) => (
                        <span key={idx} className="bg-white border border-[#F6D6D8]/30 px-2 py-0.5 rounded-md text-[10px] text-gray-600">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits & Procedure steps side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#A8C3A0] uppercase tracking-widest flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Treatment Benefits
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedTreatment.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#2E2E2E]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A8C3A0] mt-1.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                    Step-by-Step Procedure Steps
                  </h4>
                  <ol className="space-y-3 font-medium">
                    {selectedTreatment.procedureSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-[#2E2E2E]/80">
                        <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-mono text-[10px] text-[#2E2E2E] shrink-0 font-bold border border-gray-200">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5 font-normal">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Before & After Image Preview and specific FAQs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
                {selectedTreatment.beforeAfterImage ? (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Clinical Transformation Expectation</h4>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-[#F6D6D8]/20 bg-slate-50 relative group">
                      <img 
                        src={selectedTreatment.beforeAfterImage} 
                        alt="Transformation Preview" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-[10px] text-white font-mono tracking-widest uppercase">
                        Before & After Progression
                      </div>
                    </div>
                    <span className="block text-[10px] text-gray-400 italic">Disclaimer: Transformations differ according to specific biological conditions and lifestyle habits.</span>
                  </div>
                ) : (
                  <div className="bg-[#FAF8F8] p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-[#A8C3A0]/60" />
                    <p className="text-xs font-semibold text-gray-600">No Image Preview Required</p>
                    <p className="text-[10px] text-gray-400">Ask your consultant for previous anonymous case file snapshots during your clinical scan.</p>
                  </div>
                )}

                {/* Treatment specific FAQs */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-gray-400" /> Treatment FAQs
                  </h4>
                  <div className="space-y-4">
                    {selectedTreatment.faqs.map((faq, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs">
                        <h5 className="font-semibold text-[#2E2E2E]">{faq.q}</h5>
                        <p className="text-[#2E2E2E]/70 leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-[#2E2E2E]/60 text-center sm:text-left">
                  <span>Want to confirm your slot with our specialist?</span>
                  <p className="font-semibold text-[#2E2E2E] mt-0.5">Click register to schedule a consultation immediately.</p>
                </div>
                <button
                  id="btn-modal-book-now"
                  onClick={() => {
                    onBookNow(selectedTreatment.id);
                    setSelectedTreatment(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#A8C3A0] hover:bg-[#96b18f] text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-all"
                >
                  Schedule Appointment <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
