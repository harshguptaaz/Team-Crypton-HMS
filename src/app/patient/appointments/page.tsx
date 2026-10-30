'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  Clock,
  Stethoscope,
  Video,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Filter
} from 'lucide-react';
import { mockAppointments, mockDoctors } from '@/data/mockData';
import { Appointment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Completed' | 'Cancelled'>('All');

  // New Appointment Form State
  const [doctorId, setDoctorId] = useState(mockDoctors[0].id);
  const [date, setDate] = useState('2026-09-30');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState<'In-Person' | 'Telehealth'>('In-Person');
  const [reason, setReason] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = mockDoctors.find((d) => d.id === doctorId);
    if (!doc) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'PT-1002',
      patientName: 'John Doe',
      doctorId: doc.id,
      doctorName: doc.name,
      department: doc.department,
      date,
      time,
      status: 'Scheduled',
      type,
      reason: reason || 'General medical follow-up',
    };

    setAppointments([newApt, ...appointments]);
    setIsModalOpen(false);
    setReason('');
  };

  const handleCancel = (id: string) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
  };

  const filteredAppointments = appointments.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  return (
    <DashboardLayout
      role="patient"
      title="My Appointments & Consultations"
      subtitle="Schedule, reschedule, or join video telehealth consultations"
    >
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Scheduled', 'Completed', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === st
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-[#F5F9FF]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Book Consultation
          </Button>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#DCE8F5] text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#1769E0]" />
              <h4 className="text-sm font-bold text-slate-700">No appointments found</h4>
              <p className="text-xs text-slate-400 mt-1">Select another filter or book a new consult.</p>
            </div>
          ) : (
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-[#DCE8F5] p-5 shadow-xs hover:border-[#1769E0]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold shrink-0">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#10233F]">{apt.doctorName}</h4>
                      <Badge
                        variant={
                          apt.status === 'Scheduled'
                            ? 'primary'
                            : apt.status === 'Completed'
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {apt.status}
                      </Badge>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {apt.type}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {apt.department} • Reason: <span className="font-medium text-slate-700">{apt.reason}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-[#1769E0] mt-2">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {apt.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {apt.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {apt.status === 'Scheduled' && (
                    <>
                      {apt.type === 'Telehealth' ? (
                        <Button size="sm">
                          <Video className="w-3.5 h-3.5 mr-1" /> Launch Video
                        </Button>
                      ) : (
                        <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
                          Room 304, Wing B
                        </span>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-rose-600 hover:bg-rose-50"
                        onClick={() => handleCancel(apt.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Physician Consultation"
        size="md"
      >
        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Specialist Doctor
            </label>
            <select
              className="w-full px-3 py-2 text-xs bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              {mockDoctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — {doc.specialization} ({doc.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
              <Input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
              <select
                className="w-full px-3 py-2 text-xs bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:30 PM">03:30 PM</option>
                <option value="05:00 PM">05:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('In-Person')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  type === 'In-Person'
                    ? 'bg-[#1769E0] text-white border-[#1769E0]'
                    : 'bg-[#F5F9FF] border-[#DCE8F5] text-slate-600'
                }`}
              >
                In-Person Hospital Visit
              </button>
              <button
                type="button"
                onClick={() => setType('Telehealth')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                  type === 'Telehealth'
                    ? 'bg-[#1769E0] text-white border-[#1769E0]'
                    : 'bg-[#F5F9FF] border-[#DCE8F5] text-slate-600'
                }`}
              >
                Encrypted Video Telehealth
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Reason for Visit / Symptoms
            </label>
            <Input
              type="text"
              placeholder="e.g. Chest tightness during exercise, routine cardiology checkup"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Confirm Appointment</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
