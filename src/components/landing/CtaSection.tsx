'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Box, ShieldCheck, PhoneCall, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#10294C] to-[#1769E0] p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2587FF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-200">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>CONNECTED CARE PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Experience the Future of Patient-Centric Healthcare Today
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book consultations with top-rated medical specialists, inspect hospital departments in 3D, and access your digital medical records in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/auth/patient-signup">
                <Button size="lg" className="bg-[#2587FF] hover:bg-blue-500 text-white font-bold shadow-lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Register as Patient
                </Button>
              </Link>

              <Link href="/hospital/3d">
                <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Box className="w-4 h-4 mr-2 text-sky-300" />
                  Explore 3D Digital Twin
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% HIPAA & GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-bit Encrypted Telehealth</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>24/7 Clinical Triage Assistance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
