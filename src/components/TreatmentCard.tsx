import React, { useState } from 'react';
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
    <div 
      id={`treatment-card-${treatment.id}`}
      className="bg-white rounded-3xl border border-primary/10 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Treatment Image & Price Tag */}
      <div className="relative h-64 overflow-hidden bg-slate-50">
        <img
          src={treatment.image}
          alt={treatment.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary text-accent shadow-sm">
            <Sparkles className="w-3 h-3 text-accent" />
            {treatment.category}
          </span>
        </div>

        {/* Floating Price & Duration Info */}
        <div className="absolute bottom-4 right-4 bg-white/95 text-primary px-4 py-2 rounded-xl shadow-md backdrop-blur-xs flex items-center gap-3 border border-primary/5">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{treatment.duration}</span>
          </div>
          <div className="h-4 w-px bg-primary/10" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span>{treatment.price}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-display font-semibold text-primary leading-snug mb-2">
          {treatment.name}
        </h3>
        
        <p className="text-primary/70 text-xs mb-5 leading-relaxed flex-1">
          {treatment.shortDescription}
        </p>

        {/* Benefits Quicklist */}
        <div className="space-y-2 mb-6">
          <h4 className="text-[10px] font-mono font-bold tracking-wider text-primary/40 uppercase">
            Clinically Proven Benefits
          </h4>
          <ul className="space-y-1.5">
            {treatment.benefits.slice(0, 3).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-primary/85">
                <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Details Button */}
        <button
          id={`btn-expand-${treatment.id}`}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors py-2 border-t border-primary/5 mb-4"
        >
          {isExpanded ? (
            <>
              Hide Clinical Details <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              View Treatment Steps & Details <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        {/* Expanded Description & Procedure Steps */}
        {isExpanded && (
          <div className="space-y-4 pb-4 animate-fade-in text-xs border-b border-primary/5 mb-4 text-primary/80 leading-relaxed">
            <div>
              <h5 className="font-bold text-xs mb-1 text-primary">Clinical Overview</h5>
              <p className="text-primary/70">{treatment.fullDescription}</p>
            </div>
            <div>
              <h5 className="font-bold text-xs mb-2 text-primary flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-primary" />
                In-Clinic Procedure Steps
              </h5>
              <ol className="space-y-2 pl-1">
                {treatment.procedureSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="font-mono font-bold text-primary/60 w-4 shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h5 className="font-bold text-xs mb-1 text-primary">Ideal Skin Types</h5>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {treatment.skinTypes.map((skin, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-md bg-primary/5 border border-primary/10 text-[10px] text-primary/70">
                    {skin}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2.5 mt-auto pt-2">
          <button
            id={`btn-book-treatment-${treatment.id}`}
            onClick={() => onBookNow(treatment.id)}
            className="w-full text-center bg-primary hover:bg-primary/95 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs tracking-wider uppercase transition-all duration-200"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
