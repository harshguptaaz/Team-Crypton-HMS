import React from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { HospitalStatsSection } from '@/components/landing/HospitalStatsSection';
import { DepartmentsSection } from '@/components/landing/DepartmentsSection';
import { ServicesSection } from '@/components/landing/ServicesSection';
import { DoctorsSection } from '@/components/landing/DoctorsSection';
import { HospitalStatusSection } from '@/components/landing/HospitalStatusSection';
import { LiveHospitalMapSection } from '@/components/landing/LiveHospitalMapSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { Footer } from '@/components/footer/Footer';
import { EmergencyFloatingButton } from '@/components/common/EmergencyFloatingButton';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection />
        <HospitalStatsSection />
        <DepartmentsSection />
        <ServicesSection />
        <DoctorsSection />
        <HospitalStatusSection />
        <LiveHospitalMapSection />
        <CtaSection />
      </main>

      {/* 24/7 Emergency Dispatch Floating Trigger */}
      <EmergencyFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
