import React, { useState } from 'react';
import { GENERAL_FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in text-white">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Sanctuary Information
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Clear, honest, and scientifically verified answers about sanctuary visits, pain management, pricing structures, and treatment safeties.
        </p>
      </section>

      {/* Accordion Layout Grid */}
      <section className="max-w-3xl mx-auto space-y-4 text-[#1C1917]">
        {GENERAL_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              id={`faq-accordion-item-${index}`}
              key={index}
              className={`bg-[#FBF9F5] rounded-[24px] border transition-all ${
                isOpen 
                  ? 'border-[#C5A880] shadow-xl' 
                  : 'border-[#E5DFD5]'
              }`}
            >
              {/* Question header trigger */}
              <button
                id={`faq-btn-trigger-${index}`}
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-hidden cursor-pointer"
              >
                <div className="flex gap-3 items-center">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#1A3121]' : 'text-[#6E6A63]'}`} />
                  <span className="text-sm sm:text-base font-serif text-[#1C1917] leading-snug">
                    {faq.q}
                  </span>
                </div>
                <span className="text-[#6E6A63] shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#C5A880]" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {/* Answer block */}
              {isOpen && (
                <div 
                  id={`faq-answer-block-${index}`}
                  className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#6E6A63] leading-relaxed border-t border-[#E5DFD5] pt-4 animate-fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Unresolved Questions Helper card */}
      <section className="max-w-3xl mx-auto bg-[#FBF9F5] border border-[#E5DFD5] rounded-[28px] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center gap-6 justify-between text-[#1C1917]">
        <div className="flex gap-4 items-start">
          <div className="w-11 h-11 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-serif text-[#1C1917]">Have a custom or unresolved skincare question?</h4>
            <p className="text-xs text-[#6E6A63] leading-relaxed">
              Our sanctuary concierges can resolve complex treatment plans, pricing customizations, or coordinate appointment slots.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider">WhatsApp Concierge</p>
          <a href="https://wa.me/923097823058" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#1A3121] hover:text-[#C5A880] transition-colors">
            +92 309 7823058
          </a>
        </div>
      </section>
    </div>
  );
}


