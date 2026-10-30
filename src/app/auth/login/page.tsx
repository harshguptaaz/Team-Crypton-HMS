'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Activity,
  User,
  Stethoscope,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'patient';

  const [role, setRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // Pre-fill demo credentials on role change
  useEffect(() => {
    switch (role) {
      case 'patient':
        setEmail('john.doe@example.com');
        setPassword('password123');
        break;
      case 'doctor':
        setEmail('sarah.jenkins@medicare.com');
        setPassword('password123');
        break;
      case 'staff':
        setEmail('staff.maria@medicare.com');
        setPassword('password123');
        break;
      case 'admin':
        setEmail('admin@medicare.com');
        setPassword('password123');
        break;
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        router.push(`/${role}/dashboard`);
      } else {
        setError('Invalid credentials for selected role. Please check details.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleConfigs = [
    { id: 'patient', label: 'Patient', icon: <User className="w-4 h-4" /> },
    { id: 'doctor', label: 'Doctor', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'staff', label: 'Staff', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F5F9FF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
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
          Authorized Portal Sign In
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Select your healthcare persona to access your protected workspace
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-[#DCE8F5] shadow-xl">
          {/* Role Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#F5F9FF] border border-[#DCE8F5] rounded-2xl mb-6">
            {roleConfigs.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                  role === r.id
                    ? 'bg-[#1769E0] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Demo Credentials Info */}
          <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
            <div>
              <span className="font-bold">1-Click Demo Profile:</span>
              <div className="text-[11px] text-blue-700 font-mono mt-0.5">{email}</div>
            </div>
            <span className="text-[10px] bg-blue-200 text-blue-800 px-2 py-0.5 rounded font-bold uppercase">
              Pre-filled
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hospital.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-xs text-[#1769E0] hover:underline font-semibold">
                  Forgot?
                </a>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : `Sign in as ${role.toUpperCase()}`}
              </Button>
            </div>
          </form>

          {/* Registration link */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link
              href={
                role === 'doctor'
                  ? '/auth/doctor-signup'
                  : role === 'staff'
                  ? '/auth/staff-signup'
                  : '/auth/patient-signup'
              }
              className="text-[#1769E0] font-bold hover:underline"
            >
              Register as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F5F9FF]">
          <div className="w-8 h-8 border-4 border-[#1769E0] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
