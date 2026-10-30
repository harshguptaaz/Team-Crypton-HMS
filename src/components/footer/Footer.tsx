import React from 'react';
import Link from 'next/link';
import { Activity, PhoneCall, MapPin, Clock, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#2587FF] flex items-center justify-center text-white shadow-lg">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight">
                  Medi<span className="text-[#2587FF]">Care</span> HOSPITAL
                </span>
                <span className="text-xs text-slate-400">Interactive 3D Digital Healthcare Ecosystem</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              World-class clinical excellence integrated with real-time digital twin architecture, intelligent operating theatre telemetry, and seamless multi-role healthcare workflows.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" />
                <span>JCI Accredited</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Digital Campus</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/hospital/3d" className="hover:text-[#2587FF] transition-colors">
                  3D Interactive Campus
                </Link>
              </li>
              <li>
                <Link href="/hospital/live-ot" className="hover:text-[#2587FF] transition-colors flex items-center gap-1.5">
                  <span>Live Operating Theatre</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </Link>
              </li>
              <li>
                <Link href="/hospital/live-status" className="hover:text-[#2587FF] transition-colors">
                  Hospital Vitals Console
                </Link>
              </li>
              <li>
                <Link href="/hospital/departments" className="hover:text-[#2587FF] transition-colors">
                  All Departments & Wards
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Portals</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/auth/login?role=patient" className="hover:text-[#2587FF] transition-colors">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link href="/auth/login?role=doctor" className="hover:text-[#2587FF] transition-colors">
                  Doctor & Surgeon Console
                </Link>
              </li>
              <li>
                <Link href="/auth/login?role=staff" className="hover:text-[#2587FF] transition-colors">
                  Nursing & Ward Staff
                </Link>
              </li>
              <li>
                <Link href="/auth/login?role=admin" className="hover:text-[#2587FF] transition-colors">
                  Hospital Administration
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">Emergency & Contact</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Emergency Hotline:</div>
                  <div className="text-red-400 font-bold">911 / (800) 555-0199</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#2587FF] shrink-0 mt-0.5" />
                <span>742 Evergreen Healthcare Blvd, Medical District</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Open 24 Hours • 7 Days a Week</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} MediCare Hospital Ecosystem. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
