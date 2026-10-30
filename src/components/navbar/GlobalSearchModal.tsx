'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Stethoscope, Building2, ArrowRight, X } from 'lucide-react';
import { mockDoctors, mockDepartments } from '@/data/mockData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredDoctors = mockDoctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialization.toLowerCase().includes(query.toLowerCase()) ||
      d.department.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredDepartments = mockDepartments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(query.toLowerCase()) ||
      dept.description.toLowerCase().includes(query.toLowerCase()) ||
      dept.code.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-navy/40 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DCE8F5] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-[#DCE8F5] bg-[#F5F9FF]">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search doctors, departments, medical services, records..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#10233F] placeholder-slate-400 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded shadow-xs">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm font-medium">Type a doctor's name, department, or procedure</p>
              <p className="text-xs text-slate-400 mt-1">Example: "Cardiology", "Dr. Sarah", "Radiology"</p>
            </div>
          ) : (
            <>
              {filteredDoctors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#1769E0]" /> Doctors & Specialists
                  </h4>
                  <div className="space-y-1.5">
                    {filteredDoctors.map((doc) => (
                      <Link
                        key={doc.id}
                        href={`/patient/appointments?doctor=${encodeURIComponent(doc.id)}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="text-sm font-semibold text-[#10233F] group-hover:text-[#1769E0]">
                              {doc.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {doc.specialization} • {doc.department}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1769E0] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredDepartments.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#2587FF]" /> Departments & Wards
                  </h4>
                  <div className="space-y-1.5">
                    {filteredDepartments.map((dept) => (
                      <Link
                        key={dept.id}
                        href={`/hospital/departments#${dept.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F9FF] border border-transparent hover:border-[#DCE8F5] transition-all group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#10233F] group-hover:text-[#1769E0]">
                            {dept.name} <span className="text-xs text-slate-400 font-normal">({dept.code})</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            Floor {dept.floor} • {dept.availableBeds} beds available
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1769E0] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="px-4 py-2.5 bg-slate-50 border-t border-[#DCE8F5] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Quick: <Link href="/hospital/3d" onClick={onClose} className="text-[#1769E0] font-semibold hover:underline">3D Digital Twin</Link></span>
            <span>•</span>
            <span><Link href="/hospital/live-ot" onClick={onClose} className="text-[#1769E0] font-semibold hover:underline">Live OT</Link></span>
            <span>•</span>
            <span><Link href="/hospital/live-status" onClick={onClose} className="text-[#1769E0] font-semibold hover:underline">Hospital Vitals</Link></span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">Close</button>
        </div>
      </div>
    </div>
  );
};
