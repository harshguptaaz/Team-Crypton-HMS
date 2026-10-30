export type UserRole =
  | 'PATIENT'
  | 'DOCTOR'
  | 'NURSE'
  | 'STAFF'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'patient'
  | 'doctor'
  | 'nurse'
  | 'staff'
  | 'admin'
  | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  icon?: string;
  floor: number;
  building?: string;
  headDoctor: string;
  doctorCount?: number;
  activeDoctors?: number;
  availableBeds: number;
  totalBeds: number;
  activePatients?: number;
  color: string;
  coordinates3D: [number, number, number];
  dimensions3D?: [number, number, number];
  status?: 'Active' | 'Full' | 'Normal' | 'Critical' | string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty?: string;
  specialization?: string;
  departmentId?: string;
  departmentName?: string;
  department?: string;
  qualification?: string;
  qualifications?: string;
  experience?: number;
  experienceYears?: number;
  rating: number;
  reviewsCount?: number;
  avatar?: string;
  image?: string;
  availability?: 'Available Today' | 'On Leave' | 'In Surgery' | 'Available Tomorrow' | string;
  availableDays?: string[];
  availableHours?: string;
  nextAvailableSlot?: string;
  consultationFee: number;
  roomNumber?: string;
  about?: string;
  phone?: string;
  email?: string;
  isOnline?: boolean;
  status?: 'Active' | 'On Leave' | 'Inactive' | string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact?: string;
  avatar?: string;
  allergies?: string[];
  chronicConditions?: string[];
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  assignedDoctorId?: string;
  assignedDoctorName?: string;
  roomNumber?: string;
  bedNumber?: string;
  admissionDate?: string;
  admittedDate?: string;
  diagnosis?: string;
  condition?: string;
  status: 'Outpatient' | 'Inpatient' | 'Discharged' | 'Critical' | 'Admitted' | string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty?: string;
  departmentId?: string;
  departmentName?: string;
  department?: string;
  date: string;
  time: string;
  type: 'In-Person' | 'Video Consultation' | 'Emergency' | 'Telehealth' | string;
  status: 'Scheduled' | 'Confirmed' | 'In-Progress' | 'Completed' | 'Cancelled';
  reason: string;
  tokenNumber?: string;
  vitals?: {
    bp?: string;
    pulse?: number;
    temp?: string;
    weight?: string;
  };
}

export type BedStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning' | 'Maintenance';
export type BedType = 'ICU' | 'General' | 'Emergency' | 'Pediatric' | 'Surgical' | 'Deluxe';

export interface Bed {
  id: string;
  bedNumber: string;
  departmentId: string;
  departmentName: string;
  department?: string;
  ward: string;
  floor: number;
  roomNumber?: string;
  type: BedType;
  status: BedStatus;
  patientId?: string;
  patientName?: string;
  patientAge?: number;
  admittedDate?: string;
  assignedNurse?: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty?: string;
  department?: string;
  date?: string;
  diagnosis?: string;
  medicines?: PrescriptionMedicine[];
  medication?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  issuedDate?: string;
  notes?: string;
  status: 'Active' | 'Completed' | 'Cancelled';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: string;
  date: string;
  diagnosis: string;
  symptoms?: string[];
  treatment?: string;
  treatmentPlan?: string;
  prescriptions?: PrescriptionMedicine[];
  labResults?: string[];
  notes: string;
  attachments?: { name: string; url: string; size: string }[];
  followUpDate?: string;
}

export interface MedicineInventory {
  id: string;
  name: string;
  genericName: string;
  category: 'Antibiotic' | 'Cardiovascular' | 'Analgesic' | 'Antiviral' | 'Respiratory' | 'Neurological' | 'Other';
  stock: number;
  minStock?: number;
  unit: string;
  minThreshold: number;
  expiryDate: string;
  price: number;
  manufacturer: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Expired';
}

export interface LabTest {
  id: string;
  testName: string;
  code: string;
  category: 'Hematology' | 'Biochemistry' | 'Microbiology' | 'Radiology' | 'Pathology';
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  orderedBy?: string;
  orderedDate: string;
  requestedDate?: string;
  completedDate?: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Critical';
  result?: string;
  normalRange?: string;
  unit?: string;
  urgency: 'Routine' | 'Urgent' | 'Critical';
}

export interface BillingItem {
  id: string;
  description: string;
  category: 'Consultation' | 'Room Charges' | 'Laboratory' | 'Medicines' | 'Procedures' | 'Nursing';
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Bill {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  department?: string;
  date: string;
  dueDate: string;
  items: BillingItem[];
  subtotal: number;
  insuranceCovered: number;
  discount: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Partially Paid' | 'Overdue';
  paymentMethod?: 'Card' | 'Insurance' | 'Cash' | 'Online Banking';
}

export interface OperationTheatre {
  id: string;
  name: string;
  department: string;
  floor?: number;
  surgeon: string;
  leadSurgeon?: string;
  anesthetist: string;
  nurseInCharge?: string;
  procedure: string;
  currentProcedure?: string;
  startTime: string;
  expectedEndTime: string;
  status: 'In Progress' | 'Preparing' | 'Completed' | 'Cleaning' | 'In Use' | 'Idle' | string;
  vitals?: {
    heartRate: number;
    spO2: number;
    bloodPressure: string;
    respiratoryRate: number;
    temperature: number;
  };
  patientVitals?: {
    heartRate: number;
    spo2: number;
    bloodPressure: string;
    temperature: number;
  };
  equipment?: {
    name: string;
    status: 'Normal' | 'Warning' | 'Offline';
    detail?: string;
  }[];
}

export type OperatingTheatre = OperationTheatre;

export interface HospitalStatus {
  totalBeds: number;
  availableBeds: number;
  emergencyWaitTimeMinutes: number;
  icuBedsAvailable?: number;
  operatingTheatresActive?: number;
}

export interface HospitalLiveStatus {
  emergency: { status: 'Normal' | 'Busy' | 'Critical'; queue: number; avgWaitTime: string };
  opd: { status: 'Normal' | 'Busy' | 'Congested'; activeDoctors: number; waitingPatients: number };
  icu: { total: number; occupied: number; rate: number; available: number };
  beds: { total: number; occupied: number; rate: number; available: number };
  pharmacy: { status: 'Operational' | 'Busy' | 'Low Stock'; pendingOrders: number };
  laboratory: { status: 'Operational' | 'Processing'; pendingTests: number; criticalAlerts: number };
  operationRooms: { total: number; active: number; preparing: number; idle: number };
  ambulances: { total: number; onDuty: number; available: number };
  lastUpdated: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'alert' | 'lab' | 'bed' | 'prescription' | 'system';
  actionUrl?: string;
}
