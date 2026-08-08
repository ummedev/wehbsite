import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Treatment } from '../types';
import { Clock, Tag, Sparkles, ChevronDown, ChevronUp, Check, Activity } from 'lucide-react';

interface TreatmentCardProps {
  key?: string;
  treatment: Treatment;
  onBookNow: (treatmentId: string) => void;
}

export default function TreatmentCard({ treatment, onBookNow }: TreatmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      id={`treatment-card-${treatment.id}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-xs hover:border-[#C5A880] hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      {/* Treatment Image & Category Tag */}
      <div className="relative h-60 overflow-hidden bg-[#EAE4DC]/40">
        <motion.img
          src={treatment.image}
          alt={treatment.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/src/assets/images/clinical_hero_1784603046671.jpg";
          }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1A3121] text-[#C5A880] shadow-sm border border-[#C5A880]/30">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            {treatment.category}
          </span>
        </div>

        {/* Floating Price & Duration Info */}
        <div className="absolute bottom-4 right-4 bg-white/95 text-[#1C1917] px-3.5 py-1.5 rounded-xl shadow-md backdrop-blur-md flex items-center gap-3 border border-[#E5DFD5]">
          <div className="flex items-center gap-1 text-xs font-semibold text-[#6E6A63]">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{treatment.duration}</span>
          </div>
          <div className="h-3.5 w-px bg-[#E5DFD5]" />
          <div className="flex items-center gap-1 text-xs font-bold text-[#1A3121]">
            <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{treatment.price}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-serif text-[#1C1917] leading-snug mb-2 group-hover:text-[#1A3121] transition-colors">
          {treatment.name}
        </h3>
        
        <p className="text-[#6E6A63] text-xs sm:text-sm mb-5 leading-relaxed flex-1">
          {treatment.shortDescription}
        </p>

        {/* Benefits Quicklist */}
        <div className="space-y-2 mb-6">
          <h4 className="text-[10px] font-bold tracking-widest text-[#6E6A63] uppercase">
            Botanically Formulated Benefits
          </h4>
          <ul className="space-y-1.5">
            {treatment.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-[#1C1917] font-medium">
                <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Details Button */}
        <button
          id={`btn-expand-${treatment.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1A3121] hover:text-[#C5A880] transition-colors py-2 border-t border-[#E5DFD5] mb-4 cursor-pointer"
        >
          {isExpanded ? (
            <>
              Hide Sanctuary Details <ChevronUp className="w-3.5 h-3.5 text-[#C5A880]" />
            </>
          ) : (
            <>
              View Procedure Steps & Details <ChevronDown className="w-3.5 h-3.5 text-[#C5A880]" />
            </>
          )}
        </button>

        {/* Expanded Description & Procedure Steps */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 pb-4 text-xs border-b border-[#E5DFD5] mb-4 text-[#1C1917] leading-relaxed overflow-hidden"
            >
              <div>
                <h5 className="font-bold text-xs mb-1 text-[#1C1C17]">Clinical Overview</h5>
                <p className="text-[#6E6A63]">{treatment.fullDescription}</p>
              </div>
              <div>
                <h5 className="font-bold text-xs mb-2 text-[#1C1917] flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-[#C5A880]" />
                  In-Sanctuary Procedure Steps
                </h5>
                <ol className="space-y-2 pl-1">
                  {treatment.procedureSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="font-bold text-[#1A3121] w-4 shrink-0">{idx + 1}.</span>
                      <span className="text-[#6E6A63]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h5 className="font-bold text-xs mb-1 text-[#1C1917]">Ideal Skin Types</h5>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {treatment.skinTypes.map((skin, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-[#1A3121] text-[#C5A880] font-bold text-[10px] border border-[#C5A880]/30">
                      {skin}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <motion.button
            id={`btn-book-treatment-${treatment.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBookNow(treatment.id)}
            className="w-full text-center bg-[#1A3121] hover:bg-[#26452F] text-white font-bold text-xs py-3.5 px-4 rounded-full shadow-md transition-all border border-[#C5A880]/30 cursor-pointer"
          >
            Book Treatment
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

