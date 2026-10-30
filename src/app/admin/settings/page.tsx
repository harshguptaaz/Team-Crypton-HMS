'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Settings,
  Shield,
  Bell,
  Box,
  Save,
  CheckCircle2,
  Database,
  Lock,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [hospitalName, setHospitalName] = useState('MediCare Central Hospital');
  const [emergencyPhone, setEmergencyPhone] = useState('(800) 555-0199');
  const [refreshInterval, setRefreshInterval] = useState('3000');
  const [autoRotate3D, setAutoRotate3D] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout
      role="admin"
      title="System Architecture & Settings"
      subtitle="Configure hospital metadata, emergency hotlines, telemetry stream frequencies, and 3D twin parameters"
    >
      <div className="max-w-4xl space-y-6">
        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Hospital configuration parameters updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Metadata */}
          <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#10233F] flex items-center gap-2 pb-3 border-b border-[#DCE8F5]">
              <Globe className="w-5 h-5 text-[#1769E0]" />
              Hospital Institution Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Official Name</label>
                <Input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Emergency Dispatch Hotline</label>
                <Input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 3D Digital Twin Settings */}
          <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#10233F] flex items-center gap-2 pb-3 border-b border-[#DCE8F5]">
              <Box className="w-5 h-5 text-[#1769E0]" />
              3D Digital Twin & Telemetry Parameters
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-[#F5F9FF] rounded-2xl border border-[#DCE8F5]/80">
                <div>
                  <div className="font-bold text-slate-800">Auto-Rotate Campus Camera</div>
                  <div className="text-slate-500 text-[11px]">Enable gentle continuous orbit when user is idle</div>
                </div>
                <input
                  type="checkbox"
                  checked={autoRotate3D}
                  onChange={(e) => setAutoRotate3D(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1769E0] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Operating Theatre Vitals Telemetry Refresh (ms)
                </label>
                <Input
                  type="number"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Security & Access */}
          <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#10233F] flex items-center gap-2 pb-3 border-b border-[#DCE8F5]">
              <Shield className="w-5 h-5 text-emerald-600" />
              Compliance & Security Governance
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>HIPAA Privacy Protocol:</span>
                <span className="font-bold text-emerald-600">Active & Enforced</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Database Encryption:</span>
                <span className="font-bold text-slate-800">AES-256 At Rest</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Role-Based Access Control (RBAC):</span>
                <span className="font-bold text-[#1769E0]">Strict (5 Tier Roles)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="lg">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration Settings
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
