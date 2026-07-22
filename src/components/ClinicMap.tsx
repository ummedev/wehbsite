import { MapPin, Phone, Clock, Navigation, Map, ShieldAlert, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function ClinicMap() {
  return (
    <div 
      id="clinic-location-section"
      className="bg-white rounded-2xl border border-[#F6D6D8]/30 overflow-hidden shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Address Details Panel */}
        <div className="p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#F6D6D8]/20 border border-[#F6D6D8]/40 uppercase text-[#2E2E2E]/80 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#A8C3A0]" /> Our Punjab Facility
            </span>
            <h3 className="text-2xl font-display font-semibold text-[#2E2E2E] leading-tight mb-2">
              Doc+ Clinical Location & coordinates
            </h3>
            <p className="text-xs text-[#2E2E2E]/60 leading-relaxed mb-6">
              Come visit us in Pakistan's premium healthcare hub. Our state-of-the-art facility is located near the beautiful Lyallpur Galleria on the Canal Expressway.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Map Pin Address Block */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#A8C3A0]" />
              </div>
              <div>
                <span className="font-semibold block text-[#2E2E2E]">Faisalabad Main Clinic</span>
                <p className="text-[#2E2E2E]/70 mt-0.5 leading-relaxed">
                  {CLINIC_INFO.address}
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/30 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#A8C3A0]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold block text-[#2E2E2E]">Operational Timings</span>
                  <span className="bg-red-50 text-red-500 border border-red-100 font-bold font-mono text-[8px] px-1.5 rounded uppercase">Closed Now</span>
                </div>
                <p className="text-[#2E2E2E]/70 mt-0.5">
                  {CLINIC_INFO.timings} • <strong className="text-red-500 font-medium">Opens 11 AM</strong>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/30 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#A8C3A0]" />
              </div>
              <div>
                <span className="font-semibold block text-[#2E2E2E]">Direct Clinical Hotline</span>
                <p className="text-[#2E2E2E]/70 mt-0.5">
                  <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#A8C3A0] transition-colors font-semibold">
                    {CLINIC_INFO.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Plus Code */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/30 flex items-center justify-center shrink-0">
                <Map className="w-4 h-4 text-[#A8C3A0]" />
              </div>
              <div>
                <span className="font-semibold block text-[#2E2E2E]">Google Plus Code</span>
                <p className="text-[#2E2E2E]/70 mt-0.5 font-mono text-[11px] bg-[#FAF8F8] px-2 py-0.5 rounded border border-[#F6D6D8]/15 inline-block">
                  {CLINIC_INFO.plusCode}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F6D6D8]/20 flex gap-2.5">
            <a 
              href="https://maps.google.com/?q=Doc+Plus+Building+Canal+Expressway+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#F6D6D8]" /> Navigate in Google Maps
            </a>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] bg-[#A8C3A0]/10 border border-[#A8C3A0]/20 text-[#2E2E2E]/70">
              Label: Faisalabad Clinical Office
            </span>
          </div>
        </div>

        {/* Right Side: Visual vector stylized interactive map of Faisalabad Canal Expy */}
        <div className="bg-[#FAF8F8] lg:col-span-7 relative h-96 lg:h-auto border-t lg:border-t-0 lg:border-l border-[#F6D6D8]/20 overflow-hidden flex items-center justify-center">
          {/* Custom SVG Stylized Map */}
          <svg className="absolute inset-0 w-full h-full text-slate-300" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid Lines */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F6D6D8" strokeWidth="0.5" strokeOpacity="0.25" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Canal Expressway (Thick water-themed route) */}
            <path d="M-100,500 L900,100" stroke="#E2EBF5" strokeWidth="60" strokeLinecap="round" opacity="0.8" />
            <path d="M-100,500 L900,100" stroke="#8EB5DC" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 5" opacity="0.6" />
            <text x="520" y="270" fill="#759BC2" fontSize="11" fontFamily="monospace" fontWeight="semibold" letterSpacing="0.2em" transform="rotate(-23, 520, 270)">CANAL EXPRESSWAY</text>

            {/* Service Road */}
            <path d="M-100,530 L900,130" stroke="#2E2E2E" strokeWidth="2" strokeOpacity="0.1" strokeLinecap="round" />
            <path d="M-100,532 L900,132" stroke="#2E2E2E" strokeWidth="1" strokeOpacity="0.05" strokeLinecap="round" />
            <text x="350" y="420" fill="#2E2E2E" fillOpacity="0.4" fontSize="9" fontFamily="monospace" transform="rotate(-23, 350, 420)">Service Road</text>

            {/* Abdullah Street Intersection */}
            <path d="M380,-100 L440,700" stroke="#2E2E2E" strokeWidth="18" strokeOpacity="0.08" strokeLinecap="round" />
            <path d="M380,-100 L440,700" stroke="#2E2E2E" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" strokeDasharray="5 5" />
            <text x="430" y="150" fill="#2E2E2E" fillOpacity="0.4" fontSize="9" fontFamily="monospace" transform="rotate(84, 430, 150)">ABDULLAH STREET</text>

            {/* Nasar Ullah Khan Town Area */}
            <path d="M250,50 C250,50 150,120 180,220 C210,320 280,250 350,220" stroke="#FAF8F8" strokeWidth="4" fill="#F6D6D8" fillOpacity="0.1" />
            <text x="180" y="100" fill="#2E2E2E" fillOpacity="0.3" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Nasar Ullah Khan Town</text>

            {/* Lyallpur Galleria Mall representation */}
            <g transform="translate(560, 160)" className="cursor-pointer">
              <rect x="0" y="0" width="130" height="70" rx="6" fill="white" stroke="#F6D6D8" strokeWidth="1.5" />
              <rect x="0" y="0" width="130" height="24" rx="4" fill="#FAF8F8" />
              <text x="10" y="16" fill="#2E2E2E" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Lyallpur Galleria</text>
              <text x="10" y="42" fill="#2E2E2E" fillOpacity="0.5" fontSize="8" fontFamily="sans-serif">Premium Mall Hub</text>
              <text x="10" y="56" fill="#A8C3A0" fontSize="8" fontFamily="sans-serif" fontWeight="semibold">2 Mins Walk Away</text>
            </g>

            {/* Landmark: Doc ➕ Plus Building */}
            <g transform="translate(320, 280)">
              {/* Radar pulse */}
              <circle cx="50" cy="50" r="30" fill="#F6D6D8" fillOpacity="0.4">
                <animate attributeName="r" values="25;45;25" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Building Pin Area */}
              <rect x="10" y="15" width="80" height="70" rx="8" fill="#FFFFFF" stroke="#A8C3A0" strokeWidth="3" shadow-sm="true" />
              <rect x="10" y="15" width="80" height="25" rx="5" fill="#F6D6D8" />
              <text x="50" y="32" fill="#2E2E2E" fontSize="9" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">DOC+ BUILDING</text>
              
              {/* Plus icon inside building */}
              <path d="M50,50 L50,66 M42,58 L58,58" stroke="#A8C3A0" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Navigation pin marker pointing to building */}
            <g transform="translate(370, 255)">
              <path d="M0,0 C-10,-10 -15,-20 -15,-30 C-15,-41 -6,-50 5,-50 C16,-50 25,-41 25,-30 C25,-20 15,-10 0,0 Z" fill="#2E2E2E" />
              <circle cx="5" cy="-30" r="8" fill="#F6D6D8" />
              <circle cx="5" cy="-30" r="4" fill="#A8C3A0" />
            </g>
          </svg>

          {/* Interactive Floating Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 p-4 rounded-xl border border-[#F6D6D8]/35 shadow-lg backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAF8F8] border border-[#A8C3A0]/30 flex items-center justify-center text-white">
                <MapPin className="w-5 h-5 text-[#A8C3A0]" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#2E2E2E]">Clinical Landmark</span>
                <span className="block text-[10px] text-gray-500">Abdullah Street Intersection, Faisalabad</span>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=Doc+Plus+Building+Canal+Expressway+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#A8C3A0] hover:bg-[#96b18f] text-white font-semibold text-[10px] tracking-wider uppercase transition-all shadow-xs"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
