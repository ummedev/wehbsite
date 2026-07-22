import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TreatmentCard from './components/TreatmentCard';
import BookingForm from './components/BookingForm';
import PatientDashboard from './components/PatientDashboard';
import ClinicMap from './components/ClinicMap';
import AboutPage from './components/AboutPage';
import DoctorsPage from './components/DoctorsPage';
import TreatmentsPage from './components/TreatmentsPage';
import GalleryPage from './components/GalleryPage';
import BlogPage from './components/BlogPage';
import FAQsPage from './components/FAQsPage';
import ContactPage from './components/ContactPage';

import { TREATMENTS, TESTIMONIALS, CLINIC_INFO, BLOG_POSTS } from './data';
import { Appointment, PatientProfile } from './types';
import { 
  Sparkles, ShieldCheck, HeartPulse, Trophy, Star, ChevronRight, 
  MapPin, Clock, Phone, Stethoscope, ArrowRight, ArrowLeftRight, CheckCircle, Zap, Eye, Calendar, BookOpen
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);

  // For the homepage blog modal
  const [homeActiveBlog, setHomeActiveBlog] = useState<typeof BLOG_POSTS[0] | null>(null);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('docplus_appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      // Pre-seed an appointment for Zainab Fatima to make the dashboard look populated right away!
      const initial: Appointment[] = [
        {
          id: "DOC-288310",
          patientName: "Zainab Fatima",
          patientEmail: "patient@example.com",
          patientPhone: "+92 301 7654321",
          treatmentId: "laser-resurfacing",
          date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days in future
          time: "02:00 PM",
          status: 'confirmed',
          notes: "Focusing on forehead acne scars and hyperpigmentation.",
          doctorName: "Dr. Ayesha Malik",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('docplus_appointments', JSON.stringify(initial));
      setAppointments(initial);
    }
  }, []);

  const handleBookingComplete = (newApp: Appointment) => {
    const updated = [newApp, ...appointments];
    setAppointments(updated);
    localStorage.setItem('docplus_appointments', JSON.stringify(updated));
    // Redirect to patient portal dashboard to view their booked sessions!
    setActiveTab('portal');
  };

  const handleQuickBook = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setActiveTab('booking');
  };

  const handleBookDoctor = (doctorName: string) => {
    // Switch to booking, and doctorName will select inside Step 3 in BookingForm
    setActiveTab('booking');
  };

  const handleLogout = () => {
    setCurrentPatient(null);
    localStorage.removeItem('docplus_current_patient');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col text-primary">
      {/* Navbar Component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLoggedIn={!!currentPatient}
        onLogout={handleLogout}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* ==================== 1. HOME PAGE ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-20 pb-20 animate-fade-in">
            {/* 1.1 PREMIUM DRIBBBLE-STYLE HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column - High-Fashion Dermatology Card */}
              <div 
                className="lg:col-span-7 rounded-[32px] bg-primary relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 min-h-[500px] lg:min-h-[600px] shadow-xl text-white group"
                style={{ 
                  backgroundImage: `linear-gradient(to bottom, rgba(30, 53, 47, 0.45), rgba(30, 53, 47, 0.95)), url('/src/assets/images/dermatology_editorial_hero_1784620875245.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Card Header (Logo and Badges) */}
                <div className="flex justify-between items-start z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/25 backdrop-blur-md flex items-center justify-center border border-accent/20">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-[10px] tracking-widest font-mono uppercase font-semibold text-accent/90">
                      Dr. Ayesha Malik
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-mono text-[9px] tracking-wider uppercase font-semibold">
                    Faisalabad Premier
                  </span>
                </div>

                {/* Center / Bottom Content: Title & CTA */}
                <div className="space-y-6 z-10 mt-24">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-accent uppercase block mb-1 font-bold">
                      Medical & Cosmetic Dermatology
                    </span>
                    <h1 className="text-5xl sm:text-7xl lg:text-[85px] font-display font-medium text-accent leading-none tracking-tight select-none">
                      DERMATOLOGY
                    </h1>
                    <p className="text-xl sm:text-2xl font-display font-light text-white/90 leading-tight mt-3">
                      Personalized Skin Care With <span className="text-accent italic font-semibold">Dr. Ayesha Malik</span>
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg font-sans">
                    Faisalabad's elite clinical skin workspace. We combine certified medical dermatology and state-of-the-art FDA-cleared laser resurfacing to craft pure confidence.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      id="hero-btn-book"
                      onClick={() => setActiveTab('booking')}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent hover:bg-accent/95 text-primary font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:scale-[1.02]"
                    >
                      Book Free Consultation
                    </button>
                    <button
                      id="hero-btn-treatments"
                      onClick={() => setActiveTab('treatments')}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      Explore Procedures
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Clinique Treatment & 3 Steps Workflow */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                {/* Top: Treatment Editorial Image Box */}
                <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-4 flex flex-col sm:flex-row gap-4 items-center shadow-xs">
                  <div className="w-full sm:w-48 aspect-4/3 rounded-2xl overflow-hidden relative shrink-0">
                    <img 
                      src="/src/assets/images/derma_treatment_editorial_1784620902611.jpg" 
                      alt="Facial Aesthetic Care" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary shadow-lg animate-pulse cursor-pointer" onClick={() => setActiveTab('treatments')}>
                        <Zap className="w-5 h-5 fill-current text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 py-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/20 text-primary font-mono text-[9px] font-bold uppercase tracking-wider">
                      Advanced Care
                    </span>
                    <h3 className="text-base font-display font-semibold text-primary leading-tight">
                      We help you think bigger than traditional skincare.
                    </h3>
                    <p className="text-[11px] text-primary/70 leading-relaxed font-sans">
                      Our customized formulations provide active dermal barrier repair and collagen replenishment.
                    </p>
                  </div>
                </div>

                {/* Bottom: 3-Step Treatment Journey */}
                <div className="bg-white border border-primary/10 rounded-[32px] p-6 sm:p-8 space-y-6 shadow-xs flex-1 flex flex-col justify-center">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-primary/50 uppercase font-semibold block">Simple Steps To Glowing Skin</span>
                    <h3 className="text-xl font-display font-bold text-primary">Expert Skin Care In Three Steps</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="flex gap-4 items-start border-l-2 border-accent pl-4 py-1">
                      <span className="font-mono text-xs font-bold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-primary">Book Your Consultation</h4>
                        <p className="text-[11px] text-primary/70 leading-relaxed">Schedule a session online or call our clinical desk.</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4 items-start border-l-2 border-accent pl-4 py-1">
                      <span className="font-mono text-xs font-bold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-primary">Personalized Evaluation</h4>
                        <p className="text-[11px] text-primary/70 leading-relaxed">Get your skin layers analyzed under digital dermatological scanners.</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4 items-start border-l-2 border-accent pl-4 py-1">
                      <span className="font-mono text-xs font-bold text-white bg-primary w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-primary">Dermal Treatment Plan</h4>
                        <p className="text-[11px] text-primary/70 leading-relaxed">Receive custom FDA-approved laser treatments and barrier healing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 1.9 CLINIC STATISTICS (Key Metrics Bar) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
              <div className="bg-white rounded-3xl border border-primary/10 shadow-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-primary/10">
                <div className="text-center md:pb-0 pb-6">
                  <span className="block text-4xl font-display font-bold text-primary">12+ Years</span>
                  <span className="block text-[10px] text-primary/60 uppercase tracking-widest font-mono font-bold mt-1">Dermatology Experience</span>
                </div>
                <div className="text-center md:py-0 py-6">
                  <span className="block text-4xl font-display font-bold text-primary">15,000+</span>
                  <span className="block text-[10px] text-primary/60 uppercase tracking-widest font-mono font-bold mt-1">Glowing Skin Patients</span>
                </div>
                <div className="text-center md:pt-0 pt-6">
                  <span className="block text-4xl font-display font-bold text-primary">99.8%</span>
                  <span className="block text-[10px] text-primary/60 uppercase tracking-widest font-mono font-bold mt-1">Clinical Success Rate</span>
                </div>
              </div>
            </section>

            {/* 1.3 WHY CHOOSE US (Bento Grid) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Our Integrity Standard</span>
                <h2 className="text-3xl font-display font-semibold text-primary">Why Choose Doc+ Dermatology</h2>
                <p className="text-xs text-primary/60 max-w-lg mx-auto">
                  We blend certified dermatology wisdom with high-end, painless aesthetic procedures to deliver permanent dermatological transformations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1 */}
                <div className="bg-white border border-primary/10 rounded-[32px] p-8 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-primary">Certified Doctors</h3>
                  <p className="text-xs text-primary/70 leading-relaxed">
                    Our panel comprises FCPS specialists with cumulative decades of clinical tenure at leading hospital surgical wards. We diagnose skin concerns safely.
                  </p>
                </div>
                {/* 2 */}
                <div className="bg-white border border-primary/10 rounded-[32px] p-8 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-primary">Pioneering Lasers</h3>
                  <p className="text-xs text-primary/70 leading-relaxed">
                    We employ premium FDA-cleared fractional lasers, surgical micro-needles, and advanced HydraFacial engines to provide pain-free treatment logs.
                  </p>
                </div>
                {/* 3 */}
                <div className="bg-white border border-primary/10 rounded-[32px] p-8 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-primary">Strict Sterilization</h3>
                  <p className="text-xs text-primary/70 leading-relaxed">
                    We follow strict medical autoclave protocols. Every treatment room is disinfected and sterilized following world-class dermatological hospital criteria.
                  </p>
                </div>
              </div>
            </section>

            {/* 1.4 FEATURED TREATMENTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Aesthetic Highlights</span>
                  <h2 className="text-3xl font-display font-semibold text-primary">Featured Treatment Procedures</h2>
                </div>
                <button
                  id="btn-see-all-treatments"
                  onClick={() => setActiveTab('treatments')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-primary/20 hover:bg-primary/5 text-xs font-semibold text-primary transition-all shrink-0"
                >
                  See All Treatments <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TREATMENTS.slice(0, 3).map((treatment) => (
                  <TreatmentCard 
                    key={treatment.id} 
                    treatment={treatment} 
                    onBookNow={handleQuickBook} 
                  />
                ))}
              </div>
            </section>

            {/* 1.5 MEET OUR SPECIALISTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Clinical Leaders</span>
                <h2 className="text-3xl font-display font-semibold text-primary">Meet Our Specialized Dermatologists</h2>
                <p className="text-xs text-primary/60 max-w-lg mx-auto">
                  Our doctors hold advanced certifications and memberships with the Pakistan Association of Dermatologists (PAD).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {CLINIC_INFO.doctors.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-[32px] border border-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center hover:shadow-md transition-all">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-sm shrink-0">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-3 flex-1 text-center sm:text-left">
                      <div>
                        <h3 className="text-lg font-display font-bold text-primary">{doc.name}</h3>
                        <p className="text-xs text-primary/80 font-mono font-bold uppercase tracking-wider">{doc.specialty}</p>
                      </div>
                      <p className="text-xs text-primary/70 line-clamp-2 leading-relaxed">{doc.bio}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-[11px] text-primary/60 pt-1.5">
                        <span className="flex items-center gap-1 font-mono"><Clock className="w-3.5 h-3.5 text-primary" /> {doc.schedule}</span>
                        <span>•</span>
                        <span className="font-semibold text-primary/80">{doc.experience} Experience</span>
                      </div>
                      <div className="pt-2">
                        <button
                          id={`home-btn-book-${doc.id}`}
                          onClick={() => handleBookDoctor(doc.name)}
                          className="px-5 py-2 rounded-full bg-primary hover:bg-primary/95 text-accent text-[11px] font-bold tracking-wider uppercase transition-all"
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 1.11 TOUR OUR PREMIUM CLINIC (Professional Pictures Grid) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Virtual Facility Tour</span>
                  <h2 className="text-3xl font-display font-semibold text-primary">Inside Doc+ Dermatology Clinic</h2>
                  <p className="text-xs text-primary/60 max-w-lg">
                    Take a digital walkthrough of our ultra-modern, sterilized Faisalabad facility designed for clinical safety and luxury patient comfort.
                  </p>
                </div>
                <button
                  id="btn-home-see-gallery"
                  onClick={() => setActiveTab('gallery')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-primary/20 hover:bg-primary/5 text-xs font-semibold text-primary transition-all shrink-0"
                >
                  View Full Gallery <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Image 1: Reception */}
                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img 
                      src="/src/assets/images/clinic_interior_1784604026769.jpg" 
                      alt="Modern Clinical Reception" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-accent" /> Zoom & Explore
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/55 font-bold">Lobby & Reception</span>
                    <h4 className="text-sm font-semibold text-primary">Modern Clinical Reception Suite</h4>
                    <p className="text-[11px] text-primary/60 leading-relaxed">
                      Sleek aesthetic layout offering direct registration desks and calming client waiting lounges.
                    </p>
                  </div>
                </div>

                {/* Image 2: Laser */}
                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img 
                      src="/src/assets/images/laser_procedure_1784603065821.jpg" 
                      alt="FDA-Approved Fractional Laser" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-accent" /> Zoom & Explore
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/55 font-bold">Laser Suite</span>
                    <h4 className="text-sm font-semibold text-primary">FDA-Approved Treatment Setup</h4>
                    <p className="text-[11px] text-primary/60 leading-relaxed">
                      Equipped with high-precision fractional lasers and state-of-the-art contact skin cooling units.
                    </p>
                  </div>
                </div>

                {/* Image 3: Facial */}
                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img 
                      src="/src/assets/images/facial_procedure_1784603091197.jpg" 
                      alt="Hydrafacial Treatment Room" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-accent" /> Zoom & Explore
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/55 font-bold">Procedure Room</span>
                    <h4 className="text-sm font-semibold text-primary">Clinical HydraFacial System</h4>
                    <p className="text-[11px] text-primary/60 leading-relaxed">
                      Customized serum infusion and gentle hydro-dermabrasion systems within sterile environments.
                    </p>
                  </div>
                </div>

                {/* Image 4: Vanity */}
                <div 
                  onClick={() => setActiveTab('gallery')}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-primary/10 shadow-xs hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img 
                      src="/src/assets/images/skincare_vanity_1784603112992.jpg" 
                      alt="Clinical Skincare Vanity" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-[11px] font-mono tracking-wider flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-accent" /> Zoom & Explore
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-primary/55 font-bold">Preparation Desk</span>
                    <h4 className="text-sm font-semibold text-primary">Clinical Skincare Vanity</h4>
                    <p className="text-[11px] text-primary/60 leading-relaxed">
                      Dermatologically matched formulations and medical chemical peels stored in temperature-regulated desks.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 1.6 BEFORE & AFTER PREVIEW */}
            <section className="bg-primary/5 py-16 border-t border-b border-primary/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider text-primary bg-primary/5 border border-primary/10 uppercase">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-primary" /> Clinical Success Logs
                  </div>
                  <h2 className="text-3xl font-display font-semibold text-primary leading-tight">
                    Real Transformations. <br />
                    Real Skin Confidence.
                  </h2>
                  <p className="text-xs sm:text-sm text-primary/75 leading-relaxed font-sans">
                    Review a case study snapshot of a patient undergoing active <strong>Fractional Laser Skin Resurfacing</strong> for severe cheek acne scars. After 3 sessions spaced 4 weeks apart, notice deep tissue regeneration and smooth textures.
                  </p>
                  <div className="space-y-4 pt-2 text-xs">
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-primary">92% Scar Clearance</strong>
                        <span className="text-primary/60">Noticeable flattening of deep-set boxcar & icepick scars.</span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <CheckCircle className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-primary">Zero Hyperpigmentation</strong>
                        <span className="text-primary/60">Uniform skin tone balancing with safe clinical downtime.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-white p-4 sm:p-6 rounded-[32px] border border-primary/10 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Before */}
                      <div className="space-y-2 relative">
                        <span className="absolute top-3 left-3 bg-red-600 text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-md z-10">Before</span>
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img 
                            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400&h=300&fit=crop" 
                            alt="Before Acne Scar Treatment" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="block text-[10px] text-primary/50 text-center">Active breakouts, deep indentation, uneven texture</span>
                      </div>
                      
                      {/* After */}
                      <div className="space-y-2 relative">
                        <span className="absolute top-3 left-3 bg-emerald-700 text-white font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded-md z-10">After (3 Sessions)</span>
                        <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img 
                            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&h=300&fit=crop" 
                            alt="After Scar Treatment" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="block text-[10px] text-primary/50 text-center">Restored collagen, smooth epidermis, uniform glow</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-primary/50 pt-2 border-t border-primary/5 font-mono">
                      <span>Procedure: Fractional CO2 Laser Resurfacing</span>
                      <span>Consultant: Dr. Ayesha Malik</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 1.7 PATIENT TESTIMONIALS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">True Patient Feedback</span>
                <h2 className="text-3xl font-display font-semibold text-primary">Glowing Skincare Reviews</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div 
                    id={`testimonial-home-${t.id}`}
                    key={t.id} 
                    className="bg-white rounded-[32px] border border-primary/10 p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex gap-0.5 text-amber-500 mb-3.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-primary/80 italic leading-relaxed mb-4">
                        "{t.text}"
                      </p>
                    </div>
                    <div className="pt-3 border-t border-primary/10 flex justify-between items-center text-[10px]">
                      <div>
                        <strong className="block text-primary">{t.name}</strong>
                        <span className="text-primary/50 font-mono mt-0.5">{t.treatmentName}</span>
                      </div>
                      <span className="text-primary/50 font-mono">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 1.8 LATEST BLOG POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Skin Science Library</span>
                  <h2 className="text-3xl font-display font-semibold text-primary">Latest Skincare Journal Advice</h2>
                </div>
                <button
                  id="btn-home-see-all-blog"
                  onClick={() => setActiveTab('blog')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-primary/20 hover:bg-primary/5 text-xs font-semibold text-primary transition-all shrink-0"
                >
                  See All Articles <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {BLOG_POSTS.slice(0, 3).map((post) => (
                  <article key={post.id} className="bg-white rounded-[32px] border border-primary/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="aspect-video bg-slate-100 overflow-hidden relative">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <span className="absolute top-3 left-3 bg-white border border-primary/15 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-primary uppercase">
                          {post.category}
                        </span>
                      </div>
                      <div className="px-6 space-y-2">
                        <div className="flex items-center gap-3 text-[10px] text-primary/50 font-mono">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-primary leading-snug line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-primary/70 line-clamp-2">{post.summary}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-4 border-t border-primary/5 flex items-center justify-between text-xs mt-4">
                      <span className="text-primary/50 font-mono">By {post.author}</span>
                      <button
                        id={`btn-home-read-blog-${post.id}`}
                        onClick={() => setHomeActiveBlog(post)}
                        className="font-bold text-primary hover:text-primary/80 inline-flex items-center gap-1"
                      >
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 1.10 CLINIC MAP & CONTACT QUICK WIDGET */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-primary/60 uppercase tracking-widest block">Geographical Landmark</span>
                <h2 className="text-3xl font-display font-semibold text-primary">Visit Faisalabad Main Office</h2>
              </div>
              <ClinicMap />
            </section>

            {/* HOME BLOG ARTICLE LIGHTBOX MODAL */}
            {homeActiveBlog && (
              <div id="home-blog-modal" className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-[32px] border border-primary/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 animate-fade-in">
                  <button onClick={() => setHomeActiveBlog(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-primary/55 hover:text-red-500 hover:scale-105 border border-primary/10 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                  <div className="space-y-4 pt-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-primary text-accent uppercase tracking-widest font-bold">{homeActiveBlog.category}</span>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-primary leading-tight">{homeActiveBlog.title}</h2>
                    <div className="flex justify-between items-center text-xs text-primary/50 border-b border-primary/5 pb-3 font-mono">
                      <span>Author: {homeActiveBlog.author}</span>
                      <span>Published: {homeActiveBlog.date}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-primary/80 leading-relaxed whitespace-pre-line pt-2">
                      {homeActiveBlog.content}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. ABOUT US PAGE ==================== */}
        {activeTab === 'about' && <AboutPage />}

        {/* ==================== 3. DOCTORS PAGE ==================== */}
        {activeTab === 'doctors' && <DoctorsPage onBookDoctor={handleBookDoctor} />}

        {/* ==================== 4. TREATMENTS PAGE ==================== */}
        {activeTab === 'treatments' && (
          <TreatmentsPage 
            onBookNow={handleQuickBook} 
            preselectedId={selectedTreatmentId}
          />
        )}

        {/* ==================== 5. GALLERY PAGE ==================== */}
        {activeTab === 'gallery' && <GalleryPage />}

        {/* ==================== 6. BLOG PAGE ==================== */}
        {activeTab === 'blog' && <BlogPage />}

        {/* ==================== 7. APPOINTMENT RESERVATION PAGE ==================== */}
        {activeTab === 'booking' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-primary/5 border border-primary/10 uppercase text-primary/60">
                Interactive Reservation
              </span>
              <h2 className="text-3xl font-display font-semibold text-primary">Schedule a Clinical Session</h2>
              <p className="text-xs text-primary/60">
                Reserve your slot with our dermatology panel. Select your treatment and pick your preferred consultant. Your appointment will register in your patient portal right away.
              </p>
            </div>

            <BookingForm 
              preselectedTreatmentId={selectedTreatmentId}
              onBookingComplete={handleBookingComplete}
              patientProfile={currentPatient}
            />
          </div>
        )}

        {/* ==================== 8. FAQs PAGE ==================== */}
        {activeTab === 'faqs' && <FAQsPage />}

        {/* ==================== 9. CONTACT PAGE ==================== */}
        {activeTab === 'contact' && <ContactPage />}

        {/* ==================== 10. PATIENT PORTAL TAB ==================== */}
        {activeTab === 'portal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
            <PatientDashboard 
              onLoginStateChange={setCurrentPatient}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          </div>
        )}
      </main>

      {/* ==================== 1.10 FOOTER ==================== */}
      <footer className="bg-primary text-white border-t border-white/10 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">
                <Stethoscope className="w-4 h-4 text-primary" />
              </div>
              <span className="text-base font-display font-bold text-white tracking-tight">Doc+ Dermatology</span>
            </div>
            <p className="text-white/70 leading-relaxed pr-4 text-[11px]">
              Punjab's premium clinic specializing in clinical diagnostics, advanced aesthetics, laser skin resurfacing, and patient portal-guided tracking.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider">Quick Shortcuts</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-accent transition-colors text-left">Clinic Home</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-accent transition-colors text-left">Clinical Treatments</button></li>
              <li><button onClick={() => setActiveTab('booking')} className="hover:text-accent transition-colors text-left">Schedule Session</button></li>
              <li><button onClick={() => setActiveTab('portal')} className="hover:text-accent transition-colors text-left">Secure Patient Portal</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider">Our Address Label</h4>
            <div className="space-y-2.5 text-white/70 leading-relaxed text-[11px]">
              <p>{CLINIC_INFO.building}</p>
              <p>{CLINIC_INFO.address}</p>
              <p className="font-mono text-[10px] text-white/50">Plus Code: {CLINIC_INFO.plusCode}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider">In-Clinic Helpline</h4>
            <div className="space-y-2 text-white/70">
              <a href={`tel:${CLINIC_INFO.phone}`} className="text-white hover:text-accent font-semibold block transition-colors">
                {CLINIC_INFO.phone}
              </a>
              <p className="text-[11px]">Operational hours: Mon-Sat 11:00 AM - 08:00 PM</p>
              <div className="bg-white/10 p-2.5 rounded border border-white/10 inline-block text-[10px] text-white/80">
                ⚠️ Emergency skincare complications? Please visit the general hospital ER first.
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 text-center text-white/40 text-[10px] flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Doc+ Dermatology & Laser Clinic Pakistan. All Rights Reserved.</span>
          <span className="font-mono text-white/30">Secure SSL Encrypted Client-Side Patient Portal Integration</span>
        </div>
      </footer>
    </div>
  );
}

// Simple close icon helper component inline
function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  );
}
