import { MapPin, Phone, Clock, Navigation, Map, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function ClinicMap() {
  return (
    <div 
      id="clinic-location-section"
      className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-xs"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Address Details Panel */}
        <div className="p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1A3121] text-[#C5A880] mb-4 border border-[#C5A880]/30 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Botanical Sanctuary Location
            </span>
            <h3 className="text-3xl font-serif text-[#1C1917] leading-tight mb-2">
              LUMÉA Faisalabad Sanctuary
            </h3>
            <p className="text-xs text-[#6E6A63] leading-relaxed mb-6">
              Visit our serene botanical sanctuary facility. Our state-of-the-art center is conveniently located near Lyallpur Galleria on the Canal Expressway.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Map Pin Address Block */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-bold block text-[#1C1917]">Faisalabad Sanctuary</span>
                <p className="text-[#6E6A63] mt-0.5 leading-relaxed">
                  {CLINIC_INFO.address}
                </p>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold block text-[#1C1917]">Sanctuary Hours</span>
                  <span className="bg-[#1A3121] text-[#C5A880] font-bold text-[9px] px-1.5 py-0.2 rounded uppercase tracking-wider">Open Daily</span>
                </div>
                <p className="text-[#6E6A63] mt-0.5">
                  {CLINIC_INFO.timings} • <strong className="text-[#1A3121] font-bold">Opens 11 AM</strong>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-bold block text-[#1C1917]">Concierge Line</span>
                <p className="text-[#6E6A63] mt-0.5">
                  <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-[#C5A880] transition-colors font-bold text-[#1C1917]">
                    {CLINIC_INFO.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Plus Code */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] border border-[#C5A880]/30 flex items-center justify-center shrink-0">
                <Map className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-bold block text-[#1C1917]">Google Plus Code</span>
                <p className="text-[#1C1917] mt-0.5 font-bold text-xs bg-white px-2.5 py-1 rounded-lg border border-[#E5DFD5] inline-block">
                  {CLINIC_INFO.plusCode}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5DFD5] flex flex-wrap gap-2.5">
            <a 
              href="https://maps.google.com/?q=Doc+Plus+Building+Canal+Expressway+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A3121] hover:bg-[#26452F] text-white text-xs font-bold py-3 px-6 rounded-full transition-all shadow-md border border-[#C5A880]/30"
            >
              <Navigation className="w-4 h-4 text-[#C5A880]" /> Navigate in Google Maps
            </a>
          </div>
        </div>

        {/* Right Side: Visual vector stylized interactive map */}
        <div className="bg-[#EAE4DC]/30 lg:col-span-7 relative h-96 lg:h-auto border-t lg:border-t-0 lg:border-l border-[#E5DFD5] overflow-hidden flex items-center justify-center">
          {/* Custom SVG Stylized Map */}
          <svg className="absolute inset-0 w-full h-full text-slate-300" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5DFD5" strokeWidth="1" opacity="0.6" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Canal Expressway */}
            <path d="M-100,500 L900,100" stroke="#EAE4DC" strokeWidth="60" strokeLinecap="round" opacity="0.8" />
            <path d="M-100,500 L900,100" stroke="#1A3121" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 5" opacity="0.6" />
            <text x="520" y="270" fill="#1A3121" fontSize="11" fontWeight="bold" letterSpacing="0.2em" transform="rotate(-23, 520, 270)">CANAL EXPRESSWAY</text>

            {/* Service Road */}
            <path d="M-100,530 L900,130" stroke="#1C1917" strokeWidth="2" strokeOpacity="0.1" strokeLinecap="round" />
            <text x="350" y="420" fill="#1C1917" fillOpacity="0.4" fontSize="9" fontWeight="bold" transform="rotate(-23, 350, 420)">Service Road</text>

            {/* Abdullah Street Intersection */}
            <path d="M380,-100 L440,700" stroke="#1C1917" strokeWidth="18" strokeOpacity="0.08" strokeLinecap="round" />
            <path d="M380,-100 L440,700" stroke="#1C1917" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" strokeDasharray="5 5" />
            <text x="430" y="150" fill="#1C1917" fillOpacity="0.4" fontSize="9" fontWeight="bold" transform="rotate(84, 430, 150)">ABDULLAH STREET</text>

            {/* Lyallpur Galleria Mall representation */}
            <g transform="translate(560, 160)" className="cursor-pointer">
              <rect x="0" y="0" width="130" height="70" rx="10" fill="white" stroke="#E5DFD5" strokeWidth="1.5" />
              <rect x="0" y="0" width="130" height="24" rx="8" fill="#FBF9F5" />
              <text x="10" y="16" fill="#1C1917" fontSize="10" fontWeight="bold">Lyallpur Galleria</text>
              <text x="10" y="42" fill="#6E6A63" fontSize="8">Premium Hub</text>
              <text x="10" y="56" fill="#1A3121" fontSize="8" fontWeight="bold">2 Mins Walk Away</text>
            </g>

            {/* Landmark: LUMÉA Sanctuary Building */}
            <g transform="translate(320, 280)">
              {/* Radar pulse */}
              <circle cx="50" cy="50" r="30" fill="#C5A880" fillOpacity="0.2">
                <animate attributeName="r" values="25;45;25" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Building Pin Area */}
              <rect x="10" y="15" width="80" height="70" rx="12" fill="#FFFFFF" stroke="#1A3121" strokeWidth="3" />
              <rect x="10" y="15" width="80" height="25" rx="10" fill="#1A3121" />
              <text x="50" y="31" fill="#C5A880" fontSize="9" fontWeight="bold" textAnchor="middle">LUMÉA</text>
              
              {/* Plus icon inside building */}
              <path d="M50,50 L50,66 M42,58 L58,58" stroke="#1A3121" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Navigation pin marker pointing to building */}
            <g transform="translate(370, 255)">
              <path d="M0,0 C-10,-10 -15,-20 -15,-30 C-15,-41 -6,-50 5,-50 C16,-50 25,-41 25,-30 C25,-20 15,-10 0,0 Z" fill="#1A3121" />
              <circle cx="5" cy="-30" r="8" fill="#FFFFFF" />
              <circle cx="5" cy="-30" r="4" fill="#C5A880" />
            </g>
          </svg>

          {/* Interactive Floating Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-[#FBF9F5]/95 p-4 rounded-2xl border border-[#E5DFD5] shadow-lg backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-[#1C1917]">Sanctuary Landmark</span>
                <span className="block text-[11px] text-[#6E6A63]">Abdullah Street Intersection, Faisalabad</span>
              </div>
            </div>
            <a 
              href="https://maps.google.com/?q=Doc+Plus+Building+Canal+Expressway+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-[#C5A880] font-bold text-xs uppercase tracking-wider transition-all shadow-sm border border-[#C5A880]/30 shrink-0"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

