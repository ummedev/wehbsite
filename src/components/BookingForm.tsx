import React, { useState, useEffect } from 'react';
import { TREATMENTS, CLINIC_INFO } from '../data';
import { Appointment } from '../types';
import { Clock, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Database } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface BookingFormProps {
  preselectedTreatmentId?: string;
  onBookingComplete: (newAppointment: Appointment) => void;
  patientProfile?: { name: string; email: string; phone: string } | null;
}

const TIME_SLOTS = [
  "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", 
  "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
];

export default function BookingForm({ preselectedTreatmentId, onBookingComplete, patientProfile }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [treatmentId, setTreatmentId] = useState(preselectedTreatmentId || TREATMENTS[0].id);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [doctorName, setDoctorName] = useState(CLINIC_INFO.doctors[0].name);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successBooking, setSuccessBooking] = useState<Appointment | null>(null);

  // Auto-populate patient details if logged in
  useEffect(() => {
    if (patientProfile) {
      setPatientName(patientProfile.name);
      setPatientEmail(patientProfile.email);
      setPatientPhone(patientProfile.phone);
    }
  }, [patientProfile]);

  useEffect(() => {
    if (preselectedTreatmentId) {
      setTreatmentId(preselectedTreatmentId);
    }
  }, [preselectedTreatmentId]);

  // Calendar Helpers
  const getNextTwoWeeks = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      // Skip Sundays (Closed)
      if (nextDate.getDay() !== 0) {
        dates.push(nextDate);
      }
    }
    return dates;
  };

  const formatDateValue = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const activeTreatment = TREATMENTS.find(t => t.id === treatmentId);

  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!treatmentId) newErrors.treatment = "Please select a treatment";
    } else if (step === 2) {
      if (!selectedDate) newErrors.date = "Please select an appointment date";
      if (!selectedTime) newErrors.time = "Please choose a preferred time slot";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) newErrors.name = "Full Name is required";
    if (!patientEmail.trim() || !/\S+@\S+\.\S+/.test(patientEmail)) newErrors.email = "Please enter a valid email address";
    if (!patientPhone.trim() || patientPhone.length < 9) newErrors.phone = "Please enter a valid phone number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAppointment: Appointment = {
      id: `LUM-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName,
      patientEmail,
      patientPhone,
      treatmentId,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      notes,
      doctorName,
      createdAt: new Date().toISOString()
    };

    // Save appointment list to localStorage for offline fallback
    const saved = localStorage.getItem('docplus_appointments');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(newAppointment);
    localStorage.setItem('docplus_appointments', JSON.stringify(list));

    // Save directly to Supabase Database if configured
    if (isSupabaseConfigured()) {
      try {
        const { error: sbError } = await supabase
          .from('appointments')
          .insert([
            {
              patient_name: patientName,
              patient_email: patientEmail,
              patient_phone: patientPhone,
              treatment_id: treatmentId,
              treatment_name: activeTreatment?.name || 'General Consultation',
              date: selectedDate,
              time: selectedTime,
              notes: notes || '',
              status: 'confirmed',
            },
          ]);
        if (sbError) {
          console.warn('Supabase DB save note (tables auto-created when script is executed):', sbError.message);
        }
      } catch (sbErr) {
        console.warn('Supabase DB save error:', sbErr);
      }
    }

    // Save directly to Cloud SQL Database via API endpoint
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          phone: patientPhone,
          treatmentId,
          treatmentName: activeTreatment?.name || 'General Consultation',
          date: selectedDate,
          time: selectedTime,
          notes,
        }),
      });
    } catch (err) {
      console.warn('Backend Cloud SQL save notice:', err);
    }

    // Success state
    setSuccessBooking(newAppointment);
    onBookingComplete(newAppointment);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    if (!patientProfile) {
      setPatientName("");
      setPatientEmail("");
      setPatientPhone("");
      setNotes("");
    }
    setSuccessBooking(null);
  };

  if (successBooking && activeTreatment) {
    return (
      <div 
        id="booking-success-card"
        className="bg-white rounded-[24px] border border-[#E5E7EB] p-8 text-center max-w-2xl mx-auto shadow-xl animate-fade-in space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#F0F6FF] flex items-center justify-center mx-auto text-[#2D6CDF]">
          <CheckCircle2 className="w-10 h-10 text-[#2D6CDF]" />
        </div>
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#F0F6FF] text-[#2D6CDF] uppercase tracking-wider mb-2">
            Appointment Confirmed
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#1F2937]">
            Your Booking is Successful!
          </h3>
          <p className="text-sm text-[#6B7280] mt-1">
            Thank you for choosing Doc+ Dermatology. A confirmation summary has been dispatched.
          </p>
        </div>

        {/* Appointment Details summary board */}
        <div className="bg-[#FAFBFC] rounded-2xl border border-[#E5E7EB] p-6 text-left space-y-3">
          <div className="flex justify-between items-center text-xs border-b border-[#E5E7EB] pb-2">
            <span className="text-[#6B7280]">Reference Code:</span>
            <span className="font-bold text-[#1F2937]">{successBooking.id}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#6B7280]">Patient Name:</span>
            <span className="font-bold text-[#1F2937]">{successBooking.patientName}</span>
          </div>
          {successBooking.doctorName && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B7280]">Assigned Specialist:</span>
              <span className="font-bold text-[#1F2937]">{successBooking.doctorName}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#6B7280]">Procedure Scheduled:</span>
            <span className="font-bold text-[#2D6CDF]">{activeTreatment.name}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#6B7280]">Date & Timing:</span>
            <span className="font-bold text-[#1F2937]">
              {new Date(successBooking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {successBooking.time}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#6B7280]">Service Fee:</span>
            <span className="font-extrabold text-[#1F2937]">{activeTreatment.price}</span>
          </div>
        </div>

        <div className="bg-[#F0F6FF] rounded-xl p-4 border border-[#2D6CDF]/20 text-xs text-left text-[#1F2937]">
          <p className="font-bold mb-1">Clinic Guidelines:</p>
          <ul className="list-disc pl-4 space-y-1 text-xs text-[#6B7280]">
            <li>Please arrive 10 minutes prior to your slot for skin prep and scanning.</li>
            <li>In case of cancellations or rescheduling, please notify us at least 4 hours in advance at <span className="font-bold text-[#1F2937]">+92 309 7823058</span>.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            id="btn-book-another"
            onClick={handleReset}
            className="px-6 py-3 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-xs font-bold text-[#1F2937] transition-all"
          >
            Schedule Another Appointment
          </button>
          <button
            id="btn-print-summary"
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl bg-[#2D6CDF] hover:bg-[#1D4ED8] text-xs font-bold text-white transition-all shadow-md"
          >
            Download Summary Receipts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F5] rounded-[32px] border border-[#E5DFD5] overflow-hidden shadow-xl max-w-3xl mx-auto text-[#1C1917]">
      {/* Step Header Indicator */}
      <div className="bg-[#1A3121] border-b border-[#C5A880]/30 px-6 py-5 flex justify-between items-center text-white">
        <div>
          <h3 className="text-xl font-serif text-white">Session Reservation</h3>
          <p className="text-xs text-[#EAE4DC]">LUMÉA Skin Sanctuary, Lyallpur Galleria, Faisalabad</p>
        </div>
        <div className="flex items-center gap-2 font-bold text-xs">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#C5A880] text-[#122315]' : 'bg-[#122315] text-[#EAE4DC]'}`}>1</span>
          <span className="text-[#C5A880]">/</span>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#C5A880] text-[#122315]' : 'bg-[#122315] text-[#EAE4DC]'}`}>2</span>
          <span className="text-[#C5A880]">/</span>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#C5A880] text-[#122315]' : 'bg-[#122315] text-[#EAE4DC]'}`}>3</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1: SELECT TREATMENT */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Step 1: Choose Skin Treatment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TREATMENTS.map((treatment) => (
                <div
                  id={`booking-select-treatment-${treatment.id}`}
                  key={treatment.id}
                  onClick={() => setTreatmentId(treatment.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    treatmentId === treatment.id
                      ? 'border-[#2D6CDF] bg-[#F0F6FF] shadow-sm'
                      : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#2D6CDF] bg-white px-2 py-0.5 rounded-md border border-[#E5E7EB]">
                      {treatment.category}
                    </span>
                    <span className="text-xs font-extrabold text-[#1F2937]">{treatment.price}</span>
                  </div>
                  <h5 className="font-bold text-[#1F2937] text-sm mt-3">{treatment.name}</h5>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-2 leading-relaxed">
                    {treatment.shortDescription}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-3">
                    <Clock className="w-3.5 h-3.5 text-[#2D6CDF]" />
                    <span>Duration: {treatment.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.treatment && <p className="text-xs text-red-500 font-bold">{errors.treatment}</p>}

            <div className="flex justify-end pt-4 border-t border-[#E5E7EB]">
              <button
                id="btn-step1-next"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl text-xs font-bold bg-[#2D6CDF] hover:bg-[#1D4ED8] text-white transition-all shadow-md"
              >
                Choose Date & Time <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                Step 2: Schedule Timing
              </h4>
              <p className="text-xs text-[#6B7280]">Select from open slots (Clinic timings: Mon-Sat 11:00 AM - 08:00 PM)</p>
            </div>

            {/* Interactive Calendar Slots Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#1F2937]">Available Days (Next 2 Weeks)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {getNextTwoWeeks().map((date) => {
                  const val = formatDateValue(date);
                  const isSelected = selectedDate === val;
                  return (
                    <button
                      id={`booking-select-date-${val}`}
                      key={val}
                      type="button"
                      onClick={() => {
                        setSelectedDate(val);
                        setErrors(prev => ({ ...prev, date: "" }));
                      }}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected 
                          ? 'border-[#2D6CDF] bg-[#2D6CDF] text-white font-bold' 
                          : 'border-[#E5E7EB] bg-white hover:bg-gray-50 text-xs text-[#1F2937]'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider opacity-80">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="block text-sm font-bold mt-0.5">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.date && <p className="text-xs text-red-500 font-bold mt-1">{errors.date}</p>}
            </div>

            {/* Interactive Time Slots Grid */}
            <div className="space-y-3 pt-3">
              <label className="block text-xs font-bold text-[#1F2937]">Available Time Slots</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      id={`booking-select-time-${time.replace(' ', '-')}`}
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        setErrors(prev => ({ ...prev, time: "" }));
                      }}
                      className={`py-2.5 px-1 rounded-xl border text-xs text-center transition-all ${
                        isSelected 
                          ? 'border-[#2D6CDF] bg-[#F0F6FF] text-[#2D6CDF] font-bold border-2' 
                          : 'border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#1F2937]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              {errors.time && <p className="text-xs text-red-500 font-bold mt-1">{errors.time}</p>}
            </div>

            <div className="flex justify-between pt-6 border-t border-[#E5E7EB] mt-6">
              <button
                id="btn-step2-prev"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-xs font-bold text-[#1F2937] transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="btn-step2-next"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#2D6CDF] hover:bg-[#1D4ED8] text-white transition-all shadow-md"
              >
                Enter Personal Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PERSONAL INFORMATION & NOTES */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Step 3: Patient Information
            </h4>

            {/* Quick alert if logged in */}
            {patientProfile && (
              <div className="bg-[#F0F6FF] border border-[#2D6CDF]/30 rounded-xl p-3.5 text-xs text-[#1F2937] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2D6CDF] shrink-0" />
                <span>You are logged in. We've automatically filled in your profile coordinates.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#2D6CDF]" /> Preferred Specialist
                </label>
                <select
                  id="booking-select-doctor"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[#E5E7EB] p-3.5 bg-white focus:outline-hidden focus:border-[#2D6CDF]"
                >
                  {CLINIC_INFO.doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.specialty} ({doc.schedule})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#2D6CDF]" /> Full Name
                </label>
                <input
                  id="booking-input-name"
                  type="text"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full text-xs rounded-xl border border-[#E5E7EB] p-3.5 focus:outline-hidden focus:border-[#2D6CDF]"
                />
                {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#2D6CDF]" /> Email Address
                </label>
                <input
                  id="booking-input-email"
                  type="email"
                  value={patientEmail}
                  onChange={(e) => {
                    setPatientEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  placeholder="e.g. contact@domain.com"
                  className="w-full text-xs rounded-xl border border-[#E5E7EB] p-3.5 focus:outline-hidden focus:border-[#2D6CDF]"
                />
                {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#2D6CDF]" /> Contact Mobile Number
                </label>
                <input
                  id="booking-input-phone"
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => {
                    setPatientPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  placeholder="e.g. +92 309 7823058"
                  className="w-full text-xs rounded-xl border border-[#E5E7EB] p-3.5 focus:outline-hidden focus:border-[#2D6CDF]"
                />
                {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#1F2937] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#2D6CDF]" /> Skin Concerns & Notes
                </label>
                <textarea
                  id="booking-input-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your active concerns (e.g., severe flareups, scarring, sensitivity to peels)"
                  className="w-full text-xs rounded-xl border border-[#E5E7EB] p-3.5 focus:outline-hidden focus:border-[#2D6CDF]"
                />
              </div>
            </div>

            <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-2xl p-4 mt-6">
              <h5 className="text-xs font-bold text-[#1F2937] mb-2 uppercase tracking-wider">Reservation Summary</h5>
              <div className="grid grid-cols-2 gap-y-1.5 text-xs text-[#1F2937]">
                <span className="text-[#6B7280]">Doctor:</span>
                <span className="font-bold text-right">{doctorName}</span>
                <span className="text-[#6B7280]">Treatment:</span>
                <span className="font-bold text-right">{activeTreatment?.name}</span>
                <span className="text-[#6B7280]">Date Selected:</span>
                <span className="font-bold text-right">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ""}
                </span>
                <span className="text-[#6B7280]">Time Slot:</span>
                <span className="font-bold text-right">{selectedTime}</span>
                <span className="text-[#6B7280]">Fee:</span>
                <span className="font-bold text-right text-[#2D6CDF]">{activeTreatment?.price}</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-[#E5E7EB] mt-6">
              <button
                id="btn-step3-prev"
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-xs font-bold text-[#1F2937] transition-all"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="btn-booking-submit"
                type="submit"
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl text-xs font-bold bg-[#2D6CDF] hover:bg-[#1D4ED8] text-white transition-all shadow-md"
              >
                Confirm Reservation <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

