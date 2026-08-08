import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  treatmentName?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title = "Acne Scar Resurfacing",
  treatmentName = "3 Sessions Fractional CO2 Laser",
  className = ""
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className={`bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] p-4 shadow-xs ${className}`}>
      <div 
        ref={containerRef}
        className="relative aspect-4/3 w-full rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt="After Treatment" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/src/assets/images/clinical_hero_1784603046671.jpg";
          }}
        />
        <div className="absolute top-3 right-3 bg-[#1A3121] text-[#C5A880] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-[#C5A880]/30 uppercase tracking-wider">
          AFTER
        </div>

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Before Treatment" 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/src/assets/images/facial_procedure_1784603091197.jpg";
            }}
          />
          <div className="absolute top-3 left-3 bg-[#1C1917]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
            BEFORE
          </div>
        </div>

        {/* Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1A3121] text-[#C5A880] shadow-md border-2 border-[#C5A880] flex items-center justify-center font-bold text-xs">
            ⇄
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h4 className="text-sm font-serif font-bold text-[#1C1917]">{title}</h4>
          <p className="text-xs text-[#6E6A63]">{treatmentName}</p>
        </div>
        <div className="text-[10px] text-[#6B7280] bg-[#FAFBFC] px-2.5 py-1 rounded-lg border border-[#E5E7EB]">
          🔒 Verified Patient Consent
        </div>
      </div>
    </div>
  );
}
