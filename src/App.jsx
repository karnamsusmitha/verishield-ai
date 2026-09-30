import React, { useState } from 'react';
import Header from './components/Header';
import EmergencyBanner from './components/EmergencyBanner';
import TabSelector from './components/TabSelector';
import VoiceCloneDetector from './components/VoiceCloneDetector';
import DeepfakeFaceScanner from './components/DeepfakeFaceScanner';
import PhishingSMSCheck from './components/PhishingSMSCheck';
import LiveMicGuardian from './components/LiveMicGuardian';
import { Shield, Lock, Activity, CheckCircle2, HeartHandshake, PhoneCall } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('voice');
  const [isSeniorMode, setIsSeniorMode] = useState(false);

  return (
    <div className={cn(
      "min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black transition-all",
      isSeniorMode && "text-lg bg-[#070A0F]"
    )}>
      {/* 1. Top Emergency Helpline Banner */}
      <EmergencyBanner isSeniorMode={isSeniorMode} />

      {/* 2. Top Navigation Header */}
      <Header isSeniorMode={isSeniorMode} setIsSeniorMode={setIsSeniorMode} />

      {/* 3. Operational Mode Tab Selector */}
      <TabSelector 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSeniorMode={isSeniorMode} 
      />

      {/* 4. Active Operational Mode View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'voice' && <VoiceCloneDetector isSeniorMode={isSeniorMode} />}
        {activeTab === 'deepfake' && <DeepfakeFaceScanner isSeniorMode={isSeniorMode} />}
        {activeTab === 'phishing' && <PhishingSMSCheck isSeniorMode={isSeniorMode} />}
        {activeTab === 'live' && <LiveMicGuardian isSeniorMode={isSeniorMode} />}
      </main>

      {/* 5. Footer */}
      <footer className={cn(
        "border-t border-[#1F2937] bg-[#0B0F17] py-8 text-slate-400 mt-12 transition-all",
        isSeniorMode && "py-10 border-t-2 border-amber-400/40 text-base"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className={cn("font-bold text-white", isSeniorMode && "text-xl text-amber-200")}>
                VeriShield AI • Multimodal Scam & Deepfake Defense
              </p>
              <p className={cn("text-xs text-slate-400", isSeniorMode && "text-base text-slate-300 font-medium")}>
                {isSeniorMode 
                  ? "Designed for seniors and family protection against AI phone scams." 
                  : "On-device zero-trust biometrics & real-time spectral vocoder verification."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <div className="flex items-center space-x-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>National Cyber Crime Portal 1930 Integrated</span>
            </div>
            <span className="text-slate-700">•</span>
            <div className="flex items-center space-x-1 text-cyan-400">
              <Lock className="w-3.5 h-3.5" />
              <span>End-to-End Privacy Guaranteed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
