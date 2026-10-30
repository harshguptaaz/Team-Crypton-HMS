'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Activity,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  Bed,
  FlaskConical,
  Pill,
  BarChart3,
  Box,
  HeartPulse,
  Building2,
  Shield,
  Clock
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  title: string;
  subtitle?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  role,
  title,
  subtitle,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'patient':
        return [
          { label: 'Overview', href: '/patient/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'My Appointments', href: '/patient/appointments', icon: <Calendar className="w-5 h-5" /> },
          { label: 'Find Doctors', href: '/patient/doctors', icon: <Stethoscope className="w-5 h-5" /> },
          { label: 'Medical Records', href: '/patient/medical-records', icon: <FileText className="w-5 h-5" /> },
          { label: 'Prescriptions', href: '/patient/prescriptions', icon: <Pill className="w-5 h-5" /> },
          { label: 'Invoices & Payments', href: '/patient/payments', icon: <CreditCard className="w-5 h-5" /> },
        ];
      case 'doctor':
        return [
          { label: 'Clinical Dashboard', href: '/doctor/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Patient Queue', href: '/doctor/appointments', icon: <Calendar className="w-5 h-5" /> },
          { label: 'Assigned Patients', href: '/doctor/patients', icon: <Users className="w-5 h-5" /> },
          { label: 'Prescriptions', href: '/doctor/prescriptions', icon: <Pill className="w-5 h-5" /> },
          { label: 'Clinical Notes', href: '/doctor/medical-records', icon: <FileText className="w-5 h-5" /> },
          { label: 'OPD Schedule', href: '/doctor/schedule', icon: <Clock className="w-5 h-5" /> },
        ];
      case 'staff':
        return [
          { label: 'Station Dashboard', href: '/staff/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Patient Inpatients', href: '/staff/patients', icon: <Users className="w-5 h-5" /> },
          { label: 'Bed Allocation', href: '/staff/beds', icon: <Bed className="w-5 h-5" /> },
          { label: 'Pharmacy Dispensary', href: '/staff/pharmacy', icon: <Pill className="w-5 h-5" /> },
          { label: 'Diagnostic Lab', href: '/staff/laboratory', icon: <FlaskConical className="w-5 h-5" /> },
        ];
      case 'admin':
      case 'superadmin':
        return [
          { label: 'Executive Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
          { label: 'Physician Staff', href: '/admin/doctors', icon: <Stethoscope className="w-5 h-5" /> },
          { label: 'Departments & Wards', href: '/admin/departments', icon: <Building2 className="w-5 h-5" /> },
          { label: 'Nursing & Duty Staff', href: '/admin/staff', icon: <Users className="w-5 h-5" /> },
          { label: 'Patient Directory', href: '/admin/patients', icon: <Shield className="w-5 h-5" /> },
          { label: 'Revenue & Billing', href: '/admin/billing', icon: <CreditCard className="w-5 h-5" /> },
          { label: 'Operational Reports', href: '/admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
          { label: 'System Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#DCE8F5] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="h-16 flex items-center justify-between px-6 border-b border-[#DCE8F5]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1769E0] to-[#2587FF] flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-[#0B1F3A]">
                  Medi<span className="text-[#1769E0]">Care</span>
                </span>
                <span className="text-[10px] text-slate-400 capitalize font-medium">
                  {role} Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Menu Navigation
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1769E0] text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-[#F5F9FF] hover:text-[#1769E0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="p-4 pt-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Campus Twin
            </div>
            <div className="space-y-1 mt-1">
              <Link
                href="/hospital/3d"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-[#F5F9FF] hover:text-[#1769E0] transition-colors"
              >
                <Box className="w-4 h-4 text-[#1769E0]" />
                <span>3D Campus Twin</span>
              </Link>
              <Link
                href="/hospital/live-ot"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-[#F5F9FF] hover:text-[#1769E0] transition-colors"
              >
                <HeartPulse className="w-4 h-4 text-red-500" />
                <span>Live OT Telemetry</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#DCE8F5] bg-slate-50/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-[#EAF3FF] border border-[#DCE8F5] flex items-center justify-center font-bold text-[#1769E0] shrink-0 text-sm">
                {user ? user.name.charAt(0) : 'U'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#10233F] truncate">
                  {user ? user.name : 'Authorized User'}
                </div>
                <div className="text-[10px] text-slate-500 truncate capitalize">
                  {user ? user.role : role}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#DCE8F5] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#10233F] leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/hospital/live-status"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF3FF] border border-[#DCE8F5] text-xs font-semibold text-[#1769E0] hover:bg-blue-100 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Campus Online • 130 Beds Free</span>
            </Link>

            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-[#1769E0] px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Public Site →
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
