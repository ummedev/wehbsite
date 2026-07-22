export interface Treatment {
  id: string;
  name: string;
  category: 'medical' | 'cosmetic' | 'hair';
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  procedureSteps: string[];
  skinTypes: string[];
  recovery: string;
  faqs: { q: string; a: string; }[];
  beforeAfterImage?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  treatmentId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  doctorName?: string;
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  medicalHistory: string[];
  recommendedSkincare: string[];
  prescriptions: Prescription[];
  photoLogs: PhotoLogEntry[];
}

export interface Prescription {
  id: string;
  date: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctorName: string;
}

export interface PhotoLogEntry {
  id: string;
  date: string;
  notes: string;
  imageUrl: string;
  tag: 'Progress' | 'Concern' | 'Initial';
}

export interface Testimonial {
  id: string;
  name: string;
  treatmentName: string;
  rating: number;
  text: string;
  date: string;
}
