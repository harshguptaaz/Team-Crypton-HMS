'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, HeartPulse, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: 'urgent' | 'info' | 'success';
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Emergency Trauma Code Red',
    desc: 'Ambulance incoming to Bay 3 with acute coronary syndrome.',
    time: '2 mins ago',
    type: 'urgent',
  },
  {
    id: '2',
    title: 'Operating Theatre 2 Ready',
    desc: 'Cardiovascular bypass surgery prep complete.',
    time: '14 mins ago',
    type: 'info',
  },
  {
    id: '3',
    title: 'Lab Pathology Verified',
    desc: 'Blood panel & cardiac enzymes finalized.',
    time: '45 mins ago',
    type: 'success',
  },
];

export const NotificationsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => setNotifications([]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-[#1769E0] hover:bg-[#EAF3FF] transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2.5 w-80 bg-white rounded-2xl shadow-2xl border border-[#DCE8F5] p-3 z-50 text-[#10233F]"
          >
            <div className="flex items-center justify-between px-2 pb-2 border-b border-[#DCE8F5]">
              <div className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-[#1769E0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#10233F]">
                  Hospital Telemetry Alerts
                </span>
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 py-1">
              {notifications.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  All systems operating normally. No active alerts.
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-2 hover:bg-[#F5F9FF] rounded-xl transition-colors">
                    <div className="flex items-start gap-2.5">
                      {n.type === 'urgent' ? (
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      ) : n.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      ) : (
                        <Clock className="w-4 h-4 text-[#1769E0] shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-800">{n.title}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 font-semibold">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-[#DCE8F5] text-center">
              <Link
                href="/hospital/live-status"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-[#1769E0] hover:underline"
              >
                View Live Hospital Status Console →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
