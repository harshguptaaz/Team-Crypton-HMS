'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { EmergencyFloatingButton } from '@/components/common/EmergencyFloatingButton';
import { mockOperatingTheatres } from '@/data/mockData';
import { OperatingTheatre } from '@/types';
import {
  HeartPulse,
  Activity,
  Timer,
  UserCheck,
  Stethoscope,
  ShieldCheck,
  Radio,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Wind,
  Thermometer
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function LiveOTPage() {
  const [selectedOT, setSelectedOT] = useState<OperatingTheatre>(mockOperatingTheatres[0]);
  const [heartRate, setHeartRate] = useState<number>(selectedOT.patientVitals?.heartRate || 74);
  const [spo2, setSpo2] = useState<number>(selectedOT.patientVitals?.spo2 || 99);
  const [elapsedSecs, setElapsedSecs] = useState<number>(5400); // 1h 30m

  // Simulate dynamic ECG vitals jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => Math.min(95, Math.max(65, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSpo2((prev) => Math.min(100, Math.max(97, prev + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
      setElapsedSecs((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const formatElapsedTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#071326] text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold mb-2 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE SURGICAL SUITE TELEMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Operating Theatre Command Console
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Real-time physiological vitals streaming and surgical workflow monitoring across all hospital suites.
            </p>
          </div>

          {/* OT Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {mockOperatingTheatres.map((ot) => (
              <button
                key={ot.id}
                onClick={() => {
                  setSelectedOT(ot);
                  if (ot.patientVitals) {
                    setHeartRate(ot.patientVitals.heartRate);
                    setSpo2(ot.patientVitals.spo2);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  selectedOT.id === ot.id
                    ? 'bg-[#1769E0] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    ot.status === 'In Use' ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'
                  }`}
                />
                <span>{ot.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected OT Main Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: ECG Monitor & Physiological Biometrics (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Real-time Cardiac Monitor Display */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                    <HeartPulse className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Lead II Electrocardiogram (ECG)</h3>
                    <p className="text-xs text-slate-400">Channel 1 • Frequency 500Hz • Gain 10mm/mV</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    SINUS RHYTHM • STABLE
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Waveform */}
              <div className="relative h-44 my-4 bg-black/60 rounded-2xl overflow-hidden border border-slate-800 flex items-center">
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:20px_20px]" />

                <svg className="w-full h-full" viewBox="0 0 1000 150" preserveAspectRatio="none">
                  {/* ECG path wave */}
                  <path
                    d="M0,75 L100,75 L120,70 L130,80 L140,75 L160,75 L170,40 L180,120 L195,20 L210,95 L220,75 L250,75 L280,60 L310,75 L450,75 L470,70 L480,80 L490,75 L510,75 L520,40 L530,120 L545,20 L560,95 L570,75 L600,75 L630,60 L660,75 L750,75 L770,70 L780,80 L790,75 L810,75 L820,40 L830,120 L845,20 L860,95 L870,75 L900,75 L930,60 L960,75 L1000,75"
                    fill="none"
                    stroke="#22C55E"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-ecg"
                  />
                </svg>
              </div>

              {/* Patient Vitals Numbers Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {/* Heart Rate */}
                <div className="bg-black/40 rounded-2xl p-4 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Heart Rate (BPM)</span>
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-rose-400 mt-2 font-mono">
                    {heartRate}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Normal: 60-100</div>
                </div>

                {/* Blood Pressure */}
                <div className="bg-black/40 rounded-2xl p-4 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Blood Pressure (NIBP)</span>
                    <Activity className="w-4 h-4 text-[#2587FF]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#2587FF] mt-2 font-mono">
                    {selectedOT.patientVitals?.bloodPressure || '120/80'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">MAP: 93 mmHg</div>
                </div>

                {/* SpO2 */}
                <div className="bg-black/40 rounded-2xl p-4 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Oxygen Saturation</span>
                    <Wind className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400 mt-2 font-mono">
                    {spo2}<span className="text-xl">%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">FiO2: 40%</div>
                </div>

                {/* Temperature */}
                <div className="bg-black/40 rounded-2xl p-4 border border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Core Body Temp</span>
                    <Thermometer className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-amber-400 mt-2 font-mono">
                    {selectedOT.patientVitals?.temperature || 36.8}<span className="text-xl">°C</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Normothermic</div>
                </div>
              </div>
            </div>

            {/* Surgical Workflow & Progress */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  <Timer className="w-5 h-5 text-[#2587FF]" />
                  Active Surgical Procedure
                </h4>
                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold">
                  {selectedOT.currentProcedure || 'Cardiovascular Coronary Bypass'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Elapsed Duration</div>
                  <div className="text-xl font-mono font-bold text-white mt-1">
                    {formatElapsedTime(elapsedSecs)}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Estimated End Time</div>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                    14:45 EST (~45 min)
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 uppercase text-[10px] font-bold">Anaesthesia Level</div>
                  <div className="text-xl font-mono font-bold text-[#2587FF] mt-1">
                    BIS Index 48 (General)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Surgical Team & Theatre Specs (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Theatre Info Card */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-bold text-white text-base">{selectedOT.name}</h4>
                <Badge variant={selectedOT.status === 'In Use' ? 'danger' : 'success'}>
                  {selectedOT.status}
                </Badge>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-bold text-white">{selectedOT.department}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-white">Floor {selectedOT.floor}, Surgical Wing</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400">HEPA Filtration:</span>
                  <span className="font-bold text-emerald-400">Laminar Airflow Nominal</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Surgical Robot:</span>
                  <span className="font-bold text-[#2587FF]">Da Vinci Xi Online</span>
                </div>
              </div>
            </div>

            {/* Surgical Team on Duty */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2587FF]" />
                Surgical Team Deployed
              </h4>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1769E0]/20 text-[#2587FF] flex items-center justify-center font-bold text-xs">
                    LS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{selectedOT.leadSurgeon}</div>
                    <div className="text-[10px] text-slate-400">Lead Attending Surgeon</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    AN
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Dr. Robert Chen, MD</div>
                    <div className="text-[10px] text-slate-400">Chief Anesthesiologist</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                    SN
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Nurse Sarah Jenkins, BSN</div>
                    <div className="text-[10px] text-slate-400">Senior Scrub Nurse</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EmergencyFloatingButton />
      <Footer />
    </div>
  );
}
