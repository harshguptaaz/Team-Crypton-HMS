'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Bed, UserCheck, Stethoscope, ChevronRight } from 'lucide-react';
import { Department } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface DepartmentInfoPanelProps {
  department: Department | null;
  onClose: () => void;
}

export const DepartmentInfoPanel: React.FC<DepartmentInfoPanelProps> = ({
  department,
  onClose,
}) => {
  if (!department) return null;

  const occupancyRate = Math.round(
    ((department.totalBeds - department.availableBeds) / department.totalBeds) * 100
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-96 z-30"
      >
        <div className="bg-white/95 backdrop-blur-xl border border-[#DCE8F5] rounded-2xl shadow-2xl p-5 text-[#10233F] relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: department.color || '#1769E0' }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-3 mt-1 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ backgroundColor: `${department.color}18`, color: department.color }}
            >
              <Activity className="w-6 h-6" />
            </div>
            <div className="pr-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {department.code} • Floor {department.floor}
                </span>
                <Badge
                  variant={
                    department.status === 'Active'
                      ? 'success'
                      : department.status === 'Busy'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {department.status}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-[#10233F] leading-tight">
                {department.name}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 mb-4 line-clamp-2">
            {department.description}
          </p>

          <div className="bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl p-3 mb-4">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#1769E0]" /> Bed Availability
              </span>
              <span className="font-bold text-[#10233F]">
                {department.availableBeds} / {department.totalBeds} Free
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  occupancyRate > 90
                    ? 'bg-rose-500'
                    : occupancyRate > 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${occupancyRate}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>{occupancyRate}% Occupancy</span>
              <span>
                {department.availableBeds > 0 ? 'Accepting Admissions' : 'Near Capacity'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#1769E0] shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Head Doctor</div>
                <div className="font-bold text-slate-800 truncate">
                  {department.headDoctor || 'Dr. Specialist'}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 uppercase">Staff on Duty</div>
                <div className="font-bold text-slate-800">
                  {department.activeDoctors} Specialists
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <Link
              href={`/patient/appointments?department=${encodeURIComponent(department.code)}`}
              className="flex-1"
            >
              <Button size="sm" className="w-full text-xs">
                Book Consultation
              </Button>
            </Link>
            <Link href={`/hospital/departments#${department.id}`} className="shrink-0">
              <Button variant="outline" size="sm" className="text-xs px-2.5">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
