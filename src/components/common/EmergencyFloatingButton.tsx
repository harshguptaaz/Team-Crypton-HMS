'use client';

import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, HeartPulse, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const EmergencyFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-2xl shadow-red-500/40 ring-4 ring-red-400/30 transition-all cursor-pointer group"
          aria-label="Emergency Services Hotline"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <PhoneCall className="w-5 h-5 text-white animate-bounce group-hover:rotate-12 transition-transform" />
          <span className="text-sm tracking-wide font-extrabold uppercase">
            Emergency 911
          </span>
        </motion.button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="24/7 Emergency & Trauma Command"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-900 text-sm">Life-Threatening Emergency?</h4>
              <p className="text-xs text-red-700 mt-1 leading-relaxed">
                If you or someone near you requires immediate resuscitation, chest pain intervention, or trauma care, call our direct priority dispatch line immediately.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:911"
              className="flex items-center justify-between p-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-5 h-5" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-red-200">National Dispatch</div>
                  <div>Call 911 / 108</div>
                </div>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Toll Free</span>
            </a>

            <a
              href="tel:+18005550199"
              className="flex items-center justify-between p-3.5 bg-[#0B1F3A] hover:bg-[#10233F] text-white rounded-xl font-bold text-sm shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <HeartPulse className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-300">MediCare Trauma Desk</div>
                  <div>(800) 555-0199</div>
                </div>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Priority</span>
            </a>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500" /> Emergency Entrance:
              </span>
              <span className="font-bold text-slate-800">Gate 3, North Wing Boulevard</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Ambulance Fleet on Campus:</span>
              <span className="font-bold text-emerald-600">4 Ready for Immediate Dispatch</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Trauma Bays Available:</span>
              <span className="font-bold text-emerald-600">6 / 8 Bays Free</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close Window
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmergencyFloatingButton;
