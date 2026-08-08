import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
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
import SupabaseAuthModal from './components/SupabaseAuthModal';
import { supabase, isSupabaseConfigured } from './lib/supabase';

import { TREATMENTS, TESTIMONIALS, CLINIC_INFO, BLOG_POSTS } from './data';
import { Appointment, PatientProfile } from './types';
import { 
  Sparkles, ShieldCheck, Trophy, Star, ChevronRight, 
  MapPin, Clock, Phone, Stethoscope, ArrowRight, ArrowLeftRight, CheckCircle, Zap, Eye, X, ChevronLeft,
  Crown, ClipboardList, Award, Database, User
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // For the homepage blog modal
  const [homeActiveBlog, setHomeActiveBlog] = useState<typeof BLOG_POSTS[0] | null>(null);

  // Carousel index for luxury procedure showcase
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Load appointments from Supabase database, Cloud SQL API, and localStorage
  useEffect(() => {
    const fetchAppointments = async () => {
      // 1. Try fetching from Supabase if configured
      if (isSupabaseConfigured()) {
        try {
          const { data: sbApps, error: sbErr } = await supabase
            .from('appointments')
            .select('*')
            .order('created_at', { ascending: false });

          if (!sbErr && sbApps && sbApps.length > 0) {
            const mapped: Appointment[] = sbApps.map((a: any) => ({
              id: a.id ? `SB-${a.id.slice(0, 6)}` : `DOC-${Math.floor(Math.random() * 100000)}`,
              patientName: a.patient_name || 'Patient',
              patientEmail: a.patient_email || 'patient@example.com',
              patientPhone: a.patient_phone || '+92 300 0000000',
              treatmentId: a.treatment_id || 'general',
              date: a.date,
              time: a.time,
              status: a.status || 'confirmed',
              notes: a.notes || '',
              doctorName: 'Dr. Ayesha Malik',
              createdAt: a.created_at || new Date().toISOString()
            }));
            setAppointments(mapped);
            return;
          }
        } catch (err) {
          console.warn('Supabase fetch appointments notice:', err);
        }
      }

      // 2. Fallback to Cloud SQL API
      try {
        const res = await fetch('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          if (data.appointments && data.appointments.length > 0) {
            const mapped: Appointment[] = data.appointments.map((a: any) => ({
              id: `DOC-${a.id}`,
              patientName: a.patientName,
              patientEmail: "patient@example.com",
              patientPhone: a.phone,
              treatmentId: a.treatmentId,
              date: a.date,
              time: a.time,
              status: a.status || 'confirmed',
              notes: a.notes || '',
              doctorName: "Dr. Ayesha Malik",
              createdAt: a.createdAt || new Date().toISOString()
            }));
            setAppointments(mapped);
            return;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch appointments from Cloud SQL API:', err);
      }

      // 3. Fallback to local storage if database empty
      const saved = localStorage.getItem('docplus_appointments');
      if (saved) {
        setAppointments(JSON.parse(saved));
      } else {
        const initial: Appointment[] = [
          {
            id: "DOC-288310",
            patientName: "Zainab Fatima",
            patientEmail: "patient@example.com",
            patientPhone: "+92 301 7654321",
            treatmentId: "laser-resurfacing",
            date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
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
    };

    fetchAppointments();
  }, []);


  const handleBookingComplete = (newApp: Appointment) => {
    const updated = [newApp, ...appointments];
    setAppointments(updated);
    localStorage.setItem('docplus_appointments', JSON.stringify(updated));
    setActiveTab('portal');
  };

  const handleQuickBook = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setActiveTab('booking');
  };

  const handleBookDoctor = (doctorName: string) => {
    setActiveTab('booking');
  };

  const handleLogout = () => {
    setCurrentPatient(null);
    localStorage.removeItem('docplus_current_patient');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#122315] flex flex-col text-[#1C1917] selection:bg-[#C5A880] selection:text-[#122315]">
      {/* Navbar Component */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isLoggedIn={!!currentPatient}
        onLogout={handleLogout}
      />

      {/* Main Page Layout */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          {/* ==================== 1. HOME PAGE (ANIMATED BACKGROUND & TITLE ONLY) ==================== */}
          {activeTab === 'home' && (
            <motion.div 
              key="home-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HomePage />
            </motion.div>
          )}

          {/* ==================== 2. ABOUT US PAGE ==================== */}
          {activeTab === 'about' && (
            <motion.div key="about-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <AboutPage />
            </motion.div>
          )}

          {/* ==================== 3. DOCTORS PAGE ==================== */}
          {activeTab === 'doctors' && (
            <motion.div key="doctors-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <DoctorsPage onBookDoctor={handleBookDoctor} />
            </motion.div>
          )}

          {/* ==================== 4. TREATMENTS PAGE ==================== */}
          {activeTab === 'treatments' && (
            <motion.div key="treatments-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <TreatmentsPage 
                onBookNow={handleQuickBook} 
                preselectedId={selectedTreatmentId}
              />
            </motion.div>
          )}

          {/* ==================== 5. GALLERY PAGE ==================== */}
          {activeTab === 'gallery' && (
            <motion.div key="gallery-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <GalleryPage />
            </motion.div>
          )}

          {/* ==================== 6. BLOG PAGE ==================== */}
          {activeTab === 'blog' && (
            <motion.div key="blog-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <BlogPage />
            </motion.div>
          )}

          {/* ==================== 7. APPOINTMENT RESERVATION PAGE ==================== */}
          {activeTab === 'booking' && (
            <motion.div key="booking-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
              <div className="text-center space-y-3 max-w-xl mx-auto text-white">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/30 uppercase tracking-widest">
                  Sanctuary Reservation
                </span>
                <h2 className="text-3xl font-serif">Schedule a Clinical Session</h2>
                <p className="text-xs text-[#EAE4DC] leading-relaxed">
                  Reserve your slot with our dermatology panel. Select your procedure and pick your preferred consultant. Your appointment will register in your patient portal instantly.
                </p>
              </div>

              <BookingForm 
                preselectedTreatmentId={selectedTreatmentId}
                onBookingComplete={handleBookingComplete}
                patientProfile={currentPatient}
              />
            </motion.div>
          )}

          {/* ==================== 8. FAQs PAGE ==================== */}
          {activeTab === 'faqs' && (
            <motion.div key="faqs-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <FAQsPage />
            </motion.div>
          )}

          {/* ==================== 9. CONTACT PAGE ==================== */}
          {activeTab === 'contact' && (
            <motion.div key="contact-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="py-8">
              <ContactPage />
            </motion.div>
          )}

          {/* ==================== 10. PATIENT PORTAL TAB ==================== */}
          {activeTab === 'portal' && (
            <motion.div key="portal-tab" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <PatientDashboard 
                onLoginStateChange={setCurrentPatient}
                appointments={appointments}
                setAppointments={setAppointments}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#0D180E] text-white border-t border-[#C5A880]/20 py-16 text-xs relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A3121] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                <span className="font-serif italic font-bold text-lg">L</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-white tracking-tight">LUMÉA</span>
                <span className="block text-[9px] font-medium tracking-[0.2em] text-[#C5A880] uppercase -mt-1">Botanical Skin Sanctuary</span>
              </div>
            </div>
            <p className="text-[#EAE4DC]/80 leading-relaxed text-[11px] pr-4">
              Premium dermatology sanctuary specializing in clinical diagnostics, laser resurfacing, and personalized skin care regimens.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C5A880] uppercase tracking-widest">Quick Navigation</h4>
            <ul className="space-y-2.5 text-[#EAE4DC]/80">
              <li><button onClick={() => setActiveTab('about')} className="hover:text-[#C5A880] transition-colors cursor-pointer">About Our Sanctuary</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-[#C5A880] transition-colors cursor-pointer">Laser & Dermal Procedures</button></li>
              <li><button onClick={() => setActiveTab('doctors')} className="hover:text-[#C5A880] transition-colors cursor-pointer">Specialist Panel</button></li>
              <li><button onClick={() => setActiveTab('booking')} className="hover:text-[#C5A880] transition-colors cursor-pointer">Book Consultation</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C5A880] uppercase tracking-widest">Signature Treatments</h4>
            <ul className="space-y-2.5 text-[#EAE4DC]/80">
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-[#C5A880] transition-colors text-left cursor-pointer">CO2 Laser Resurfacing</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-[#C5A880] transition-colors text-left cursor-pointer">HydraFacial Glow Care</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-[#C5A880] transition-colors text-left cursor-pointer">Aesthetic Botox Therapy</button></li>
              <li><button onClick={() => setActiveTab('treatments')} className="hover:text-[#C5A880] transition-colors text-left cursor-pointer">Scalp PRP Hair Therapy</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#C5A880] uppercase tracking-widest">Sanctuary Hours</h4>
            <div className="space-y-2.5 text-[#EAE4DC]/80">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#C5A880]" /> {CLINIC_INFO.address}</p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#C5A880]" /> {CLINIC_INFO.phone}</p>
              <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[#C5A880]" /> {CLINIC_INFO.timings}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[#C5A880]/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#EAE4DC]/60">
          <p>© {new Date().getFullYear()} LUMÉA Botanical Skin Sanctuary. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#C5A880] transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#C5A880] transition-colors cursor-pointer">Terms of Clinical Service</span>
          </div>
        </div>
      </footer>

      {/* Supabase Authentication & Database Modal */}
      <SupabaseAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setActiveTab('portal');
        }}
      />
    </div>
  );
}

