import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { Eye, X, ZoomIn, ArrowLeftRight } from 'lucide-react';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'equipment' | 'treatment_rooms' | 'before_after' | 'team'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Clinic Interior' },
    { id: 'equipment', label: 'Advanced Equipment' },
    { id: 'treatment_rooms', label: 'Treatment Rooms' },
    { id: 'before_after', label: 'Before & After Results' },
    { id: 'team', label: 'Specialists Team' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Header section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Visual Tour
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Doc+ Clinical Gallery
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Take a digital tour of our high-end Faisalabad facility, explore our medical laser equipment, and review real patient transformations.
        </p>
      </section>

      {/* Filter Menu Bar */}
      <section className="flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto">
        {filterTabs.map((tab) => (
          <button
            id={`gallery-filter-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              activeCategory === tab.id
                ? 'bg-[#2E2E2E] text-white shadow-xs'
                : 'bg-white border border-[#F6D6D8]/30 hover:border-[#F6D6D8] text-[#2E2E2E]/60 hover:text-[#2E2E2E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* Gallery Photo Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            id={`gallery-photo-item-${item.id}`}
            key={item.id}
            onClick={() => setLightboxImage({ url: item.imageUrl, title: item.title })}
            className="group relative bg-white rounded-2xl overflow-hidden border border-[#F6D6D8]/15 shadow-xs hover:shadow-md cursor-pointer transition-all"
          >
            {/* Image Box */}
            <div className="relative aspect-square bg-slate-50 overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md text-[#2E2E2E] scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Title / Description info bar */}
            <div className="p-4 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-[#2E2E2E] truncate pr-4 max-w-[180px]">{item.title}</strong>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8C3A0] block mt-0.5">{item.category.replace('_', ' ')}</span>
              </div>
              <span className="text-gray-300 group-hover:text-[#A8C3A0] transition-colors">
                <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Dynamic Comparison / Information card */}
      <section className="bg-[#FAF8F8] border border-[#F6D6D8]/20 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-1 bg-[#A8C3A0]/15 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider text-[#A8C3A0] uppercase">
            <ArrowLeftRight className="w-3.5 h-3.5" /> Before & After Case Logs
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#2E2E2E]">Absolute Clinical Transparency</h3>
          <p className="text-xs sm:text-sm text-[#2E2E2E]/75 leading-relaxed">
            All transformations displayed in our patient portal database are fully verified by our clinical board. We protect patient privacy and only display snapshots with signed medical disclosure consensus agreements. 
          </p>
          <p className="text-xs text-[#2E2E2E]/60 italic font-mono">
            Note: Prior cases are cataloged inside the interactive patient portal database for registered individuals to view.
          </p>
        </div>
        <div className="md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-[#F6D6D8]/10 bg-slate-200">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&h=400&fit=crop" 
            alt="Clinical scanning zoom" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* LIGHTBOX ZOOM MODAL */}
      {lightboxImage && (
        <div 
          id="gallery-lightbox-modal"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-[#2E2E2E]/95 flex flex-col items-center justify-center p-4"
        >
          {/* Close trigger */}
          <button
            id="btn-close-lightbox"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Immersive Image Display */}
          <div className="max-w-4xl max-h-[80vh] w-full relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title} 
              className="max-h-[75vh] mx-auto rounded-xl object-contain border border-white/10 shadow-2xl" 
              referrerPolicy="no-referrer"
            />
            {/* Metadata overlay details */}
            <div className="bg-black/80 backdrop-blur-xs text-white p-4 rounded-b-xl absolute bottom-0 inset-x-0 text-center border-t border-white/10">
              <p className="text-sm font-semibold tracking-wide">{lightboxImage.title}</p>
              <p className="text-[10px] font-mono text-[#A8C3A0] uppercase tracking-widest mt-0.5">Doc+ Dermatology Faisalabad Facility</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
