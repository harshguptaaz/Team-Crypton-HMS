import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['PATIENT', 'DOCTOR', 'NURSE', 'STAFF', 'ADMIN', 'SUPER_ADMIN']),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters with at least one number'),
  role: z.enum(['PATIENT', 'DOCTOR', 'STAFF']),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  medicalLicense: z.string().optional(),
  departmentId: z.string().optional(),
});

export const appointmentBookingSchema = z.object({
  departmentId: z.string().min(1, 'Please select a department'),
  doctorId: z.string().min(1, 'Please select a specialist doctor'),
  appointmentType: z.enum(['In-Person', 'Video Consultation', 'Emergency']),
  date: z.string().min(1, 'Please choose a date'),
  time: z.string().min(1, 'Please select a time slot'),
  reason: z.string().min(5, 'Please provide reason for visit (min 5 chars)'),
  patientName: z.string().min(2, 'Patient name is required'),
  patientPhone: z.string().min(10, 'Valid contact number is required'),
});

export const prescriptionSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  diagnosis: z.string().min(3, 'Diagnosis description is required'),
  medicines: z.array(
    z.object({
      name: z.string().min(1, 'Medicine name is required'),
      dosage: z.string().min(1, 'Dosage is required (e.g. 500mg)'),
      frequency: z.string().min(1, 'Frequency is required'),
      duration: z.string().min(1, 'Duration is required'),
      instructions: z.string().optional(),
    })
  ).min(1, 'At least one medicine must be prescribed'),
  notes: z.string().optional(),
});

export const bedUpdateSchema = z.object({
  bedId: z.string().min(1, 'Bed ID is required'),
  status: z.enum(['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance']),
  patientId: z.string().optional(),
  patientName: z.string().optional(),
});
