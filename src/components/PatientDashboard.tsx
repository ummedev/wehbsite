import React, { useState, useEffect } from 'react';
import { Appointment, PatientProfile, PhotoLogEntry, Prescription } from '../types';
import { TREATMENTS } from '../data';
import { 
  User, Lock, LogIn, Calendar, ClipboardList, Shield, Camera, Plus, 
  Trash2, CheckCircle2, Pill, Activity, UserCheck, AlertCircle, Sparkles 
} from 'lucide-react';

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

  // Login Form States
  const [email, setEmail] = useState("patient@example.com");
  const [password, setPassword] = useState("password");
  const [loginError, setLoginError] = useState("");
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

  useEffect(() => {
    onLoginStateChange(profile);
  }, [profile, onLoginStateChange]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "patient@example.com" && password === "password") {
      // Load or initialize patient profile in localstorage
      const savedProfile = localStorage.getItem('docplus_patient_profile');
      let loadedProfile: PatientProfile = savedProfile ? JSON.parse(savedProfile) : PRESEEDED_PROFILE;
      
      setProfile(loadedProfile);
      localStorage.setItem('docplus_current_patient', JSON.stringify(loadedProfile));
      localStorage.setItem('docplus_patient_profile', JSON.stringify(loadedProfile));
      setLoginError("");
    } else {
      setLoginError("Invalid email address or passcode. (Use default test credentials below!)");
    }
  };

  const handleLogout = () => {
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

    // Default to a realistic procedural/skin photo seed or allow them to paste a URL
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
    
    // Reset Form
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

  // Filter appointments specifically scheduled for this logged-in patient
  const filteredAppointments = appointments.filter(
    app => app.patientEmail.toLowerCase() === profile?.email.toLowerCase()
  );

  // If NOT Logged In, Render beautiful aesthetic Login Gate
  if (!profile) {
    return (
      <div 
        id="portal-login-gate"
        className="max-w-md mx-auto bg-white rounded-2xl border border-[#F6D6D8]/30 shadow-md overflow-hidden animate-fade-in"
      >
        <div className="bg-[#FAF8F8] border-b border-[#F6D6D8]/20 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F6D6D8]/40 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-[#2E2E2E]" />
          </div>
          <h3 className="text-xl font-display font-semibold text-[#2E2E2E]">Doc+ Patient Portal</h3>
          <p className="text-xs text-[#2E2E2E]/60 mt-1">Access your medical history, prescriptions & track skin progress</p>
        </div>

        <div className="p-6 sm:p-8">
          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#2E2E2E]">Registered Email Address</label>
              <input
                id="login-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#2E2E2E]">Secure Patient Passcode</label>
                <a href="#" className="text-[10px] text-[#A8C3A0] hover:underline font-medium">Forgot Passcode?</a>
              </div>
              <input
                id="login-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0]"
              />
            </div>

            <button
              id="btn-login-submit"
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#F6D6D8] font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Secure Portal Access
            </button>
          </form>

          {/* Quick Demo Credentials Panel for grading and preview */}
          <div className="mt-6 pt-5 border-t border-[#F6D6D8]/20 bg-[#FAF8F8]/60 p-4 rounded-lg">
            <h4 className="text-[10px] font-mono font-bold text-[#A8C3A0] uppercase tracking-wider mb-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Direct Testing Credentials
            </h4>
            <p className="text-[11px] text-[#2E2E2E]/80 mb-2">
              Use these pre-seeded demo coordinates to access the portal dashboard:
            </p>
            <div className="space-y-1 font-mono text-[10px] bg-white border border-[#F6D6D8]/20 p-2.5 rounded text-[#2E2E2E]/70">
              <div className="flex justify-between">
                <span>Test Email:</span>
                <span className="font-bold text-[#2E2E2E]">patient@example.com</span>
              </div>
              <div className="flex justify-between">
                <span>Passcode:</span>
                <span className="font-bold text-[#2E2E2E]">password</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F6D6D8]/30 overflow-hidden shadow-md max-w-5xl mx-auto animate-fade-in">
      {/* Dashboard Top header banner */}
      <div className="bg-[#FAF8F8] border-b border-[#F6D6D8]/20 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#F6D6D8] flex items-center justify-center text-[#2E2E2E] font-bold text-lg border border-[#F6D6D8]/40 shadow-xs">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-display font-semibold text-[#2E2E2E]">{profile.name}</h3>
              <span className="bg-[#A8C3A0]/10 border border-[#A8C3A0]/30 text-[#2E2E2E]/80 text-[9px] font-mono px-2 py-0.5 rounded-full font-bold">
                PRIME MEMBER
              </span>
            </div>
            <p className="text-xs text-[#2E2E2E]/60 mt-0.5">
              ID: <span className="font-mono">{profile.id}</span> • Member Since: {profile.memberSince}
            </p>
          </div>
        </div>
        
        <button
          id="btn-portal-logout"
          onClick={handleLogout}
          className="text-xs font-semibold px-4 py-2 border border-red-200 text-red-500 rounded-xl hover:bg-red-50 transition-colors shrink-0"
        >
          Secure Logout
        </button>
      </div>

      {/* Grid containing Skin Condition Alert / Diagnosis Summary */}
      <div className="px-6 py-4 bg-[#FAF8F8]/40 border-b border-[#F6D6D8]/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3 bg-white rounded-lg border border-[#F6D6D8]/10 flex items-start gap-2.5">
          <Activity className="w-4 h-4 text-[#A8C3A0] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wide">Active Diagnoses</span>
            <span className="block font-medium text-[#2E2E2E] mt-0.5">{profile.medicalHistory.join(', ')}</span>
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-[#F6D6D8]/10 flex items-start gap-2.5">
          <Pill className="w-4 h-4 text-[#A8C3A0] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wide">Prescriptions Active</span>
            <span className="block font-medium text-[#2E2E2E] mt-0.5">{profile.prescriptions.length} Dermatological Items</span>
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-[#F6D6D8]/10 flex items-start gap-2.5">
          <Calendar className="w-4 h-4 text-[#A8C3A0] shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wide">Sessions Scheduled</span>
            <span className="block font-medium text-[#2E2E2E] mt-0.5">{filteredAppointments.length} Appointments Booked</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#F6D6D8]/10 bg-white">
        <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
          <button
            id="subtab-btn-routine"
            onClick={() => setActiveSubTab('routine')}
            className={`py-4 px-4 font-display text-xs font-semibold tracking-wider uppercase border-b-2 transition-all shrink-0 ${
              activeSubTab === 'routine'
                ? 'border-[#A8C3A0] text-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-[#2E2E2E]'
            }`}
          >
            Skin Care Care Plan
          </button>
          <button
            id="subtab-btn-rx"
            onClick={() => setActiveSubTab('rx')}
            className={`py-4 px-4 font-display text-xs font-semibold tracking-wider uppercase border-b-2 transition-all shrink-0 ${
              activeSubTab === 'rx'
                ? 'border-[#A8C3A0] text-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-[#2E2E2E]'
            }`}
          >
            Prescriptions ({profile.prescriptions.length})
          </button>
          <button
            id="subtab-btn-tracker"
            onClick={() => setActiveSubTab('tracker')}
            className={`py-4 px-4 font-display text-xs font-semibold tracking-wider uppercase border-b-2 transition-all shrink-0 ${
              activeSubTab === 'tracker'
                ? 'border-[#A8C3A0] text-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-[#2E2E2E]'
            }`}
          >
            Skin Progress Tracker
          </button>
          <button
            id="subtab-btn-appointments"
            onClick={() => setActiveSubTab('appointments')}
            className={`py-4 px-4 font-display text-xs font-semibold tracking-wider uppercase border-b-2 transition-all shrink-0 ${
              activeSubTab === 'appointments'
                ? 'border-[#A8C3A0] text-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-[#2E2E2E]'
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
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-[#A8C3A0]" />
                <h4 className="text-sm font-semibold text-[#2E2E2E]">Doctor Malik's Skin Care Blueprint</h4>
              </div>
              <p className="text-gray-500">
                A highly targeted dermatologist routine carefully optimized for barrier strength, scar renewal, and active comedone reduction.
              </p>
            </div>

            {/* Split layout: recommended routine checklist & diagnosis guidelines */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Checklist Compliance */}
              <div className="lg:col-span-2 space-y-4">
                <h5 className="font-semibold text-sm text-[#2E2E2E] border-b border-[#F6D6D8]/20 pb-1.5">
                  Today's Application Checklist
                </h5>

                {/* Morning Checklist */}
                <div className="bg-white p-4 rounded-xl border border-[#F6D6D8]/20 space-y-3">
                  <div className="flex justify-between items-center bg-[#FAF8F8] px-3 py-1.5 rounded-md">
                    <span className="font-mono font-bold text-[#A8C3A0] uppercase tracking-wider text-[10px]">Morning (AM) Regimen</span>
                    <span className="text-[10px] text-gray-400">Apply products in this exact order</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-am-cleanse"
                        type="checkbox" 
                        checked={routineStatus['am-cleanse']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-cleanse': !p['am-cleanse'] }))}
                        className="mt-0.5 text-[#A8C3A0] focus:ring-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Step 1: Hydrating Cleanser</span>
                        <p className="text-[11px] text-gray-400">Wash face with cool water for 30 seconds. Gently pat dry.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-am-vitc"
                        type="checkbox" 
                        checked={routineStatus['am-vitc']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-vitc': !p['am-vitc'] }))}
                        className="mt-0.5 text-[#A8C3A0] focus:ring-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Step 2: Vitamin C 10% Serum</span>
                        <p className="text-[11px] text-gray-400">Apply 3 drops on face. Fades dark spots and boosts sun protection.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-am-moisturize"
                        type="checkbox" 
                        checked={routineStatus['am-moisturize']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-moisturize': !p['am-moisturize'] }))}
                        className="mt-0.5 text-[#A8C3A0] focus:ring-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Step 3: Hyaluronic acid gel moisturizer</span>
                        <p className="text-[11px] text-gray-400">Locks in hydration without clogging oil glands.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-am-spf"
                        type="checkbox" 
                        checked={routineStatus['am-spf']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'am-spf': !p['am-spf'] }))}
                        className="mt-0.5 text-[#A8C3A0] focus:ring-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E] flex items-center gap-1.5">
                          Step 4: Sunscreen SPF 50+ (Critical)
                          <span className="bg-orange-50 text-orange-600 border border-orange-200 text-[8px] px-1.5 py-0.2 rounded">MANDATORY</span>
                        </span>
                        <p className="text-[11px] text-gray-400">Two fingers full. Reapply every 3 hours if outdoors in Faisalabad heat.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Evening Checklist */}
                <div className="bg-white p-4 rounded-xl border border-[#F6D6D8]/20 space-y-3">
                  <div className="flex justify-between items-center bg-[#FAF8F8] px-3 py-1.5 rounded-md">
                    <span className="font-mono font-bold text-slate-700 uppercase tracking-wider text-[10px]">Evening (PM) Regimen</span>
                    <span className="text-[10px] text-gray-400">PM recovery & retinoid application</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-pm-cleanse"
                        type="checkbox" 
                        checked={routineStatus['pm-cleanse']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-cleanse': !p['pm-cleanse'] }))}
                        className="mt-0.5 text-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Step 1: Double-Cleanse</span>
                        <p className="text-[11px] text-gray-400">Wash twice to fully remove dust, sebum, and sunscreen traces.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-pm-tret"
                        type="checkbox" 
                        checked={routineStatus['pm-tret']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-tret': !p['pm-tret'] }))}
                        className="mt-0.5 text-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E] flex items-center gap-1.5">
                          Step 2: Tretinoin 0.025% Cream
                          <span className="bg-blue-50 text-blue-600 border border-blue-200 text-[8px] px-1.5 py-0.2 rounded">ACNE REGULATOR</span>
                        </span>
                        <p className="text-[11px] text-gray-400">Apply a tiny pea-sized dot on dry skin. Avoid corners of nose and eyes.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                      <input 
                        id="check-pm-balm"
                        type="checkbox" 
                        checked={routineStatus['pm-balm']}
                        onChange={() => setRoutineStatus(p => ({ ...p, 'pm-balm': !p['pm-balm'] }))}
                        className="mt-0.5 text-[#A8C3A0]" 
                      />
                      <div>
                        <span className="font-medium text-[#2E2E2E]">Step 3: Soothing Barrier Recovery Balm</span>
                        <p className="text-[11px] text-gray-400">Rich ceramide balm to offset dryness or peeling triggered by Tretinoin.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sidebar: clinical instructions */}
              <div className="space-y-4">
                <div className="bg-[#F6D6D8]/20 p-5 rounded-xl border border-[#F6D6D8]/40">
                  <h5 className="font-semibold text-xs font-mono uppercase tracking-wider text-[#2E2E2E] mb-2 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-[#A8C3A0]" /> Care Instructions
                  </h5>
                  <ul className="space-y-3.5 text-xs text-[#2E2E2E]/80">
                    <li>
                      <span className="font-semibold block mb-0.5">Retinoid adaptation period:</span>
                      Slight peeling, dryness, and minor purging are completely normal during the first 2-4 weeks. Do not pick skin!
                    </li>
                    <li>
                      <span className="font-semibold block mb-0.5">Avoid active scrubs:</span>
                      Do not use coarse physical scrubs, loofahs, or glycolic toner while undergoing chemical peels or laser treatments.
                    </li>
                    <li>
                      <span className="font-semibold block mb-0.5">Moisture Sandwich rule:</span>
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
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-1">Dermatological Rx Ledger</h4>
              <p className="text-gray-500">Secure record of medications, gels, and barrier-support prescriptions issued by Dr. Malik.</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#F6D6D8]/20">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-[#FAF8F8] border-b border-[#F6D6D8]/20 font-mono text-[10px] uppercase text-[#2E2E2E]/60">
                    <th className="p-4 font-semibold">Date Issued</th>
                    <th className="p-4 font-semibold">Medicine / Formulation</th>
                    <th className="p-4 font-semibold">Dosage</th>
                    <th className="p-4 font-semibold">Usage & Frequency</th>
                    <th className="p-4 font-semibold">Period</th>
                    <th className="p-4 font-semibold">Dermatologist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6D6D8]/10 text-[#2E2E2E]/80">
                  {profile.prescriptions.map((rx) => (
                    <tr key={rx.id} className="hover:bg-[#FAF8F8]/40 transition-colors">
                      <td className="p-4 font-mono text-[11px] font-semibold text-gray-500">{rx.date}</td>
                      <td className="p-4">
                        <span className="font-semibold text-[#2E2E2E] block">{rx.medicineName}</span>
                        <span className="text-[10px] font-mono text-gray-400">{rx.id}</span>
                      </td>
                      <td className="p-4">{rx.dosage}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-[#FAF8F8] border border-[#F6D6D8]/10 font-medium inline-block text-[11px]">
                          {rx.frequency}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-[#A8C3A0]">{rx.duration}</td>
                      <td className="p-4 text-gray-500">{rx.doctorName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FAF8F8] border border-[#F6D6D8]/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#A8C3A0] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800 block mb-0.5">Need Refills?</span>
                <span className="text-[11px] text-gray-500 leading-relaxed block">
                  Prescriptions are valid for refill at our Doc+ pharmacy building block. For refills extending past 3 months, a complimentary skin follow-up scan is required.
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
                <h4 className="text-sm font-semibold text-[#2E2E2E] mb-1">Visual Skin Progress Ledger</h4>
                <p className="text-gray-500">Log private high-definition selfies to chart your skin texture renewal over time.</p>
              </div>
            </div>

            {trackerMessage && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-[#2E2E2E] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A8C3A0]" />
                <span>{trackerMessage}</span>
              </div>
            )}

            {/* Split page: New photo entry log & Grid of historical logs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Entry Card */}
              <div className="bg-white p-5 rounded-xl border border-[#F6D6D8]/20 h-fit space-y-4 shadow-xs">
                <h5 className="font-semibold text-sm text-[#2E2E2E] border-b border-[#F6D6D8]/20 pb-2 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#A8C3A0]" />
                  Log Skin Update
                </h5>
                
                <form onSubmit={handleAddPhotoLog} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase font-mono">Select Tag</label>
                    <select
                      id="tracker-select-tag"
                      value={newLogTag}
                      onChange={(e) => setNewLogTag(e.target.value as any)}
                      className="w-full rounded-lg border border-[#F6D6D8]/30 p-2 focus:outline-hidden text-xs bg-white"
                    >
                      <option value="Progress">Progress Update</option>
                      <option value="Concern">Skin Concern Flareup</option>
                      <option value="Initial">Baseline / Initial Photo</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase font-mono">Dermatological Notes & Symptoms</label>
                    <textarea
                      id="tracker-input-notes"
                      rows={3}
                      required
                      value={newLogNotes}
                      onChange={(e) => setNewLogNotes(e.target.value)}
                      placeholder="e.g. Purging has slowed. Skin barrier feels moisturized. Forehead active acne has fully cleared up!"
                      className="w-full text-xs rounded-lg border border-[#F6D6D8]/30 p-2.5 focus:outline-hidden focus:border-[#A8C3A0]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase font-mono">Photo URL (Optional)</label>
                    <input
                      id="tracker-input-image"
                      type="url"
                      value={newLogImage}
                      onChange={(e) => setNewLogImage(e.target.value)}
                      placeholder="Leave blank to simulate clean capture!"
                      className="w-full text-xs rounded-lg border border-[#F6D6D8]/30 p-2 focus:outline-hidden"
                    />
                  </div>

                  <button
                    id="btn-tracker-submit"
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#A8C3A0] hover:bg-[#96b18f] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Save Photo Entry
                  </button>
                </form>
              </div>

              {/* Grid of history cards */}
              <div className="lg:col-span-2 space-y-4">
                <h5 className="font-semibold text-sm text-[#2E2E2E] border-b border-[#F6D6D8]/20 pb-2">
                  My Captured Skin Logs ({profile.photoLogs.length})
                </h5>

                {profile.photoLogs.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAF8F8] border border-dashed border-[#F6D6D8]/40 rounded-xl">
                    <Camera className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400 font-medium">No skin photo logs recorded yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {profile.photoLogs.map((log) => (
                      <div 
                        id={`tracker-log-${log.id}`}
                        key={log.id} 
                        className="bg-white rounded-xl border border-[#F6D6D8]/20 overflow-hidden shadow-xs flex flex-col"
                      >
                        <div className="relative h-44 bg-slate-100">
                          <img
                            src={log.imageUrl}
                            alt="Progress Shot"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className={`absolute top-3 left-3 text-[9px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            log.tag === 'Initial' ? 'bg-[#2E2E2E] text-[#F6D6D8]' :
                            log.tag === 'Concern' ? 'bg-red-500 text-white' : 'bg-[#A8C3A0] text-white'
                          }`}>
                            {log.tag}
                          </span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 font-mono font-medium block mb-1">{log.date}</span>
                            <p className="text-[#2E2E2E]/80 leading-relaxed text-[11px]">"{log.notes}"</p>
                          </div>
                          <div className="flex justify-end pt-3 border-t border-[#F6D6D8]/10 mt-3">
                            <button
                              id={`btn-tracker-delete-${log.id}`}
                              onClick={() => handleDeletePhotoLog(log.id)}
                              className="text-red-400 hover:text-red-600 transition-colors p-1"
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
              <h4 className="text-sm font-semibold text-[#2E2E2E] mb-1">My Appointments & Clinical Visits</h4>
              <p className="text-gray-500">Track and manage upcoming treatments and clinical consultations scheduled at our Pakistan facility.</p>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center bg-[#FAF8F8] border border-dashed border-[#F6D6D8]/30 rounded-xl">
                <Calendar className="w-12 h-12 text-[#F6D6D8] mx-auto mb-3" />
                <h5 className="font-semibold text-[#2E2E2E] text-sm">No Active Appointments Found</h5>
                <p className="text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                  You do not have any scheduled in-clinic procedures under this email coordinates. Schedule a session today!
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
                      className="bg-white p-5 rounded-xl border border-[#F6D6D8]/30 hover:border-[#A8C3A0] shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[#FAF8F8] border border-[#F6D6D8]/30 flex items-center justify-center shrink-0">
                          <Activity className="w-5 h-5 text-[#A8C3A0]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#2E2E2E] text-sm">{treatmentObj?.name || "Clinical Consultation"}</span>
                            <span className="font-mono text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.2 rounded font-bold uppercase">{app.id}</span>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] text-[#2E2E2E]/60 mt-1">
                            <span>Date: <strong>{new Date(app.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong></span>
                            <span>Time: <strong>{app.time}</strong></span>
                            <span>Cost: <strong>{treatmentObj?.price}</strong></span>
                          </div>
                          {app.notes && (
                            <p className="text-[11px] text-gray-400 italic mt-2 bg-[#FAF8F8]/60 p-2 rounded border border-gray-100">
                              Concern: "{app.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3.5 w-full sm:w-auto justify-end border-t border-[#F6D6D8]/10 sm:border-t-0 pt-3 sm:pt-0">
                        <span className="bg-[#A8C3A0]/25 text-[#2E2E2E] font-semibold font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#A8C3A0]/30">
                          CONFIRMED
                        </span>
                        <button
                          id={`btn-cancel-app-${app.id}`}
                          onClick={() => handleCancelAppointment(app.id)}
                          className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Cancel Reservation"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
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
