import React, { useState, useEffect } from 'react';
import { Appointment, PatientProfile, PhotoLogEntry } from '../types';
import { TREATMENTS } from '../data';
import { 
  Lock, LogIn, Calendar, ClipboardList, Shield, Camera, Plus, 
  Trash2, CheckCircle2, Pill, Activity, UserCheck, AlertCircle, Sparkles, UserPlus, Database
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface PatientDashboardProps {
  onLoginStateChange: (profile: PatientProfile | null) => void;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

const PRESEEDED_PROFILE: PatientProfile = {
  id: "PAT-88210",
  name: "Zainab Fatima",
  email: "patient@example.com",
  phone: "+92 301 7654321",
  memberSince: "October 14, 2025",
  medicalHistory: ["Grade II Acne Vulgaris", "Post-Inflammatory Hyperpigmentation", "Dry Skin Barrier Sensitivity"],
  recommendedSkincare: [
    "Morning: Ceramide Hydra-Cleanser, Vitamin C 10% Serum, Hyaluronic Gel, Broad Spectrum Sunscreen SPF 50",
    "Evening: Gentle Milky Cleanser, Tretinoin 0.025% Cream (applied pea-sized on alternate nights), Soothing Barrier Recovery Balm"
  ],
  prescriptions: [
    {
      id: "RX-9921",
      date: "2026-06-15",
      medicineName: "Tretinoin 0.025% Topical Cream",
      dosage: "Pea-sized amount",
      frequency: "Alternate nights before bedtime",
      duration: "3 Months",
      doctorName: "Dr. Ayesha Malik"
    },
    {
      id: "RX-9922",
      date: "2026-06-15",
      medicineName: "Clindamycin 1% + Zinc Topical Gel",
      dosage: "Thin layer on active lesions",
      frequency: "Every morning after washing face",
      duration: "6 Weeks",
      doctorName: "Dr. Ayesha Malik"
    }
  ],
  photoLogs: [
    {
      id: "log-1",
      date: "2026-06-15",
      notes: "First day starting the Tretinoin and Hydrafacial regimen. Heavy redness on cheeks and active forehead breakouts.",
      imageUrl: "https://picsum.photos/seed/dermatology_before/400/400",
      tag: "Initial"
    },
    {
      id: "log-2",
      date: "2026-07-10",
      notes: "After 1 laser session and regular serum application. Forehead has completely flattened out. Hyperpigmentation fading beautifully.",
      imageUrl: "https://picsum.photos/seed/dermatology_after/400/400",
      tag: "Progress"
    }
  ]
};

export default function PatientDashboard({ onLoginStateChange, appointments, setAppointments }: PatientDashboardProps) {
  const [profile, setProfile] = useState<PatientProfile | null>(() => {
    const saved = localStorage.getItem('docplus_current_patient');
    return saved ? JSON.parse(saved) : null;
  });

  // Login/Signup Form States
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("patient@example.com");
  const [password, setPassword] = useState("password");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'routine' | 'rx' | 'tracker' | 'appointments'>('routine');

  // Photo Log Add States
  const [newLogNotes, setNewLogNotes] = useState("");
  const [newLogTag, setNewLogTag] = useState<'Progress' | 'Concern' | 'Initial'>('Progress');
  const [newLogImage, setNewLogImage] = useState("");
  const [trackerMessage, setTrackerMessage] = useState("");

  // Routine Checklist Compliance States
  const [routineStatus, setRoutineStatus] = useState<Record<string, boolean>>({
    'am-cleanse': true,
    'am-vitc': false,
    'am-moisturize': true,
    'am-spf': true,
    'pm-cleanse': false,
    'pm-tret': false,
    'pm-balm': false,
  });

  const configured = isSupabaseConfigured();

  // Listen to Supabase auth state changes
  useEffect(() => {
    if (!configured) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const sbUser = session.user;
        const name = sbUser.user_metadata?.full_name || sbUser.email?.split('@')[0] || "Valued Patient";
        const sbProfile: PatientProfile = {
          id: `PAT-${sbUser.id.slice(0, 5).toUpperCase()}`,
          name,
          email: sbUser.email || "",
          phone: "+92 300 0000000",
          memberSince: new Date(sbUser.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          medicalHistory: ["Customized Clinical Care Plan Active"],
          recommendedSkincare: PRESEEDED_PROFILE.recommendedSkincare,
          prescriptions: PRESEEDED_PROFILE.prescriptions,
          photoLogs: PRESEEDED_PROFILE.photoLogs,
        };

        setProfile(sbProfile);
        localStorage.setItem('docplus_current_patient', JSON.stringify(sbProfile));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  useEffect(() => {
    onLoginStateChange(profile);
  }, [profile, onLoginStateChange]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");
    setIsSubmitting(true);

    // Try Supabase Auth first if configured
    if (configured) {
      try {
        if (isSignUp) {
          const { data, error: sbErr } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName || email.split('@')[0] },
            },
          });

          if (sbErr) throw sbErr;

          if (data.user) {
            setLoginSuccess("Account created successfully with Supabase!");
            const sbProfile: PatientProfile = {
              id: `PAT-${data.user.id.slice(0, 5).toUpperCase()}`,
              name: fullName || email.split('@')[0],
              email: data.user.email || email,
              phone: "+92 300 0000000",
              memberSince: "Just Now",
              medicalHistory: ["Customized Clinical Skin Care Plan"],
              recommendedSkincare: PRESEEDED_PROFILE.recommendedSkincare,
              prescriptions: PRESEEDED_PROFILE.prescriptions,
              photoLogs: [],
            };
            setProfile(sbProfile);
            localStorage.setItem('docplus_current_patient', JSON.stringify(sbProfile));
            setIsSubmitting(false);
            return;
          }
        } else {
          const { data, error: sbErr } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (!sbErr && data.user) {
            const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || "Valued Patient";
            const sbProfile: PatientProfile = {
              id: `PAT-${data.user.id.slice(0, 5).toUpperCase()}`,
              name,
              email: data.user.email || email,
              phone: "+92 300 0000000",
              memberSince: new Date(data.user.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              medicalHistory: ["Active Dermatology Profile"],
              recommendedSkincare: PRESEEDED_PROFILE.recommendedSkincare,
              prescriptions: PRESEEDED_PROFILE.prescriptions,
              photoLogs: PRESEEDED_PROFILE.photoLogs,
            };

            setProfile(sbProfile);
            localStorage.setItem('docplus_current_patient', JSON.stringify(sbProfile));
            setIsSubmitting(false);
            return;
          }
        }
      } catch (err: any) {
        console.warn("Supabase Auth notice:", err.message);
        // Fall back to demo login if default credentials are used
      }
    }

    // Demo fallback check
    if (email === "patient@example.com" && password === "password") {
      const savedProfile = localStorage.getItem('docplus_patient_profile');
      let loadedProfile: PatientProfile = savedProfile ? JSON.parse(savedProfile) : PRESEEDED_PROFILE;
      
      setProfile(loadedProfile);
      localStorage.setItem('docplus_current_patient', JSON.stringify(loadedProfile));
      localStorage.setItem('docplus_patient_profile', JSON.stringify(loadedProfile));
      setLoginError("");
    } else {
      setLoginError("Invalid email address or passcode. (Use default test credentials or connect your Supabase keys!)");
    }

    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    if (configured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn("Supabase logout note:", err);
      }
    }
    setProfile(null);
    localStorage.removeItem('docplus_current_patient');
    onLoginStateChange(null);
  };

  const handleAddPhotoLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (!newLogNotes.trim()) {
      setTrackerMessage("Please enter notes describing your skin condition");
      return;
    }

    const finalImage = newLogImage.trim() || `https://picsum.photos/seed/skin_${Math.floor(Math.random() * 1000)}/400/400`;

    const newEntry: PhotoLogEntry = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      notes: newLogNotes,
      imageUrl: finalImage,
      tag: newLogTag
    };

    const updatedProfile = {
      ...profile,
      photoLogs: [newEntry, ...profile.photoLogs]
    };

    setProfile(updatedProfile);
    localStorage.setItem('docplus_patient_profile', JSON.stringify(updatedProfile));
    localStorage.setItem('docplus_current_patient', JSON.stringify(updatedProfile));
    
    setNewLogNotes("");
    setNewLogImage("");
    setTrackerMessage("Skin photo log uploaded and registered successfully!");
    setTimeout(() => setTrackerMessage(""), 4000);
  };

  const handleDeletePhotoLog = (id: string) => {
    if (!profile) return;
    const updatedLogs = profile.photoLogs.filter(log => log.id !== id);
    const updatedProfile = {
      ...profile,
      photoLogs: updatedLogs
    };
    setProfile(updatedProfile);
    localStorage.setItem('docplus_patient_profile', JSON.stringify(updatedProfile));
    localStorage.setItem('docplus_current_patient', JSON.stringify(updatedProfile));
  };

  const handleCancelAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this scheduled session?")) {
      const updated = appointments.filter(app => app.id !== id);
      setAppointments(updated);
      localStorage.setItem('docplus_appointments', JSON.stringify(updated));
    }
  };

  const filteredAppointments = appointments.filter(
    app => app.patientEmail.toLowerCase() === profile?.email.toLowerCase()
  );

  if (!profile) {
    return (
      <div 
        id="portal-login-gate"
        className="max-w-md mx-auto bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] shadow-xs overflow-hidden animate-fade-in"
      >
        <div className="bg-[#1A3121] text-white border-b border-[#C5A880]/30 p-6 text-center relative">
          <div className="w-12 h-12 rounded-full bg-[#C5A880] text-[#1A3121] flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-serif text-white">LUMÉA Patient Portal</h3>
          <p className="text-xs text-[#EAE4DC] mt-1">Access botanical formulations, prescriptions & skin progress</p>

          <div className="mt-4 flex rounded-full bg-black/20 p-1 border border-[#C5A880]/20">
            <button
              onClick={() => { setIsSignUp(false); setLoginError(""); setLoginSuccess(""); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${!isSignUp ? 'bg-[#C5A880] text-[#1A3121] shadow-xs' : 'text-[#EAE4DC] hover:text-white'}`}
            >
              Log In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setLoginError(""); setLoginSuccess(""); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${isSignUp ? 'bg-[#C5A880] text-[#1A3121] shadow-xs' : 'text-[#EAE4DC] hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {loginSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{loginSuccess}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C1917]">Full Name</label>
                <input
                  id="signup-name-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full text-xs rounded-xl border border-[#E5DFD5] bg-white p-3.5 focus:outline-hidden focus:border-[#1A3121]"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1C1917]">Registered Email Address</label>
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full text-xs rounded-xl border border-[#E5DFD5] bg-white p-3.5 focus:outline-hidden focus:border-[#1A3121]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#1C1917]">Passcode</label>
                {!isSignUp && <a href="#" className="text-xs text-[#1A3121] hover:underline font-semibold">Forgot Passcode?</a>}
              </div>
              <input
                id="login-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs rounded-xl border border-[#E5DFD5] bg-white p-3.5 focus:outline-hidden focus:border-[#1A3121]"
              />
            </div>

            <button
              id="btn-login-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#1A3121] hover:bg-[#26452F] disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md border border-[#C5A880]/30 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : isSignUp ? (
                <>
                  <UserPlus className="w-4 h-4 text-[#C5A880]" /> Create Supabase Patient Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-[#C5A880]" /> Secure Portal Access
                </>
              )}
            </button>
          </form>

          <div className="pt-5 border-t border-[#E5DFD5] bg-[#EAE4DC]/50 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-[#1A3121] uppercase tracking-wider mb-2 flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-[#C5A880]" /> Testing & Supabase Integration
            </h4>
            <p className="text-xs text-[#6E6A63] mb-2">
              {configured 
                ? "Supabase Auth is LIVE. You can Sign Up or Log In with real Supabase accounts!"
                : "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect real Supabase Auth. Demo credentials:"}
            </p>
            {!configured && (
              <div className="space-y-1 text-xs bg-white border border-[#E5DFD5] p-3 rounded-xl text-[#1C1917]">
                <div className="flex justify-between">
                  <span>Demo Email:</span>
                  <span className="font-bold text-[#1C1917]">patient@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Passcode:</span>
                  <span className="font-bold text-[#1C1917]">password</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-[#FBF9F5] rounded-[28px] border border-[#E5DFD5] overflow-hidden shadow-xs max-w-5xl mx-auto animate-fade-in">
      {/* Dashboard Top header banner */}
      <div className="bg-[#1A3121] text-white border-b border-[#C5A880]/30 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#C5A880] text-[#1A3121] flex items-center justify-center font-bold text-lg shadow-sm border border-white/20">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-serif text-white">{profile.name}</h3>
              <span className="bg-[#C5A880] text-[#1A3121] text-xs px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">
                BOTANICAL PRIME
              </span>
            </div>
            <p className="text-xs text-[#EAE4DC] mt-0.5">
              ID: <span className="font-bold text-white">{profile.id}</span> • Member Since: {profile.memberSince}
            </p>
          </div>
        </div>
        
        <button
          id="btn-portal-logout"
          onClick={handleLogout}
          className="text-xs font-bold px-4 py-2 border border-[#C5A880]/40 text-[#EAE4DC] hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0 cursor-pointer"
        >
          Secure Logout
        </button>
      </div>

      {/* Grid containing Skin Condition Alert / Diagnosis Summary */}
      <div className="px-6 py-4 bg-[#EAE4DC]/40 border-b border-[#E5DFD5] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 bg-white rounded-2xl border border-[#E5DFD5] flex items-start gap-3">
          <Activity className="w-5 h-5 text-[#1A3121] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">Active Diagnoses</span>
            <span className="block font-serif font-bold text-[#1C1917] mt-0.5">{profile.medicalHistory.join(', ')}</span>
          </div>
        </div>
        <div className="p-3.5 bg-white rounded-2xl border border-[#E5DFD5] flex items-start gap-3">
          <Pill className="w-5 h-5 text-[#1A3121] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">Active Prescriptions</span>
            <span className="block font-serif font-bold text-[#1C1917] mt-0.5">{profile.prescriptions.length} Dermatological Items</span>
          </div>
        </div>
        <div className="p-3.5 bg-white rounded-2xl border border-[#E5DFD5] flex items-start gap-3">
          <Calendar className="w-5 h-5 text-[#1A3121] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-[#C5A880] font-bold uppercase tracking-wider">Sessions Scheduled</span>
            <span className="block font-serif font-bold text-[#1C1917] mt-0.5">{filteredAppointments.length} Appointments Booked</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E5DFD5] bg-[#FBF9F5]">
        <div className="flex px-6 overflow-x-auto">
          <button
            id="subtab-btn-routine"
            onClick={() => setActiveSubTab('routine')}
            className={`py-4 px-4 font-serif text-xs font-bold tracking-wider uppercase border-b-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'routine'
                ? 'border-[#1A3121] text-[#1A3121]'
                : 'border-transparent text-[#6E6A63] hover:text-[#1C1917]'
            }`}
          >
            Botanical Care Plan
          </button>
          <button
            id="subtab-btn-rx"
            onClick={() => setActiveSubTab('rx')}
            className={`py-4 px-4 font-serif text-xs font-bold tracking-wider uppercase border-b-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'rx'
                ? 'border-[#1A3121] text-[#1A3121]'
                : 'border-transparent text-[#6E6A63] hover:text-[#1C1917]'
            }`}
          >
            Prescriptions ({profile.prescriptions.length})
          </button>
          <button
            id="subtab-btn-tracker"
            onClick={() => setActiveSubTab('tracker')}
            className={`py-4 px-4 font-serif text-xs font-bold tracking-wider uppercase border-b-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'tracker'
                ? 'border-[#1A3121] text-[#1A3121]'
                : 'border-transparent text-[#6E6A63] hover:text-[#1C1917]'
            }`}
          >
            Skin Progress Tracker
          </button>
          <button
            id="subtab-btn-appointments"
            onClick={() => setActiveSubTab('appointments')}
            className={`py-4 px-4 font-serif text-xs font-bold tracking-wider uppercase border-b-2 transition-all shrink-0 cursor-pointer ${
              activeSubTab === 'appointments'
                ? 'border-[#1A3121] text-[#1A3121]'
                : 'border-transparent text-[#6E6A63] hover:text-[#1C1917]'
            }`}
          >
            My Appointments ({filteredAppointments.length})
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="p-6 sm:p-8 min-h-96">
        {/* SUBTAB 1: SKIN CARE CARE PLAN */}
        {activeSubTab === 'routine' && (
          <div className="space-y-6 animate-fade-in text-xs leading-relaxed">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-[#C5A880]" />
                <h4 className="text-base font-serif font-bold text-[#1C1917]">Doctor Malik's Botanical Skin Blueprint</h4>
              </div>
              <p className="text-[#6E6A63]">
                A highly targeted dermatologist routine carefully optimized for barrier strength, scar renewal, and active comedone reduction.
              </p>
            </div>

            {/* Split layout: recommended routine checklist & diagnosis guidelines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Checklist Compliance */}
              <div className="lg:col-span-2 space-y-4">
                <h5 className="font-serif font-bold text-sm text-[#1C1917] border-b border-[#E5DFD5] pb-2">
                  Today's Application Checklist
                </h5>

                {/* Morning Checklist */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD5] space-y-4 shadow-xs">
                  <div className="flex justify-between items-center bg-[#EAE4DC]/50 px-3.5 py-2 rounded-xl">
                    <span className="font-bold text-[#1A3121] uppercase tracking-wider text-[10px]">Morning (AM) Regimen</span>
                    <span className="text-[10px] text-[#6E6A63]">Apply products in this exact order</span>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-am-cleanse"
                        type="checkbox" 
                        checked={routineStatus['am-cleanse']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-cleanse': !p['am-cleanse'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917]">Step 1: Hydrating Cleanser</span>
                        <p className="text-xs text-[#6E6A63]">Wash face with cool water for 30 seconds. Gently pat dry.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-am-vitc"
                        type="checkbox" 
                        checked={routineStatus['am-vitc']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-vitc': !p['am-vitc'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917]">Step 2: Vitamin C 10% Serum</span>
                        <p className="text-xs text-[#6E6A63]">Apply 3 drops on face. Fades dark spots and boosts sun protection.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-am-moisturize"
                        type="checkbox" 
                        checked={routineStatus['am-moisturize']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-moisturize': !p['am-moisturize'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917]">Step 3: Hyaluronic Gel Moisturizer</span>
                        <p className="text-xs text-[#6E6A63]">Locks in hydration without clogging oil glands.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-am-spf"
                        type="checkbox" 
                        checked={routineStatus['am-spf']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-spf': !p['am-spf'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                          Step 4: Sunscreen SPF 50+ (Critical)
                          <span className="bg-[#1A3121] text-[#C5A880] text-[9px] px-1.5 py-0.2 rounded font-bold">MANDATORY</span>
                        </span>
                        <p className="text-xs text-[#6E6A63]">Two fingers full. Reapply every 3 hours if outdoors.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Evening Checklist */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DFD5] space-y-4 shadow-xs">
                  <div className="flex justify-between items-center bg-[#EAE4DC]/50 px-3.5 py-2 rounded-xl">
                    <span className="font-bold text-[#1C1917] uppercase tracking-wider text-[10px]">Evening (PM) Regimen</span>
                    <span className="text-[10px] text-[#6E6A63]">PM recovery & retinoid application</span>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-pm-cleanse"
                        type="checkbox" 
                        checked={routineStatus['pm-cleanse']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-cleanse': !p['pm-cleanse'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917]">Step 1: Double-Cleanse</span>
                        <p className="text-xs text-[#6E6A63]">Wash twice to fully remove dust, sebum, and sunscreen traces.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-pm-tret"
                        type="checkbox" 
                        checked={routineStatus['pm-tret']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-tret': !p['pm-tret'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917] flex items-center gap-1.5">
                          Step 2: Tretinoin 0.025% Cream
                          <span className="bg-[#C5A880]/20 text-[#1A3121] border border-[#C5A880]/40 text-[9px] px-1.5 py-0.2 rounded font-bold">ACNE REGULATOR</span>
                        </span>
                        <p className="text-xs text-[#6E6A63]">Apply a tiny pea-sized dot on dry skin. Avoid corners of nose and eyes.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-2 hover:bg-[#FBF9F5] rounded-xl cursor-pointer transition-colors">
                      <input 
                        id="check-pm-balm"
                        type="checkbox" 
                        checked={routineStatus['pm-balm']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-balm': !p['pm-balm'] }))}
                        className="mt-1 text-[#1A3121] focus:ring-[#1A3121] rounded" 
                      />
                      <div>
                        <span className="font-bold text-[#1C1917]">Step 3: Soothing Barrier Recovery Balm</span>
                        <p className="text-xs text-[#6E6A63]">Rich ceramide balm to offset dryness or peeling triggered by Tretinoin.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sidebar: clinical instructions */}
              <div className="space-y-4">
                <div className="bg-[#1A3121] text-white p-6 rounded-2xl border border-[#C5A880]/30 shadow-xs">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#C5A880] mb-3 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-[#C5A880]" /> Botanical Care Instructions
                  </h5>
                  <ul className="space-y-3 text-xs text-[#EAE4DC]">
                    <li>
                      <span className="font-bold text-white block mb-0.5">Retinoid adaptation period:</span>
                      Slight peeling, dryness, and minor purging are completely normal during the first 2-4 weeks. Do not pick skin!
                    </li>
                    <li>
                      <span className="font-bold text-white block mb-0.5">Avoid active scrubs:</span>
                      Do not use coarse physical scrubs, loofahs, or glycolic toner while undergoing chemical peels or laser treatments.
                    </li>
                    <li>
                      <span className="font-bold text-white block mb-0.5">Moisture Sandwich rule:</span>
                      If dry, apply moisturizer FIRST, wait 10 minutes, apply Tretinoin, and follow with another layer of moisturizer.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: PRESCRIPTIONS */}
        {activeSubTab === 'rx' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div>
              <h4 className="text-base font-serif font-bold text-[#1C1917] mb-1">Dermatological Rx Ledger</h4>
              <p className="text-[#6E6A63]">Secure record of medications, gels, and barrier-support prescriptions issued by Dr. Malik.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E5DFD5]">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-[#EAE4DC]/50 border-b border-[#E5DFD5] text-[10px] uppercase font-bold text-[#6E6A63]">
                    <th className="p-4 font-bold">Date Issued</th>
                    <th className="p-4 font-bold">Medicine / Formulation</th>
                    <th className="p-4 font-bold">Dosage</th>
                    <th className="p-4 font-bold">Usage & Frequency</th>
                    <th className="p-4 font-bold">Period</th>
                    <th className="p-4 font-bold">Dermatologist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DFD5] text-[#1C1917]">
                  {profile.prescriptions.map((rx) => (
                    <tr key={rx.id} className="hover:bg-[#FBF9F5] transition-colors">
                      <td className="p-4 text-xs font-bold text-[#6E6A63]">{rx.date}</td>
                      <td className="p-4">
                        <span className="font-bold text-[#1C1917] block">{rx.medicineName}</span>
                        <span className="text-[10px] text-[#6E6A63]">{rx.id}</span>
                      </td>
                      <td className="p-4">{rx.dosage}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-lg bg-[#FBF9F5] border border-[#E5DFD5] font-bold inline-block text-xs">
                          {rx.frequency}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-[#1A3121]">{rx.duration}</td>
                      <td className="p-4 text-[#6E6A63]">{rx.doctorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-[#E5DFD5] p-4 rounded-2xl flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1C1917] block mb-0.5">Need Refills?</span>
                <span className="text-xs text-[#6E6A63] leading-relaxed block">
                  Prescriptions are valid for refill at our LUMÉA sanctuary pharmacy block. For refills extending past 3 months, a complimentary skin follow-up scan is required.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: SKIN PROGRESS PHOTO LOG */}
        {activeSubTab === 'tracker' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-serif font-bold text-[#1C1917] mb-1">Visual Skin Progress Ledger</h4>
                <p className="text-[#6E6A63]">Log private high-definition photos to chart your skin texture renewal over time.</p>
              </div>
            </div>

            {trackerMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{trackerMessage}</span>
              </div>
            )}

            {/* Split page: New photo entry log & Grid of historical logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Entry Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#E5DFD5] h-fit space-y-4 shadow-xs">
                <h5 className="font-serif font-bold text-sm text-[#1C1917] border-b border-[#E5DFD5] pb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#C5A880]" />
                  Log Skin Update
                </h5>
                
                <form onSubmit={handleAddPhotoLog} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider">Select Tag</label>
                    <select
                      id="tracker-select-tag"
                      value={newLogTag}
                      onChange={(e) => setNewLogTag(e.target.value as any)}
                      className="w-full rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden text-xs bg-white focus:border-[#1A3121]"
                    >
                      <option value="Progress">Progress Update</option>
                      <option value="Concern">Skin Concern Flareup</option>
                      <option value="Initial">Baseline / Initial Photo</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider">Dermatological Notes & Symptoms</label>
                    <textarea
                      id="tracker-input-notes"
                      rows={3}
                      required
                      value={newLogNotes}
                      onChange={(e) => setNewLogNotes(e.target.value)}
                      placeholder="e.g. Purging has slowed. Skin barrier feels moisturized. Forehead active acne has fully cleared up!"
                      className="w-full text-xs rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden focus:border-[#1A3121]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#6E6A63] uppercase tracking-wider">Photo URL (Optional)</label>
                    <input
                      id="tracker-input-image"
                      type="url"
                      value={newLogImage}
                      onChange={(e) => setNewLogImage(e.target.value)}
                      placeholder="Leave blank to simulate clean capture!"
                      className="w-full text-xs rounded-xl border border-[#E5DFD5] p-3 focus:outline-hidden focus:border-[#1A3121]"
                    />
                  </div>

                  <button
                    id="btn-tracker-submit"
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#1A3121] hover:bg-[#26452F] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md border border-[#C5A880]/30 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#C5A880]" /> Save Photo Entry
                  </button>
                </form>
              </div>

              {/* Grid of history cards */}
              <div className="lg:col-span-2 space-y-4">
                <h5 className="font-serif font-bold text-sm text-[#1C1917] border-b border-[#E5DFD5] pb-2">
                  My Captured Skin Logs ({profile.photoLogs.length})
                </h5>

                {profile.photoLogs.length === 0 ? (
                  <div className="p-8 text-center bg-[#FBF9F5] border border-dashed border-[#E5DFD5] rounded-2xl">
                    <Camera className="w-10 h-10 text-[#C5A880] mx-auto mb-2" />
                    <p className="text-[#6E6A63] font-medium">No skin photo logs recorded yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.photoLogs.map((log) => (
                      <div 
                        id={`tracker-log-${log.id}`}
                        key={log.id} 
                        className="bg-white rounded-2xl border border-[#E5DFD5] overflow-hidden shadow-xs flex flex-col"
                      >
                        <div className="relative h-44 bg-[#EAE4DC]/50">
                          <img
                            src={log.imageUrl}
                            alt="Progress Shot"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            log.tag === 'Initial' ? 'bg-[#1C1917] text-white' :
                            log.tag === 'Concern' ? 'bg-amber-700 text-white' : 'bg-[#1A3121] text-[#C5A880]'
                          }`}>
                            {log.tag}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#6E6A63] block mb-1">{log.date}</span>
                            <p className="text-[#1C1917] leading-relaxed text-xs">"{log.notes}"</p>
                          </div>
                          <div className="flex justify-end pt-3 border-t border-[#E5DFD5] mt-3">
                            <button
                              id={`btn-tracker-delete-${log.id}`}
                              onClick={() => handleDeletePhotoLog(log.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: APPOINTMENTS & HISTORY */}
        {activeSubTab === 'appointments' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div>
              <h4 className="text-base font-serif font-bold text-[#1C1917] mb-1">My Appointments & Clinical Visits</h4>
              <p className="text-[#6E6A63]">Track and manage upcoming treatments and clinical consultations scheduled at our sanctuary.</p>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center bg-[#FBF9F5] border border-dashed border-[#E5DFD5] rounded-2xl">
                <Calendar className="w-12 h-12 text-[#C5A880] mx-auto mb-3" />
                <h5 className="font-serif font-bold text-[#1C1917] text-base">No Active Appointments Found</h5>
                <p className="text-[#6E6A63] max-w-sm mx-auto mt-1 leading-relaxed">
                  You do not have any scheduled in-clinic procedures under this email address. Schedule a session today!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((app) => {
                  const treatmentObj = TREATMENTS.find(t => t.id === app.treatmentId);
                  return (
                    <div 
                      id={`portal-app-${app.id}`}
                      key={app.id} 
                      className="bg-white p-5 rounded-2xl border border-[#E5DFD5] hover:border-[#1A3121] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#1A3121] text-[#C5A880] flex items-center justify-center shrink-0">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-serif font-bold text-[#1C1917] text-base">{treatmentObj?.name || "Clinical Consultation"}</span>
                            <span className="text-[10px] bg-[#EAE4DC] text-[#1C1917] px-2 py-0.5 rounded-md font-bold uppercase">{app.id}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#6E6A63] mt-1">
                            <span>Date: <strong className="text-[#1C1917]">{new Date(app.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
                            <span>Time: <strong className="text-[#1C1917]">{app.time}</strong></span>
                            <span>Cost: <strong className="text-[#1A3121]">{treatmentObj?.price}</strong></span>
                          </div>
                          {app.notes && (
                            <p className="text-xs text-[#6E6A63] italic mt-2 bg-[#FBF9F5] p-2.5 rounded-xl border border-[#E5DFD5]">
                              Notes: "{app.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end border-t border-[#E5DFD5] sm:border-t-0 pt-3 sm:pt-0">
                        <span className="bg-[#1A3121] text-[#C5A880] font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-[#C5A880]/30">
                          CONFIRMED
                        </span>
                        <button
                          id={`btn-cancel-app-${app.id}`}
                          onClick={() => handleCancelAppointment(app.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

