'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Box,
  ArrowRight,
  User,
  Stethoscope,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  HeartPulse
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';

const HospitalCanvas = dynamic(
  () => import('@/components/3d/HospitalCanvas').then((mod) => mod.HospitalCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] lg:h-[640px] bg-[#EAF3FF] rounded-3xl animate-pulse flex flex-col items-center justify-center text-slate-400 border border-[#DCE8F5]">
        <HeartPulse className="w-10 h-10 text-[#1769E0] animate-bounce" />
        <span className="text-sm font-semibold mt-3">Loading 3D Hospital Twin...</span>
      </div>
    ),
  }
);

export const HeroSection: React.FC = () => {
  const roleCards = [
    {
      role: 'Patient',
      desc: 'Appointments & records',
      icon: <User className="w-4 h-4 text-[#1769E0]" />,
      href: '/auth/login?role=patient',
      color: 'hover:border-blue-300',
    },
    {
      role: 'Doctor',
      desc: 'Patients & clinical notes',
      icon: <Stethoscope className="w-4 h-4 text-emerald-600" />,
      href: '/auth/login?role=doctor',
      color: 'hover:border-emerald-300',
    },
    {
      role: 'Staff',
      desc: 'Hospital operations & beds',
      icon: <ShieldAlert className="w-4 h-4 text-amber-600" />,
      href: '/auth/login?role=staff',
      color: 'hover:border-amber-300',
    },
    {
      role: 'Admin',
      desc: 'Manage entire hospital',
      icon: <ShieldCheck className="w-4 h-4 text-indigo-600" />,
      href: '/auth/login?role=admin',
      color: 'hover:border-indigo-300',
    },
  ];

  return (
    <section className="relative pt-6 pb-16 lg:py-14 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-sky-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF3FF] border border-[#DCE8F5] text-xs font-bold text-[#1769E0] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#2587FF]" />
              <span>SMART DIGITAL HOSPITAL</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.12]">
              World-Class Healthcare.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1769E0] to-[#2587FF]">
                Powered by Intelligence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Experience a smarter way to access healthcare, manage hospital operations, and explore your hospital in an interactive 3D digital ecosystem.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/patient/appointments">
                <Button size="lg" className="shadow-lg shadow-blue-500/25">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>

              <Link href="/hospital/3d">
                <Button variant="secondary" size="lg">
                  <Box className="w-4 h-4 mr-2 text-[#1769E0]" />
                  Explore 3D Hospital
                </Button>
              </Link>
            </div>

            <div className="pt-1">
              <Link
                href="/hospital/3d"
                className="inline-flex items-center text-xs font-bold text-[#1769E0] hover:text-[#2587FF] transition-colors gap-1 group"
              >
                <span>Take a Virtual Interactive Tour</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#DCE8F5]/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Dedicated Role Portals
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {roleCards.map((card) => (
                  <Link
                    key={card.role}
                    href={card.href}
                    className={`p-3 rounded-2xl bg-white border border-[#DCE8F5] transition-all hover:shadow-md ${card.color} group`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="p-1.5 rounded-lg bg-[#F5F9FF] group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#1769E0] transition-colors" />
                    </div>
                    <div className="text-xs font-bold text-[#10233F]">{card.role}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{card.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <HospitalCanvas height="h-[500px] sm:h-[580px] lg:h-[640px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
