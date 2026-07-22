import React, { useState } from 'react';
import { GENERAL_FAQS } from '../data';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldAlert } from 'lucide-react';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          General Queries
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Clear, honest, and scientifically verified answers about clinic visits, pain management, pricing structures, and treatment safeties.
        </p>
      </section>

      {/* Accordion Layout Grid */}
      <section className="max-w-3xl mx-auto space-y-4">
        {GENERAL_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              id={`faq-accordion-item-${index}`}
              key={index}
              className={`bg-white rounded-2xl border transition-all ${
                isOpen 
                  ? 'border-[#A8C3A0] shadow-sm' 
                  : 'border-[#F6D6D8]/15'
              }`}
            >
              {/* Question header trigger */}
              <button
                id={`faq-btn-trigger-${index}`}
                onClick={() => toggleIndex(index)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-hidden"
              >
                <div className="flex gap-3 items-center">
                  <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#A8C3A0]' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold text-[#2E2E2E] leading-snug">
                    {faq.q}
                  </span>
                </div>
                <span className="text-gray-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#A8C3A0]" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {/* Answer block */}
              {isOpen && (
                <div 
                  id={`faq-answer-block-${index}`}
                  className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#2E2E2E]/75 leading-relaxed border-t border-gray-50/50 pt-4 animate-fade-in"
                >
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Unresolved Questions Helper card */}
      <section className="max-w-3xl mx-auto bg-[#FAF8F8] border border-[#F6D6D8]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex gap-4 items-start">
          <div className="w-11 h-11 rounded-full bg-[#A8C3A0]/15 flex items-center justify-center shrink-0 text-[#A8C3A0]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#2E2E2E]">Have a custom or unresolved skincare question?</h4>
            <p className="text-xs text-[#2E2E2E]/60 leading-relaxed">
              Our support team can resolve complex treatment plans, pricing customizations, or coordinate insurance files.
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">WhatsApp Support</p>
          <a href="https://wa.me/923097823058" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#A8C3A0] hover:underline">
            +92 309 7823058
          </a>
        </div>
      </section>
    </div>
  );
}
