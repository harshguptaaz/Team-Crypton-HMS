'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Stethoscope,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  UserPlus,
  LogIn,
  LogOut,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

export const LoginDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isAuthenticated && user) {
    const dashboardLink = `/${user.role}/dashboard`;
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF3FF] hover:bg-blue-100 border border-[#DCE8F5] transition-all text-xs font-bold text-[#1769E0]"
        >
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover border border-[#1769E0]/30"
          />
          <span className="truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
          <span className="text-[10px] bg-[#1769E0] text-white px-1.5 py-0.5 rounded-full uppercase">
            {user.role}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#DCE8F5] p-2 z-50 overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <div className="font-bold text-xs text-[#10233F]">{user.name}</div>
                <div className="text-[11px] text-slate-500">{user.email}</div>
              </div>
              <Link
                href={dashboardLink}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#10233F] hover:bg-[#F5F9FF] rounded-xl transition-colors group"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1769E0] group-hover:translate-x-0.5 transition-all" />
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-1"
              >
                <span>Sign Out</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1769E0] hover:bg-[#2587FF] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Portal Sign In</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2.5 w-72 bg-white rounded-2xl shadow-2xl border border-[#DCE8F5] p-3 z-50 text-[#10233F]"
          >
            <div className="mb-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
                Access Portals
              </div>
              <div className="space-y-1">
                <Link
                  href="/auth/login?role=patient"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1769E0] flex items-center justify-center group-hover:bg-[#1769E0] group-hover:text-white transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10233F] group-hover:text-[#1769E0]">
                      Patient Portal
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Appointments, records & vitals
                    </div>
                  </div>
                </Link>

                <Link
                  href="/auth/login?role=doctor"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10233F] group-hover:text-emerald-600">
                      Doctor Portal
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Consultations, prescriptions & rounds
                    </div>
                  </div>
                </Link>

                <Link
                  href="/auth/login?role=staff"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10233F] group-hover:text-amber-600">
                      Staff & Nursing
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Bed management, triage & labs
                    </div>
                  </div>
                </Link>

                <Link
                  href="/auth/login?role=admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10233F] group-hover:text-indigo-600">
                      Hospital Admin
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Operations, billing & analytics
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="my-2 border-t border-[#DCE8F5]" />

            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1 flex items-center gap-1">
                <UserPlus className="w-3 h-3" /> New Registrations
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1 text-center">
                <Link
                  href="/auth/patient-signup"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 px-2 rounded-lg text-[11px] font-semibold text-slate-700 hover:bg-[#EAF3FF] hover:text-[#1769E0] transition-colors"
                >
                  Patient
                </Link>
                <Link
                  href="/auth/doctor-signup"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 px-2 rounded-lg text-[11px] font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  Doctor
                </Link>
                <Link
                  href="/auth/staff-signup"
                  onClick={() => setIsOpen(false)}
                  className="py-1.5 px-2 rounded-lg text-[11px] font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  Staff
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
