'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { mockDoctors } from '@/data/mockData';
import { Button } from '@/components/ui/Button';

export const DoctorsSection: React.FC = () => {
  const featuredDoctors = mockDoctors.slice(0, 4);

  return (
    <section id="doctors" className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1769E0] mb-2">
              Expert Clinical Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Distinguished Medical Faculty
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Consult with internationally renowned chief surgeons, cardiologists, neurologists, and oncologists.
            </p>
          </div>

          <Link href="/patient/doctors" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <span>View All Specialists</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold text-amber-600 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0B1F3A]/85 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-semibold text-white">
                    {doc.department}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base text-[#10233F] group-hover:text-[#1769E0] transition-colors leading-tight">
                    {doc.name}
                  </h3>
                  <div className="text-xs text-[#1769E0] font-semibold">
                    {doc.specialization}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {doc.qualifications} • {doc.experienceYears} yrs experience
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available Today
                    </span>
                    <span className="font-bold text-[#10233F]">${doc.consultationFee}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link href={`/patient/appointments?doctor=${encodeURIComponent(doc.id)}`}>
                  <Button size="sm" className="w-full text-xs">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    Book Consult
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
