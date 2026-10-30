import mongoose, { Schema, Model } from 'mongoose';

// User Schema
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['PATIENT', 'DOCTOR', 'NURSE', 'STAFF', 'ADMIN', 'SUPER_ADMIN'],
      default: 'PATIENT',
    },
    avatar: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

// Department Schema
const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Activity' },
    floor: { type: Number, required: true },
    building: { type: String, required: true },
    headDoctor: { type: String },
    color: { type: String, default: '#1769E0' },
    coordinates3D: { type: [Number], default: [0, 0, 0] },
    dimensions3D: { type: [Number], default: [5, 3, 5] },
  },
  { timestamps: true }
);

// Doctor Schema
const DoctorSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    departmentId: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, default: 5.0 },
    reviewsCount: { type: Number, default: 0 },
    avatar: { type: String },
    availability: { type: String, default: 'Available Today' },
    consultationFee: { type: Number, required: true },
    roomNumber: { type: String },
    about: { type: String },
    phone: { type: String },
    email: { type: String },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Patient Schema
const PatientSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodGroup: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    emergencyContact: { type: String },
    allergies: [{ type: String }],
    chronicConditions: [{ type: String }],
    insuranceProvider: { type: String },
    insurancePolicyNumber: { type: String },
    assignedDoctorId: { type: String },
    roomNumber: { type: String },
    admissionDate: { type: Date },
    status: {
      type: String,
      enum: ['Outpatient', 'Inpatient', 'Discharged', 'Critical'],
      default: 'Outpatient',
    },
  },
  { timestamps: true }
);

// Staff Schema
const StaffSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    role: { type: String, enum: ['NURSE', 'STAFF', 'PHARMACIST', 'LAB_TECH'], required: true },
    department: { type: String, required: true },
    shift: { type: String, enum: ['Morning', 'Evening', 'Night', 'Rotational'], default: 'Morning' },
    phone: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

// Appointment Schema
const AppointmentSchema = new Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    departmentId: { type: String, required: true },
    departmentName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['In-Person', 'Video Consultation', 'Emergency'], default: 'In-Person' },
    status: {
      type: String,
      enum: ['Scheduled', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    reason: { type: String, required: true },
    tokenNumber: { type: String, required: true },
  },
  { timestamps: true }
);

// Bed Schema
const BedSchema = new Schema(
  {
    bedNumber: { type: String, required: true, unique: true },
    departmentId: { type: String, required: true },
    departmentName: { type: String, required: true },
    ward: { type: String, required: true },
    floor: { type: Number, required: true },
    type: {
      type: String,
      enum: ['ICU', 'General', 'Emergency', 'Pediatric', 'Surgical', 'Deluxe'],
      default: 'General',
    },
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Reserved', 'Cleaning', 'Maintenance'],
      default: 'Available',
    },
    patientId: { type: String },
    patientName: { type: String },
    admittedDate: { type: Date },
    assignedNurse: { type: String },
  },
  { timestamps: true }
);

// Prescription Schema
const PrescriptionSchema = new Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },
    diagnosis: { type: String, required: true },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true },
        instructions: { type: String },
      },
    ],
    notes: { type: String },
    status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' },
  },
  { timestamps: true }
);

// Medical Record Schema
const MedicalRecordSchema = new Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true },
    diagnosis: { type: String, required: true },
    symptoms: [{ type: String }],
    treatment: { type: String, required: true },
    labResults: [{ type: String }],
    notes: { type: String },
  },
  { timestamps: true }
);

// Medicine Inventory Schema
const MedicineSchema = new Schema(
  {
    name: { type: String, required: true },
    genericName: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    unit: { type: String, required: true },
    minThreshold: { type: Number, default: 50 },
    expiryDate: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Expired'], default: 'In Stock' },
  },
  { timestamps: true }
);

// Lab Test Schema
const LabTestSchema = new Schema(
  {
    testName: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, required: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    orderedDate: { type: String, required: true },
    completedDate: { type: String },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Critical'], default: 'Pending' },
    result: { type: String },
    normalRange: { type: String },
    unit: { type: String },
    urgency: { type: String, enum: ['Routine', 'Urgent', 'Critical'], default: 'Routine' },
  },
  { timestamps: true }
);

// Billing Schema
const BillingSchema = new Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    items: [
      {
        description: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        unitPrice: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    subtotal: { type: Number, required: true },
    insuranceCovered: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Pending', 'Partially Paid', 'Overdue'], default: 'Pending' },
    paymentMethod: { type: String },
  },
  { timestamps: true }
);

// Notification Schema
const NotificationSchema = new Schema(
  {
    userId: { type: String },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    type: { type: String, enum: ['appointment', 'alert', 'lab', 'bed', 'prescription', 'system'], default: 'system' },
    actionUrl: { type: String },
  },
  { timestamps: true }
);

export const UserModel: Model<any> = mongoose.models.User || mongoose.model('User', UserSchema);
export const DepartmentModel: Model<any> = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
export const DoctorModel: Model<any> = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
export const PatientModel: Model<any> = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
export const StaffModel: Model<any> = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
export const AppointmentModel: Model<any> = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
export const BedModel: Model<any> = mongoose.models.Bed || mongoose.model('Bed', BedSchema);
export const PrescriptionModel: Model<any> = mongoose.models.Prescription || mongoose.model('Prescription', PrescriptionSchema);
export const MedicalRecordModel: Model<any> = mongoose.models.MedicalRecord || mongoose.model('MedicalRecord', MedicalRecordSchema);
export const MedicineModel: Model<any> = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
export const LabTestModel: Model<any> = mongoose.models.LabTest || mongoose.model('LabTest', LabTestSchema);
export const BillingModel: Model<any> = mongoose.models.Billing || mongoose.model('Billing', BillingSchema);
export const NotificationModel: Model<any> = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
