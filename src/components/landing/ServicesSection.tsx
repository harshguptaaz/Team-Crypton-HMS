'use client';

import React from 'react';
import {
  ShieldAlert,
  Cpu,
  Scan,
  HeartPulse,
  Syringe,
  Baby
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: '24/7 Level-1 Trauma Care',
      desc: 'Immediate resuscitation, helipad air-ambulance intake, and rapid stroke/cardiac team mobilization.',
      icon: <ShieldAlert className="w-6 h-6 text-red-600" />,
      color: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      title: 'Robotic Precision Surgery',
      desc: 'Next-gen Da Vinci robotic platforms for minimally invasive cardiac, urological, and orthopedic procedures.',
      icon: <Cpu className="w-6 h-6 text-[#1769E0]" />,
      color: 'bg-blue-50 text-[#1769E0] border-blue-100',
    },
    {
      title: 'Advanced Diagnostic Imaging',
      desc: '3.0 Tesla Silent MRI, 256-slice ultra-fast cardiac CT, and high-resolution PET-CT molecular imaging.',
      icon: <Scan className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Intelligent Tele-ICU Monitoring',
      desc: 'Continuous real-time bedside telemetry, automated early warning scores (NEWS2), and biometric streaming.',
      icon: <HeartPulse className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Precision Oncology & Genomics',
      desc: 'Targeted immunotherapy, linear accelerator radiation therapy, and molecular genetic profiling.',
      icon: <Syringe className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'Neonatal & Pediatric Intensive Care',
      desc: 'Level-III NICU incubators with dedicated pediatric surgical teams and family-centered private suites.',
      icon: <Baby className="w-6 h-6 text-pink-600" />,
      color: 'bg-pink-50 text-pink-600 border-pink-100',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1769E0] mb-2">
            Technological Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Integrated Hospital Clinical Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Seamlessly bridging cutting-edge surgical robotics, predictive patient telemetry, and patient-centered hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[#DCE8F5] bg-white hover:border-[#2587FF]/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${srv.color} group-hover:scale-110 transition-transform`}
              >
                {srv.icon}
              </div>
              <h3 className="text-base font-bold text-[#10233F] group-hover:text-[#1769E0] transition-colors">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
