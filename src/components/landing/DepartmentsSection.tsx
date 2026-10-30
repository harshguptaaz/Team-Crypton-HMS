'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Bed,
  UserCheck,
  Box
} from 'lucide-react';
import { mockDepartments } from '@/data/mockData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const DepartmentsSection: React.FC = () => {
  const displayDepts = mockDepartments.slice(0, 6);

  return (
    <section id="departments" className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#1769E0] mb-2">
              Clinical Excellence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Specialized Medical Centers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Equipped with precision robotic surgical suites, hybrid cardiac catheterization labs, and real-time telemetry monitoring.
            </p>
          </div>

          <Link href="/hospital/departments" className="mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <span>View All 19 Departments</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDepts.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-xs"
                    style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                  >
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Floor {dept.floor}</span>
                    <Badge variant={dept.status === 'Active' ? 'success' : 'warning'}>
                      {dept.status}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#10233F] group-hover:text-[#1769E0] transition-colors">
                  {dept.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-5 p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-[#1769E0]" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Available</div>
                      <div className="font-bold text-slate-800">{dept.availableBeds} / {dept.totalBeds} Beds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">Specialists</div>
                      <div className="font-bold text-slate-800">{dept.doctorCount || dept.activeDoctors} Doctors</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-5 mt-5 border-t border-slate-100">
                <Link
                  href={`/patient/appointments?department=${encodeURIComponent(dept.code)}`}
                  className="flex-1"
                >
                  <Button size="sm" className="w-full text-xs">
                    Book Consult
                  </Button>
                </Link>
                <Link href={`/hospital/3d`} className="shrink-0" title="Locate in 3D Campus">
                  <Button variant="outline" size="sm" className="text-xs px-2.5">
                    <Box className="w-4 h-4 text-[#1769E0]" />
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

export default DepartmentsSection;
