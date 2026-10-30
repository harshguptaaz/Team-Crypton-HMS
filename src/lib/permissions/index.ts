import { UserRole } from '@/types';

export type Permission =
  // Patient Permissions
  | 'view_own_appointments'
  | 'book_appointment'
  | 'view_own_medical_records'
  | 'view_own_prescriptions'
  | 'view_own_bills'
  | 'pay_bill'

  // Doctor Permissions
  | 'view_assigned_patients'
  | 'create_prescriptions'
  | 'update_medical_records'
  | 'manage_doctor_appointments'
  | 'view_doctor_schedule'

  // Staff Permissions
  | 'manage_beds'
  | 'manage_patients'
  | 'manage_pharmacy'
  | 'manage_laboratory'
  | 'manage_inventory'

  // Admin Permissions
  | 'manage_doctors'
  | 'manage_staff'
  | 'manage_departments'
  | 'manage_billing'
  | 'view_hospital_reports'
  | 'manage_system_settings'

  // General
  | 'view_3d_hospital'
  | 'view_live_ot';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  PATIENT: [
    'view_own_appointments',
    'book_appointment',
    'view_own_medical_records',
    'view_own_prescriptions',
    'view_own_bills',
    'pay_bill',
    'view_3d_hospital',
    'view_live_ot',
  ],
  DOCTOR: [
    'view_assigned_patients',
    'create_prescriptions',
    'update_medical_records',
    'manage_doctor_appointments',
    'view_doctor_schedule',
    'view_3d_hospital',
    'view_live_ot',
  ],
  NURSE: [
    'view_assigned_patients',
    'manage_beds',
    'manage_patients',
    'view_3d_hospital',
    'view_live_ot',
  ],
  STAFF: [
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'manage_inventory',
    'view_3d_hospital',
    'view_live_ot',
  ],
  ADMIN: [
    'manage_doctors',
    'manage_staff',
    'manage_departments',
    'manage_billing',
    'view_hospital_reports',
    'manage_system_settings',
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'view_3d_hospital',
    'view_live_ot',
  ],
  SUPER_ADMIN: [
    'view_own_appointments',
    'book_appointment',
    'view_own_medical_records',
    'view_own_prescriptions',
    'view_own_bills',
    'pay_bill',
    'view_assigned_patients',
    'create_prescriptions',
    'update_medical_records',
    'manage_doctor_appointments',
    'view_doctor_schedule',
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'manage_inventory',
    'manage_doctors',
    'manage_staff',
    'manage_departments',
    'manage_billing',
    'view_hospital_reports',
    'manage_system_settings',
    'view_3d_hospital',
    'view_live_ot',
  ],
  patient: [
    'view_own_appointments',
    'book_appointment',
    'view_own_medical_records',
    'view_own_prescriptions',
    'view_own_bills',
    'pay_bill',
    'view_3d_hospital',
    'view_live_ot',
  ],
  doctor: [
    'view_assigned_patients',
    'create_prescriptions',
    'update_medical_records',
    'manage_doctor_appointments',
    'view_doctor_schedule',
    'view_3d_hospital',
    'view_live_ot',
  ],
  nurse: [
    'view_assigned_patients',
    'manage_beds',
    'manage_patients',
    'view_3d_hospital',
    'view_live_ot',
  ],
  staff: [
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'manage_inventory',
    'view_3d_hospital',
    'view_live_ot',
  ],
  admin: [
    'manage_doctors',
    'manage_staff',
    'manage_departments',
    'manage_billing',
    'view_hospital_reports',
    'manage_system_settings',
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'view_3d_hospital',
    'view_live_ot',
  ],
  superadmin: [
    'view_own_appointments',
    'book_appointment',
    'view_own_medical_records',
    'view_own_prescriptions',
    'view_own_bills',
    'pay_bill',
    'view_assigned_patients',
    'create_prescriptions',
    'update_medical_records',
    'manage_doctor_appointments',
    'view_doctor_schedule',
    'manage_beds',
    'manage_patients',
    'manage_pharmacy',
    'manage_laboratory',
    'manage_inventory',
    'manage_doctors',
    'manage_staff',
    'manage_departments',
    'manage_billing',
    'view_hospital_reports',
    'manage_system_settings',
    'view_3d_hospital',
    'view_live_ot',
  ],
};

export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  if (userRole === 'SUPER_ADMIN') return true;
  return allowedRoles.includes(userRole);
}

export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  if (userRole === 'SUPER_ADMIN') return true;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

export function authorize(userRole: UserRole, requiredPermission: Permission): { authorized: boolean; reason?: string } {
  if (!hasPermission(userRole, requiredPermission)) {
    return {
      authorized: false,
      reason: `Unauthorized: Role '${userRole}' lacks permission '${requiredPermission}'`,
    };
  }
  return { authorized: true };
}
