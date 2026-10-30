'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Video,
  Users,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function DoctorSchedulePage() {
  const [saved, setSaved] = useState(false);

  const schedule = [
    { day: 'Monday', time: '08:00 - 11:30', duty: 'Cardiology OPD Clinic', room: 'Suite 204', type: 'Consultation' },
    { day: 'Monday', time: '13:00 - 16:30', duty: 'Cardiac Cath Lab Procedures', room: 'OT-1', type: 'Surgical' },
    { day: 'Tuesday', time: '09:00 - 12:00', duty: 'Inpatient CCU Ward Rounds', room: 'Floor 4 CCU', type: 'Rounds' },
    { day: 'Tuesday', time: '14:00 - 17:00', duty: 'Telehealth Consultations', room: 'Virtual Desk', type: 'Telehealth' },
    { day: 'Wednesday', time: '08:00 - 12:00', duty: 'Cardiology OPD Clinic', room: 'Suite 204', type: 'Consultation' },
    { day: 'Wednesday', time: '13:00 - 17:00', duty: 'Department Review & Research', room: 'Faculty Rm 3', type: 'Academic' },
    { day: 'Thursday', time: '08:00 - 14:00', duty: 'Elective Angioplasty Day', room: 'OT-1 & OT-2', type: 'Surgical' },
    { day: 'Friday', time: '09:00 - 13:00', duty: 'Cardiology Follow-ups', room: 'Suite 204', type: 'Consultation' },
    { day: 'Friday', time: '14:30 - 17:00', duty: 'Executive Health Screening', room: 'Suite 101', type: 'Consultation' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout
      role="doctor"
      title="Clinical OPD & Surgical Roster"
      subtitle="Weekly outpatient clinic hours, operating theatre assignments, and telehealth slots"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div>
            <h3 className="font-bold text-sm text-[#10233F]">Weekly Duty Allocation</h3>
            <p className="text-xs text-slate-500">Current Week: Oct 5 - Oct 11, 2026</p>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Schedule Updated!
              </span>
            )}
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1.5" /> Save Roster
            </Button>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs">
          <div className="divide-y divide-slate-100">
            {schedule.map((slot, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FF]/60 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-24 font-bold text-sm text-[#10233F]">{slot.day}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{slot.duty}</span>
                      <Badge
                        variant={
                          slot.type === 'Surgical'
                            ? 'danger'
                            : slot.type === 'Telehealth'
                            ? 'secondary'
                            : slot.type === 'Rounds'
                            ? 'warning'
                            : 'primary'
                        }
                      >
                        {slot.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Location: {slot.room}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="text-xs font-mono font-semibold text-[#1769E0] bg-[#EAF3FF] px-3 py-1 rounded-lg border border-[#DCE8F5]">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {slot.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
