'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, ShieldAlert, Mail, Lock, Building } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/auth';

export default function StaffSignupPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    staffRole: 'Senior Nurse',
    department: 'Cardiology Ward',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await register({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        password: formData.password,
        role: 'staff',
      });
      router.push('/staff/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#2587FF] flex items-center justify-center text-white shadow-md">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#0B1F3A]">
            Medi<span className="text-[#1769E0]">Care</span>
          </span>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0B1F3A]">
          Hospital Staff & Nursing Enrollment
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Ward management, patient telemetry monitoring, bed allocations & dispensary
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#DCE8F5] shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Staff Member Name</label>
              <Input
                type="text"
                required
                placeholder="Maria Santos, RN"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Work Email</label>
              <Input
                type="email"
                required
                placeholder="m.santos@medicare.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Station</label>
                <select
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="Cardiology Ward">Cardiology Ward</option>
                  <option value="Emergency & Triage">Emergency & Triage</option>
                  <option value="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</option>
                  <option value="Pharmacy Dispensary">Pharmacy Dispensary</option>
                  <option value="Pathology Laboratory">Pathology Laboratory</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                <select
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
                  value={formData.staffRole}
                  onChange={(e) => setFormData({ ...formData, staffRole: e.target.value })}
                >
                  <option value="Senior Nurse">Charge Nurse</option>
                  <option value="Triage Officer">Triage Officer</option>
                  <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                  <option value="Lab Technician">Lab Technician</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm</label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full bg-amber-600 hover:bg-amber-700" disabled={loading}>
                {loading ? 'Registering Staff...' : 'Complete Staff Enrollment'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link href="/auth/login?role=staff" className="text-[#1769E0] font-bold hover:underline">
              Staff Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
