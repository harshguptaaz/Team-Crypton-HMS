import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'MediCare Hospital — Interactive 3D Digital Hospital Ecosystem',
  description: 'Next-generation hospital management system featuring interactive 3D digital twin, real-time operating theatre monitoring, department analytics, and multi-role healthcare portals.',
  keywords: 'Hospital Management System, 3D Digital Twin, Healthcare SaaS, Telemetry, Operating Theatre, Patient Portal, Doctor Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F9FF] text-[#10233F] antialiased selection:bg-[#2587FF] selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
