import React from 'react';
import { CLINIC_INFO } from '../data';
import { Clock, Languages, Sparkles, Award } from 'lucide-react';

interface DoctorsPageProps {
  onBookDoctor: (doctorName: string) => void;
}

export default function DoctorsPage({ onBookDoctor }: DoctorsPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in text-white">
      {/* Intro Panel */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#C5A880] uppercase tracking-widest">
          Board-Certified Dermatologists
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
          Meet Our Medical Specialists
        </h1>
        <p className="text-sm text-[#EAE4DC] leading-relaxed">
          Consult with Faisalabad's most qualified clinical dermatologists and board-certified aesthetic practitioners.
        </p>
      </section>

      {/* Doctors Cards Container */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {CLINIC_INFO.doctors.map((doctor) => (
          <div 
            id={`doctor-card-${doctor.id}`}
            key={doctor.id} 
            className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-xl hover:border-[#C5A880] transition-all flex flex-col md:flex-row text-[#1C1917]"
          >
            {/* Image section */}
            <div className="md:w-2/5 relative bg-[#1A3121] min-h-[280px] flex items-center justify-center border-r border-[#E5DFD5] p-6">
              <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-[#C5A880]/40 shadow-lg">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/src/assets/images/dr_ahmed_dermatologist_1784604001974.jpg";
                  }}
                />
              </div>
              <div className="absolute top-4 left-4 inline-flex items-center gap-1 bg-[#122315] border border-[#C5A880]/30 px-3 py-1 rounded-full text-xs font-bold text-[#C5A880]">
                <Sparkles className="w-3.5 h-3.5" /> {doctor.experience} Exp
              </div>
            </div>

            {/* Information section */}
            <div className="md:w-3/5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif text-[#1C1917]">{doctor.name}</h3>
                  <p className="text-xs font-bold text-[#1A3121] tracking-wide mt-0.5">{doctor.specialty}</p>
                </div>

                <div className="bg-white border border-[#E5DFD5] rounded-xl p-3.5 space-y-1 text-xs">
                  <p className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider">Qualifications & Certifications</p>
                  <p className="font-semibold text-[#1C1917] leading-relaxed">{doctor.qualifications}</p>
                </div>

                <p className="text-xs sm:text-sm text-[#6E6A63] leading-relaxed">
                  {doctor.bio}
                </p>

                {/* Additional Metadata Info */}
                <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-[#E5DFD5]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">Languages</span>
                    <div className="flex items-center gap-1.5 text-[#1C1917]">
                      <Languages className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider block">Timings</span>
                    <div className="flex items-center gap-1.5 text-[#1C1917]">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span className="font-semibold">{doctor.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-between gap-4">
                <div className="text-xs text-[#6E6A63]">
                  <span>Duty Suite:</span>
                  <strong className="block text-[#1C1917]">Suite 102</strong>
                </div>
                <button
                  id={`btn-book-consultation-${doctor.id}`}
                  onClick={() => onBookDoctor(doctor.name)}
                  className="px-5 py-2.5 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-white text-xs font-bold transition-all shadow-md border border-[#C5A880]/30 cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Clinical Support Alert */}
      <section className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-6 text-[#1C1917] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <h4 className="text-sm font-serif font-bold text-[#1C1917]">Need Urgent Dermatological Assistance?</h4>
          <p className="text-xs text-[#6E6A63]">Our sanctuary receptionists are available to assist with immediate bookings and queries.</p>
        </div>
        <a href={`tel:${CLINIC_INFO.phone}`} className="px-5 py-2.5 rounded-full bg-[#1A3121] text-white font-bold text-xs hover:bg-[#26452F] transition-colors shrink-0 border border-[#C5A880]/30">
          Call Sanctuary: {CLINIC_INFO.phone}
        </a>
      </section>
    </div>
  );
}


