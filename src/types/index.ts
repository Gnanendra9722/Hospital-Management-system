// User types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'pharmacist';
  avatar?: string;
}

// Patient types
export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  registrationDate: string;
  emergencyContact: string;
  medicalHistory?: MedicalHistory[];
}

export interface MedicalHistory {
  id: number;
  patientId: number;
  condition: string;
  diagnosedDate: string;
  treatment: string;
  notes: string;
}

// Doctor types
export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  phone: string;
  email: string;
  availability: Availability[];
  avatar?: string;
}

export interface Availability {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
}

// Appointment types
export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'regular' | 'followup' | 'emergency';
  notes?: string;
}

// Pharmacy types
export interface Medication {
  id: number;
  name: string;
  category: string;
  stock: number;
  manufacturer: string;
  expiryDate: string;
  unitPrice: number;
}

export interface Prescription {
  id: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: string;
  medications: PrescribedMedication[];
  instructions: string;
  status: 'pending' | 'dispensed' | 'cancelled';
}

export interface PrescribedMedication {
  medicationId: number;
  medicationName: string;
  dosage: string;
  duration: string;
  frequency: string;
  quantity: number;
}

// Billing types
export interface Bill {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  dueDate: string;
  services: BillingItem[];
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
}

export interface BillingItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category: 'consultation' | 'treatment' | 'medication' | 'lab' | 'other';
}

// Dashboard types
export interface DashboardStats {
  patientsCount: number;
  appointmentsToday: number;
  pendingBills: number;
  revenueThisMonth: number;
}

export interface ChartData {
  name: string;
  value: number;
}