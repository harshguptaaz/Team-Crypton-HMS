'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Search,
  Menu,
  X
} from 'lucide-react';
import { LoginDropdown } from './LoginDropdown';
import { NotificationsDropdown } from './NotificationsDropdown';
import { GlobalSearchModal } from './GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: '3D Campus', href: '/hospital/3d', badge: '3D' },
    { label: 'Departments', href: '/hospital/departments' },
    { label: 'Live OT', href: '/hospital/live-ot', pulse: true },
    { label: 'Hospital Vitals', href: '/hospital/live-status' },
    { label: 'Doctors', href: '/#doctors' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-2.5 shadow-sm'
            : 'bg-white/80 backdrop-blur-md border-b border-[#DCE8F5]/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1769E0] to-[#2587FF] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#0B1F3A]">
                  Medi<span className="text-[#1769E0]">Care</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#EAF3FF] text-[#1769E0] px-1.5 py-0.5 rounded border border-[#DCE8F5]">
                  HOSPITAL
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Digital Healthcare Ecosystem
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F9FF] border border-[#DCE8F5] rounded-full p-1 shadow-xs">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#1769E0] shadow-xs'
                      : 'text-slate-600 hover:text-[#1769E0] hover:bg-white/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge && (
                      <span className="text-[9px] bg-[#1769E0] text-white px-1.5 py-0.2 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.pulse && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-500 bg-[#F5F9FF] hover:bg-[#EAF3FF] hover:text-[#1769E0] border border-[#DCE8F5] text-xs transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline text-slate-400">Search</span>
              <kbd className="hidden sm:inline-block text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1">
                ⌘K
              </kbd>
            </button>

            <NotificationsDropdown />
            <LoginDropdown />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DCE8F5] bg-white px-4 py-4 space-y-2 animate-fade-in shadow-xl">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold ${
                  pathname === item.href
                    ? 'bg-[#EAF3FF] text-[#1769E0]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] bg-[#1769E0] text-white px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </header>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
