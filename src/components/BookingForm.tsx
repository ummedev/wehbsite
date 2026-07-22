import React, { useState, useEffect } from 'react';
import { TREATMENTS, CLINIC_INFO } from '../data';
import { Appointment } from '../types';
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

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

  const formatDateLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) newErrors.name = "Full Name is required";
    if (!patientEmail.trim() || !/\S+@\S+\.\S+/.test(patientEmail)) newErrors.email = "Please enter a valid email address";
    if (!patientPhone.trim() || patientPhone.length < 9) newErrors.phone = "Please enter a valid Pakistani phone number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newAppointment: Appointment = {
      id: `DOC-${Math.floor(100000 + Math.random() * 900000)}`,
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

    // Save appointment list to localStorage
    const saved = localStorage.getItem('docplus_appointments');
    const list = saved ? JSON.parse(saved) : [];
    list.unshift(newAppointment);
    localStorage.setItem('docplus_appointments', JSON.stringify(list));

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
        className="bg-white rounded-2xl border border-[#A8C3A0]/50 p-8 text-center max-w-2xl mx-auto shadow-lg animate-fade-in"
      >
        <div className="w-16 h-16 rounded-full bg-[#A8C3A0]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#A8C3A0]" />
        </div>
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-[#FAF8F8] border border-[#F6D6D8] uppercase text-[#2E2E2E]/60 mb-2">
          Appointment Confirmed
        </span>
        <h3 className="text-2xl font-display font-semibold text-[#2E2E2E] mb-2">
          Your Booking is Successful!
        </h3>
        <p className="text-sm text-[#2E2E2E]/70 mb-6">
          Thank you for choosing Doc+ Dermatology. A confirmation SMS and email summary has been dispatched.
        </p>

        {/* Appointment Details summary board */}
        <div className="bg-[#FAF8F8] rounded-xl border border-[#F6D6D8]/20 p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between items-center text-xs border-b border-[#F6D6D8]/20 pb-2">
            <span className="text-[#2E2E2E]/60 font-mono">Reference Code:</span>
            <span className="font-mono font-bold text-slate-800">{successBooking.id}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#2E2E2E]/60">Patient Name:</span>
            <span className="font-medium text-[#2E2E2E]">{successBooking.patientName}</span>
          </div>
          {successBooking.doctorName && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#2E2E2E]/60">Assigned Consultant:</span>
              <span className="font-medium text-[#2E2E2E]">{successBooking.doctorName}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#2E2E2E]/60">Procedure Scheduled:</span>
            <span className="font-medium text-[#A8C3A0]">{activeTreatment.name}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#2E2E2E]/60">Date & Timing:</span>
            <span className="font-medium text-[#2E2E2E]">
              {new Date(successBooking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {successBooking.time}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#2E2E2E]/60">Cost of Service:</span>
            <span className="font-bold text-[#2E2E2E]">{activeTreatment.price}</span>
          </div>
        </div>

        <div className="bg-[#F6D6D8]/20 rounded-lg p-4 border border-[#F6D6D8]/40 mb-8 text-xs text-left text-[#2E2E2E]/80">
          <p className="font-semibold mb-1">Clinic Policy & Instructions:</p>
          <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#2E2E2E]/70">
            <li>Please arrive 10 minutes prior to your slot for skin prep and scanning.</li>
            <li>In case of cancellations or rescheduling, please notify us at least 4 hours in advance at <span className="font-mono font-bold text-slate-700">+92 309 7823058</span>.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="btn-book-another"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full border border-[#F6D6D8] hover:bg-[#FAF8F8] text-xs font-semibold text-[#2E2E2E] transition-all"
          >
            Schedule Another Appointment
          </button>
          <button
            id="btn-print-summary"
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded-full bg-[#2E2E2E] hover:bg-[#3E3E3E] text-xs font-semibold text-white transition-all shadow-md"
          >
            Download Summary Receipts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F6D6D8]/30 overflow-hidden shadow-md max-w-3xl mx-auto">
      {/* Step Header Indicator */}
      <div className="bg-[#FAF8F8] border-b border-[#F6D6D8]/20 px-6 py-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-display font-semibold text-[#2E2E2E]">In-Clinic Session Scheduler</h3>
          <p className="text-xs text-[#2E2E2E]/60">Doc+ Dermatology Lyallpur Galleria, Faisalabad</p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className={`px-2 py-1 rounded-md ${step >= 1 ? 'bg-[#F6D6D8] text-[#2E2E2E] font-bold' : 'bg-gray-100 text-gray-400'}`}>1</span>
          <span className="text-[#F6D6D8]">/</span>
          <span className={`px-2 py-1 rounded-md ${step >= 2 ? 'bg-[#F6D6D8] text-[#2E2E2E] font-bold' : 'bg-gray-100 text-gray-400'}`}>2</span>
          <span className="text-[#F6D6D8]">/</span>
          <span className={`px-2 py-1 rounded-md ${step >= 3 ? 'bg-[#F6D6D8] text-[#2E2E2E] font-bold' : 'bg-gray-100 text-gray-400'}`}>3</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* STEP 1: SELECT TREATMENT */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h4 className="text-sm font-semibold text-[#2E2E2E] uppercase tracking-wider font-mono">
              Step 1: Choose Skin Treatment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TREATMENTS.map((treatment) => (
                <div
                  id={`booking-select-treatment-${treatment.id}`}
                  key={treatment.id}
                  onClick={() => setTreatmentId(treatment.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    treatmentId === treatment.id
                      ? 'border-[#A8C3A0] bg-[#A8C3A0]/5 shadow-sm'
                      : 'border-[#F6D6D8]/30 hover:border-[#F6D6D8] bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-mono tracking-wider font-semibold text-[#A8C3A0] uppercase bg-[#FAF8F8] px-2 py-0.5 rounded-md border border-[#F6D6D8]/20">
                      {treatment.category}
                    </span>
                    <span className="text-xs font-bold text-[#2E2E2E]">{treatment.price}</span>
                  </div>
                  <h5 className="font-semibold text-[#2E2E2E] text-sm mt-3">{treatment.name}</h5>
                  <p className="text-[11px] text-[#2E2E2E]/60 mt-1 line-clamp-2">
                    {treatment.shortDescription}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#2E2E2E]/70 mt-3">
                    <Clock className="w-3 h-3 text-[#A8C3A0]" />
                    <span>Duration: {treatment.duration}</span>
                  </div>
                </div>
              ))}
            </div>
            {errors.treatment && <p className="text-xs text-red-500">{errors.treatment}</p>}

            <div className="flex justify-end pt-4 border-t border-[#F6D6D8]/10">
              <button
                id="btn-step1-next"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white transition-all shadow-md"
              >
                Choose Date & Time <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DATE & TIME */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h4 className="text-sm font-semibold text-[#2E2E2E] uppercase tracking-wider font-mono mb-1">
                Step 2: Schedule Timing
              </h4>
              <p className="text-[11px] text-[#2E2E2E]/60">Select from open slots (Clinic timings: Mon-Sat 11:00 AM - 08:00 PM)</p>
            </div>

            {/* Interactive Calendar Slots Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#2E2E2E]">Available Days (Next 2 Weeks)</label>
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
                      className={`p-3 rounded-lg border text-center transition-all ${
                        isSelected 
                          ? 'border-[#A8C3A0] bg-[#A8C3A0] text-white font-semibold' 
                          : 'border-[#F6D6D8]/20 bg-white hover:border-[#F6D6D8] text-xs'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wider opacity-90">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="block text-sm font-semibold mt-0.5">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            {/* Interactive Time Slots Grid */}
            <div className="space-y-3 pt-3">
              <label className="block text-xs font-semibold text-[#2E2E2E]">Available Time Slots</label>
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
                      className={`py-2 px-1 rounded-lg border text-xs text-center transition-all ${
                        isSelected 
                          ? 'border-[#A8C3A0] bg-[#A8C3A0]/10 text-[#2E2E2E] font-bold border-2' 
                          : 'border-[#F6D6D8]/20 bg-white hover:border-[#F6D6D8]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>

            <div className="flex justify-between pt-6 border-t border-[#F6D6D8]/10 mt-6">
              <button
                id="btn-step2-prev"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#F6D6D8] hover:bg-[#FAF8F8] text-xs font-semibold text-[#2E2E2E] transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                id="btn-step2-next"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white transition-all shadow-md"
              >
                Enter Personal Details <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PERSONAL INFORMATION & NOTES */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            <h4 className="text-sm font-semibold text-[#2E2E2E] uppercase tracking-wider font-mono">
              Step 3: Patient Information
            </h4>

            {/* Quick alert if logged in */}
            {patientProfile && (
              <div className="bg-[#A8C3A0]/10 border border-[#A8C3A0]/30 rounded-lg p-3 text-xs text-[#2E2E2E]/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A8C3A0] shrink-0" />
                <span>You are logged in. We've automatically filled in your profile coordinates.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#2E2E2E] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#A8C3A0]" /> Preferred Consultant Specialist
                </label>
                <select
                  id="booking-select-doctor"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 bg-white focus:outline-hidden focus:border-[#A8C3A0]"
                >
                  {CLINIC_INFO.doctors.map((doc) => (
                    <option key={doc.id} value={doc.name}>
                      {doc.name} — {doc.specialty} ({doc.schedule})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2E2E2E] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#A8C3A0]" /> Full Name
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
                  className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0] focus:ring-1 focus:ring-[#A8C3A0]"
                />
                {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#2E2E2E] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#A8C3A0]" /> Email Address
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
                  className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0]"
                />
                {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#2E2E2E] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#A8C3A0]" /> Contact Mobile (Pakistan)
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
                  className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0]"
                />
                {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#2E2E2E] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#A8C3A0]" /> Skin Concerns & Pre-existing Allergies
                </label>
                <textarea
                  id="booking-input-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your active concerns (e.g., severe flareups, scarring, sensitivity to peels)"
                  className="w-full text-xs rounded-lg border border-[#F6D6D8]/40 p-3 focus:outline-hidden focus:border-[#A8C3A0]"
                />
              </div>
            </div>

            <div className="bg-[#FAF8F8] border border-[#F6D6D8]/20 rounded-xl p-4 mt-6">
              <h5 className="text-xs font-semibold text-[#2E2E2E] mb-2 font-mono uppercase">Reservation Summary</h5>
              <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-[#2E2E2E]/80">
                <span>Preferred Doctor:</span>
                <span className="font-semibold text-right">{doctorName}</span>
                <span>Treatment:</span>
                <span className="font-semibold text-right">{activeTreatment?.name}</span>
                <span>Date Selected:</span>
                <span className="font-semibold text-right">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ""}
                </span>
                <span>Appointment Time:</span>
                <span className="font-semibold text-right">{selectedTime}</span>
                <span>Fees / Cost:</span>
                <span className="font-semibold text-right text-[#A8C3A0]">{activeTreatment?.price}</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-[#F6D6D8]/10 mt-6">
              <button
                id="btn-step3-prev"
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#F6D6D8] hover:bg-[#FAF8F8] text-xs font-semibold text-[#2E2E2E] transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                id="btn-booking-submit"
                type="submit"
                className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full text-xs font-semibold bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#F6D6D8] transition-all shadow-md hover:shadow-lg"
              >
                Confirm Appointment Reservation <CheckCircle2 className="w-4 h-4 text-[#F6D6D8]" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
