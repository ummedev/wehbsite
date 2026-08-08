import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { Eye, X, ZoomIn, ArrowLeftRight, Sparkles } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'interior' | 'equipment' | 'treatment_rooms' | 'before_after' | 'team'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'interior', label: 'Sanctuary Interior' },
    { id: 'equipment', label: 'Laser Equipment' },
    { id: 'treatment_rooms', label: 'Treatment Suites' },
    { id: 'before_after', label: 'Before & After Results' },
    { id: 'team', label: 'Specialists Team' }
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-white">
      {/* Header section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Visual Sanctuary
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          LUMÉA Clinical Gallery
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Take a digital tour of our high-end facility, explore our medical laser equipment, and review real patient transformations.
        </p>
      </section>

      {/* Interactive Before & After Showcase Section */}
      <section className="bg-[#FBF9F5] border border-[#E5DFD5] rounded-[32px] p-8 sm:p-10 shadow-xl space-y-8 text-[#1C1917]">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">Real Treatment Results</h2>
          <p className="text-xs sm:text-sm text-[#6E6A63]">
            Drag the slider to compare before and after clinical skin transformation outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1512290900673-0ff76ee456f4?q=80&w=800&fit=crop"
            afterImage="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&fit=crop"
            title="Laser Scar & Texture Renewal"
            treatmentName="Pre-Laser vs 3 Sessions Completed"
          />
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&fit=crop"
            afterImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&fit=crop"
            title="Medical HydraFacial + Tretinoin Care"
            treatmentName="Active Acne vs Full Barrier Recovery"
          />
        </div>
      </section>

      {/* Filter Menu Bar */}
      <section className="flex flex-wrap justify-center items-center gap-2 max-w-2xl mx-auto">
        {filterTabs.map((tab) => (
          <button
            id={`gallery-filter-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
              activeCategory === tab.id
                ? 'bg-[#C5A880] text-[#122315] shadow-md font-bold'
                : 'glass-pill text-[#EAE4DC] hover:text-white border border-[#C5A880]/30'
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
            className="group relative bg-[#FBF9F5] rounded-[24px] overflow-hidden border border-[#E5DFD5] shadow-md hover:border-[#C5A880] cursor-pointer transition-all text-[#1C1917]"
          >
            {/* Image Box */}
            <div className="relative aspect-square bg-[#EAE4DC] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/src/assets/images/clinic_interior_1784604026769.jpg";
                }}
              />
              <div className="absolute inset-0 bg-[#122315]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#1A3121] border border-[#C5A880]/40 flex items-center justify-center shadow-md text-[#C5A880] scale-90 group-hover:scale-100 transition-transform">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Title / Description info bar */}
            <div className="p-4 flex justify-between items-center text-xs">
              <div>
                <strong className="block text-[#1C1917] truncate pr-4 max-w-[180px] font-bold">{item.title}</strong>
                <span className="text-[10px] uppercase font-semibold text-[#1A3121] block mt-0.5">{item.category.replace('_', ' ')}</span>
              </div>
              <span className="text-[#6E6A63] group-hover:text-[#C5A880] transition-colors">
                <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Dynamic Comparison / Information card */}
      <section className="bg-[#FBF9F5] border border-[#E5DFD5] rounded-[28px] p-8 sm:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center text-[#1C1917]">
        <div className="md:w-1/2 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#1A3121] px-3 py-1 rounded-full text-xs font-bold text-[#C5A880] uppercase border border-[#C5A880]/30">
            <ArrowLeftRight className="w-4 h-4" /> Clinical Transparency
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917]">Verified Patient Transformations</h3>
          <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed">
            All transformations displayed in our patient portal database are fully verified by our clinical board. We protect patient privacy and only display snapshots with signed medical disclosure consensus agreements. 
          </p>
          <p className="text-xs text-[#6E6A63] italic">
            Note: Prior cases are cataloged inside the interactive patient portal database for registered individuals to view.
          </p>
        </div>
        <div className="md:w-1/2 aspect-video rounded-2xl overflow-hidden border border-[#E5DFD5] bg-[#EAE4DC]">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&h=400&fit=crop" 
            alt="Clinical scanning zoom" 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/src/assets/images/laser_procedure_1784603065821.jpg";
            }}
          />
        </div>
      </section>

      {/* LIGHTBOX ZOOM MODAL */}
      {lightboxImage && (
        <div 
          id="gallery-lightbox-modal"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-[#0D180E]/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          {/* Close trigger */}
          <button
            id="btn-close-lightbox"
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-white flex items-center justify-center transition-all border border-[#C5A880]/40 cursor-pointer"
          >
            <X className="w-6 h-6 text-[#C5A880]" />
          </button>

          {/* Immersive Image Display */}
          <div className="max-w-4xl max-h-[80vh] w-full relative" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImage.url} 
              alt={lightboxImage.title} 
              className="max-h-[75vh] mx-auto rounded-2xl object-contain border border-[#C5A880]/30 shadow-2xl" 
              referrerPolicy="no-referrer"
            />
            {/* Metadata overlay details */}
            <div className="bg-[#122315]/90 backdrop-blur-md text-white p-4 rounded-b-2xl absolute bottom-0 inset-x-0 text-center border-t border-[#C5A880]/30">
              <p className="text-sm font-serif text-white tracking-wide">{lightboxImage.title}</p>
              <p className="text-[10px] text-[#C5A880] uppercase font-bold tracking-wider mt-0.5">LUMÉA Skin Sanctuary Facility</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



