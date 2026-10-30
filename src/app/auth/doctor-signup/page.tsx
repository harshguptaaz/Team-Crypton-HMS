'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, Stethoscope, Mail, Lock, Award, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/auth';

export default function DoctorSignupPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    licenseNumber: '',
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
        name: `Dr. ${formData.name}`,
        email: formData.email,
        department: formData.department,
        password: formData.password,
        role: 'doctor',
      });
      router.push('/doctor/dashboard');
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
          Physician Credential Registration
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Join our clinical network and manage patient rounds & surgical workflows
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Name</label>
              <Input
                type="text"
                required
                placeholder="Marcus Vance, MD"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hospital Email</label>
              <Input
                type="email"
                required
                placeholder="m.vance@medicare.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <select
                  className="w-full px-3 py-2 text-xs bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medical License ID</label>
                <Input
                  type="text"
                  placeholder="MED-88492"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
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
              <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? 'Submitting Application...' : 'Register Physician Profile'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Already registered physician?{' '}
            <Link href="/auth/login?role=doctor" className="text-[#1769E0] font-bold hover:underline">
              Doctor Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
