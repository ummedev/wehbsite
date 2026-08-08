import React, { useState } from 'react';
import { TREATMENTS } from '../data';
import { Treatment } from '../types';
import { Clock, Tag, Sparkles, X, Check, Eye, HelpCircle, Activity, ArrowRight } from 'lucide-react';

interface TreatmentsPageProps {
  onBookNow: (treatmentId: string) => void;
  preselectedId?: string;
}

export default function TreatmentsPage({ onBookNow }: TreatmentsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'medical' | 'cosmetic' | 'hair'>('all');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

  const categories = [
    { id: 'all', label: 'All Treatments' },
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
      <section className="text-center space-y-4 max-w-3xl mx-auto text-white">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Botanical & Clinical Care
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-white">
          Clinical & Aesthetic Procedures
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Expert-designed dermatological procedures categorized specifically to restore skin health, reverse aging damage, and repair hair follicles.
        </p>
      </section>

      {/* Category Pills Bar */}
      <section className="flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            id={`treatment-cat-pill-${cat.id}`}
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#C5A880] text-[#122315] shadow-md font-bold'
                : 'glass-pill text-[#EAE4DC] hover:text-white border border-[#C5A880]/30'
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
            className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-lg hover:border-[#C5A880] transition-all flex flex-col justify-between group"
          >
            {/* Image banner */}
            <div className="relative aspect-video bg-[#EAE4DC] overflow-hidden">
              <img 
                src={t.image} 
                alt={t.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {t.category}
              </div>
              <div className="absolute top-3 right-3 bg-[#C5A880] px-3 py-1 rounded-full text-[11px] font-bold text-[#122315] shadow-sm">
                {t.price}
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-serif text-[#1C1917] tracking-tight">{t.name}</h3>
                <p className="text-xs text-[#6E6A63] leading-relaxed line-clamp-2">{t.shortDescription}</p>
                <div className="flex items-center gap-2 pt-2 text-xs text-[#6E6A63]">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C5A880]" /> {t.duration}</span>
                  <span>•</span>
                  <span>{t.skinTypes[0]} compatible</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between gap-2">
                <button
                  id={`btn-view-details-${t.id}`}
                  onClick={() => setSelectedTreatment(t)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1A3121] hover:text-[#C5A880] transition-all px-1 py-1 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#C5A880]" /> View Details
                </button>
                <button
                  id={`btn-quick-book-${t.id}`}
                  onClick={() => onBookNow(t.id)}
                  className="px-4 py-2 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-white text-xs font-bold transition-all shadow-sm border border-[#C5A880]/30 cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* DETAILS MODAL */}
      {selectedTreatment && (
        <div 
          id="treatment-details-modal"
          className="fixed inset-0 z-50 bg-[#0D180E]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#FBF9F5] rounded-[32px] border border-[#E5DFD5] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in text-[#1C1917]">
            {/* Close icon */}
            <button
              id="btn-close-treatment-modal"
              onClick={() => setSelectedTreatment(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A3121] border border-[#C5A880]/40 flex items-center justify-center text-white hover:text-[#C5A880] hover:scale-105 shadow-md transition-all z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header banner background */}
            <div className="relative aspect-3/1 sm:aspect-4/1 bg-[#EAE4DC] overflow-hidden">
              <img 
                src={selectedTreatment.image} 
                alt={selectedTreatment.name} 
                className="w-full h-full object-cover brightness-95" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBF9F5] via-[#FBF9F5]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 sm:left-8 space-y-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#1A3121] text-[#C5A880] uppercase tracking-wider border border-[#C5A880]/30">
                  {selectedTreatment.category} Dermatology
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                  {selectedTreatment.name}
                </h2>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Grid with description and basic details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <h4 className="text-xs font-bold text-[#6E6A63] uppercase tracking-wider">About the Procedure</h4>
                  <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                    {selectedTreatment.fullDescription}
                  </p>
                  
                  {/* Recovery guidelines */}
                  <div className="bg-[#1A3121]/5 border-l-4 border-[#C5A880] rounded-r-xl p-4 space-y-1.5">
                    <h5 className="text-xs font-bold text-[#1A3121] flex items-center gap-1.5 uppercase tracking-wide">
                      <Activity className="w-4 h-4 text-[#C5A880]" /> Recovery & Aftercare Guidance
                    </h5>
                    <p className="text-xs text-[#1C1917] leading-relaxed">
                      {selectedTreatment.recovery}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-[#E5DFD5] p-5 rounded-2xl space-y-4 text-xs">
                  <h4 className="font-bold text-[#6E6A63] uppercase tracking-wider border-b border-[#E5DFD5] pb-2">Session Parameters</h4>
                  
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#6E6A63]">Duration:</span>
                    <strong className="text-[#1C1917] font-bold">{selectedTreatment.duration}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#6E6A63]">Service Fee:</span>
                    <strong className="text-[#1A3121] font-extrabold text-sm">{selectedTreatment.price}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#6E6A63]">Specialist:</span>
                    <strong className="text-[#1C1917] font-bold">LUMÉA Clinical Panel</strong>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-[#E5DFD5]">
                    <span className="text-[#6E6A63] block">Skin Compatibility:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedTreatment.skinTypes.map((st, idx) => (
                        <span key={idx} className="bg-[#1A3121] border border-[#C5A880]/30 px-2 py-0.5 rounded-md text-[10px] text-[#C5A880]">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits & Procedure steps side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E5DFD5]">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-[#1A3121] uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C5A880]" /> Key Benefits
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedTreatment.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#1C1917]">
                        <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-[#6E6A63] uppercase tracking-wider">
                    Procedure Steps
                  </h4>
                  <ol className="space-y-3 font-medium">
                    {selectedTreatment.procedureSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-[#1C1917]">
                        <span className="w-5 h-5 rounded-full bg-[#1A3121] flex items-center justify-center font-bold text-[10px] text-[#C5A880] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-6 border-t border-[#E5DFD5] flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-xs text-[#6E6A63] text-center sm:text-left">
                  <span>Ready to start your skin recovery journey?</span>
                  <p className="font-bold text-[#1C1917] mt-0.5">Book your sanctuary consultation now.</p>
                </div>
                <button
                  id="btn-modal-book-now"
                  onClick={() => {
                    onBookNow(selectedTreatment.id);
                    setSelectedTreatment(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all border border-[#C5A880]/30 cursor-pointer"
                >
                  Schedule Session <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


