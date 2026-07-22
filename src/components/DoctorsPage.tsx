import React from 'react';
import { CLINIC_INFO } from '../data';
import { Award, Clock, Languages, Check, Stethoscope, Sparkles } from 'lucide-react';

interface DoctorsPageProps {
  onBookDoctor: (doctorName: string) => void;
}

export default function DoctorsPage({ onBookDoctor }: DoctorsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      {/* Intro Panel */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80">
          Dermatology Champions
        </span>
        <h1 className="text-4xl font-display font-bold text-[#2E2E2E] tracking-tight">
          Meet Our Specialists
        </h1>
        <p className="text-sm text-[#2E2E2E]/70 leading-relaxed">
          Consult with Faisalabad's most qualified clinical dermatologists and board-certified aesthetic practitioners.
        </p>
      </section>

      {/* Doctors Cards Container */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {CLINIC_INFO.doctors.map((doctor) => (
          <div 
            id={`doctor-card-${doctor.id}`}
            key={doctor.id} 
            className="bg-white rounded-3xl border border-[#F6D6D8]/15 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row"
          >
            {/* Image section */}
            <div className="md:w-2/5 relative bg-gradient-to-tr from-[#F6D6D8]/20 to-[#FAF8F8] min-h-[300px] flex items-center justify-center border-r border-[#F6D6D8]/10 p-6">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#A8C3A0] shadow-md">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-1 bg-white border border-[#F6D6D8]/30 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider text-[#A8C3A0] uppercase">
                <Sparkles className="w-3 h-3" /> {doctor.experience} Exp
              </div>
            </div>

            {/* Information section */}
            <div className="md:w-3/5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-display font-semibold text-[#2E2E2E]">{doctor.name}</h3>
                  <p className="text-xs text-[#A8C3A0] font-semibold tracking-wide font-mono mt-0.5">{doctor.specialty}</p>
                </div>

                <div className="bg-[#FAF8F8] border border-[#F6D6D8]/20 rounded-xl p-3 space-y-1.5 text-xs">
                  <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">Medical Credentials</p>
                  <p className="font-medium text-[#2E2E2E] leading-relaxed">{doctor.qualifications}</p>
                </div>

                <p className="text-xs text-[#2E2E2E]/70 leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Additional Metadata Info */}
                <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] border-t border-gray-100">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Languages Spoken</span>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Languages className="w-3.5 h-3.5 text-[#A8C3A0] shrink-0" />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Weekly Timing</span>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-[#A8C3A0] shrink-0" />
                      <span className="font-semibold">{doctor.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <div className="text-[10px] text-gray-400">
                  <span>Duty Location:</span>
                  <strong className="block text-gray-700 font-mono">Faisalabad Suite A</strong>
                </div>
                <button
                  id={`btn-book-consultation-${doctor.id}`}
                  onClick={() => onBookDoctor(doctor.name)}
                  className="px-5 py-2 rounded-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#F6D6D8] text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Clinical Support Alert */}
      <section className="bg-[#FAF8F8] rounded-2xl border border-[#F6D6D8]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-[#2E2E2E]">In-Need of Immediate Emergency Clinical Support?</h4>
          <p className="text-xs text-[#2E2E2E]/60">Our medical board can address severe complications. Call our secure desk hotline.</p>
        </div>
        <a href={`tel:${CLINIC_INFO.phone}`} className="px-5 py-2.5 rounded-full bg-white border border-[#F6D6D8] font-mono text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shrink-0">
          {CLINIC_INFO.phone}
        </a>
      </section>
    </div>
  );
}
