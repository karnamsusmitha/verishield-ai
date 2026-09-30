import React from 'react';
import { Mic, Video, MessageSquare, Radio, Shield, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export const TABS = [
  {
    id: 'voice',
    label: 'Voice Clone Detector',
    shortLabel: 'Voice Clone',
    seniorLabel: '🎙️ Check Fake Voice Call',
    subtitle: 'Audio Analysis & AI Synthesizer Scan',
    icon: Mic,
    color: 'emerald',
    badge: 'Audio AI',
  },
  {
    id: 'deepfake',
    label: 'Deepfake Face Scanner',
    shortLabel: 'Face Scanner',
    seniorLabel: '📹 Check Fake Video / Photo',
    subtitle: 'Video Biometrics & GAN Face Check',
    icon: Video,
    color: 'cyan',
    badge: 'Vision AI',
  },
  {
    id: 'phishing',
    label: 'Phishing & SMS Check',
    shortLabel: 'SMS & Text',
    seniorLabel: '💬 Check Scam Text & Links',
    subtitle: 'Scam Link & Urgency Analyzer',
    icon: MessageSquare,
    color: 'amber',
    badge: 'Text & URL',
  },
  {
    id: 'live',
    label: 'Live Mic Guardian',
    shortLabel: 'Live Mic',
    seniorLabel: '🔴 Live Voice Call Guard',
    subtitle: 'Real-Time Audio Stream Defense',
    icon: Radio,
    color: 'crimson',
    badge: 'LIVE 24/7',
  }
];

export default function TabSelector({ activeTab, setActiveTab, isSeniorMode }) {
  return (
    <div className={cn(
      "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2",
      isSeniorMode && "pt-8"
    )}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative p-4 rounded-xl border transition-all text-left flex flex-col justify-between overflow-hidden",
                "bg-[#111827] border-[#1F2937] hover:border-slate-600",
                isActive && tab.id === 'voice' && "border-[#10B981] bg-[#10B981]/10 cyber-glow-emerald",
                isActive && tab.id === 'deepfake' && "border-[#06B6D4] bg-[#06B6D4]/10 cyber-glow-cyan",
                isActive && tab.id === 'phishing' && "border-[#F59E0B] bg-[#F59E0B]/10 cyber-glow-amber",
                isActive && tab.id === 'live' && "border-[#EF4444] bg-[#EF4444]/10 cyber-glow-crimson",
                isSeniorMode && "p-5 border-2",
                isSeniorMode && isActive && "ring-2 ring-amber-400 bg-slate-900"
              )}
            >
              {/* Header row in tab card */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className={cn(
                  "p-2.5 rounded-lg transition-colors flex items-center justify-center",
                  tab.id === 'voice' && (isActive ? "bg-[#10B981] text-slate-950" : "bg-[#10B981]/10 text-[#10B981]"),
                  tab.id === 'deepfake' && (isActive ? "bg-[#06B6D4] text-slate-950" : "bg-[#06B6D4]/10 text-[#06B6D4]"),
                  tab.id === 'phishing' && (isActive ? "bg-[#F59E0B] text-slate-950" : "bg-[#F59E0B]/10 text-[#F59E0B]"),
                  tab.id === 'live' && (isActive ? "bg-[#EF4444] text-white" : "bg-[#EF4444]/10 text-[#EF4444]"),
                  isSeniorMode && "p-3"
                )}>
                  <Icon className={cn("w-5 h-5", isSeniorMode && "w-7 h-7")} />
                </div>

                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase",
                  tab.id === 'live' ? "bg-red-950/80 text-red-400 border border-red-500/40 animate-pulse" : "bg-slate-800 text-slate-300 border border-slate-700",
                  isSeniorMode && "text-xs px-2.5 py-1 text-white bg-slate-900 border-amber-400/40"
                )}>
                  {tab.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className={cn(
                  "font-bold text-white transition-colors group-hover:text-cyan-300",
                  isSeniorMode ? "text-xl text-amber-200" : "text-base",
                  isActive && !isSeniorMode && "text-cyan-200"
                )}>
                  {isSeniorMode ? tab.seniorLabel : tab.label}
                </h3>
                <p className={cn(
                  "text-slate-400 mt-0.5 line-clamp-1",
                  isSeniorMode ? "text-sm text-slate-200 font-medium" : "text-xs text-slate-400"
                )}>
                  {tab.subtitle}
                </p>
              </div>

              {/* Active Indicator Bar */}
              {isActive && (
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 h-1",
                  tab.id === 'voice' && "bg-[#10B981]",
                  tab.id === 'deepfake' && "bg-[#06B6D4]",
                  tab.id === 'phishing' && "bg-[#F59E0B]",
                  tab.id === 'live' && "bg-[#EF4444]"
                )} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
