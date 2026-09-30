import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import AudioVisualizer from './AudioVisualizer';
import { 
  Radio, 
  Mic, 
  Square, 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Volume2, 
  Lock, 
  AlertTriangle,
  Sparkles,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function LiveMicGuardian({ isSeniorMode }) {
  const [isGuardianActive, setIsGuardianActive] = useState(true);
  const [threatDetected, setThreatDetected] = useState(false);
  const [logEvents, setLogEvents] = useState([
    { id: 1, time: '19:34:10', event: 'Mic Stream Listening • 44.1 kHz', status: 'safe' },
    { id: 2, time: '19:34:15', event: 'Background Noise Subtracted', status: 'safe' },
    { id: 3, time: '19:34:22', event: 'Acoustic Formant Matching Normal', status: 'safe' }
  ]);

  // Simulate real-time stream threat detection interval
  useEffect(() => {
    if (!isGuardianActive) return;

    const timer = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const chance = Math.random();
      if (chance > 0.75) {
        setThreatDetected(true);
        setLogEvents(prev => [
          { id: Date.now(), time: now, event: '⚠️ AI VOCAL SYNTHESIS PATTERN DETECTED!', status: 'critical' },
          ...prev.slice(0, 5)
        ]);
      } else {
        setThreatDetected(false);
        setLogEvents(prev => [
          { id: Date.now(), time: now, event: 'Live Acoustic Stream Verified Clean', status: 'safe' },
          ...prev.slice(0, 5)
        ]);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isGuardianActive]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#10B981', '#06B6D4']
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className={cn(
        "p-6 rounded-2xl bg-[#111827] border border-[#1F2937] cyber-card",
        isSeniorMode && "border-amber-400/40 p-8"
      )}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={cn(
              "p-3.5 rounded-xl border text-[#EF4444] shrink-0",
              isGuardianActive ? "bg-red-950/60 border-red-500/50 cyber-glow-crimson animate-pulse" : "bg-slate-800 border-slate-700 text-slate-500"
            )}>
              <Radio className={isSeniorMode ? "w-8 h-8" : "w-6 h-6"} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={cn(
                  "font-extrabold text-white",
                  isSeniorMode ? "text-2xl text-amber-200" : "text-xl"
                )}>
                  {isSeniorMode ? "🔴 Live Phone Call Guardian" : "Live Mic Guardian (Real-Time Audio Stream)"}
                </h2>
                <span className={cn(
                  "px-2.5 py-0.5 rounded text-xs font-mono font-bold border",
                  isGuardianActive ? "bg-red-950 text-red-400 border-red-500/40 animate-pulse" : "bg-slate-800 text-slate-400 border-slate-700"
                )}>
                  {isGuardianActive ? "PROTECTION LIVE" : "PAUSED"}
                </span>
              </div>
              <p className={cn("text-slate-400 mt-1", isSeniorMode ? "text-base text-slate-200" : "text-sm")}>
                {isSeniorMode 
                  ? "Listens continuously to incoming phone calls or voice chats to warn you instantly if a voice is cloned by AI." 
                  : "Continuous real-time voice stream audit for active phone extortion & voice clone mitigation."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGuardianActive(!isGuardianActive)}
            className={cn(
              "px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg active:scale-95 shrink-0",
              isGuardianActive 
                ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30" 
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30",
              isSeniorMode && "text-xl py-4 px-8 ring-2 ring-amber-300"
            )}
          >
            {isGuardianActive ? (
              <>
                <Square className="w-5 h-5 fill-white" />
                <span>{isSeniorMode ? "Pause Call Guardian" : "Stop Guardian Stream"}</span>
              </>
            ) : (
              <>
                <Radio className="w-5 h-5 animate-pulse" />
                <span>{isSeniorMode ? "Activate Call Guardian" : "Start Live Guardian"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* HTML5 Canvas Audio Visualizer Engine */}
      <AudioVisualizer 
        threatMode={threatDetected ? 'critical' : 'safe'} 
        isSeniorMode={isSeniorMode} 
      />

      {/* Grid: Real-Time Threat Log Feed vs Guardian Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real-time Threat Log Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937]">
            <h3 className={cn("font-bold text-slate-300 mb-3 uppercase tracking-wider font-mono", isSeniorMode ? "text-lg text-amber-300" : "text-xs")}>
              {isSeniorMode ? "LIVE ACTIVITY LOG:" : "REAL-TIME ACOUSTIC AUDIT STREAM:"}
            </h3>

            <div className="space-y-2">
              {logEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={cn(
                    "p-3 rounded-lg border flex items-center justify-between font-mono text-xs transition-all",
                    evt.status === 'critical' ? "bg-red-950/60 border-red-500/50 text-red-200" : "bg-[#0B0F17] border-[#1F2937] text-slate-300"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-slate-500 text-[10px]">{evt.time}</span>
                    <span className={evt.status === 'critical' ? "font-bold text-red-300" : ""}>{evt.event}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] uppercase font-bold",
                    evt.status === 'critical' ? "bg-red-600 text-white" : "bg-slate-800 text-emerald-400"
                  )}>
                    {evt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Guardian Defense Panel */}
        <div className="space-y-6">
          <div className={cn(
            "p-6 rounded-2xl border bg-[#111827] cyber-card relative overflow-hidden flex flex-col justify-between h-full",
            threatDetected ? "border-red-500/50 cyber-glow-crimson bg-red-950/20" : "border-cyan-500/40 cyber-glow-cyan",
            isSeniorMode && "p-8 border-2"
          )}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs font-mono font-bold tracking-wider uppercase text-slate-400", isSeniorMode && "text-sm text-amber-300")}>
                  {isSeniorMode ? "GUARDIAN STATUS" : "STREAM DEFENSE KERNEL"}
                </span>
                <span className="text-xs font-mono text-cyan-400">ZERO-TRUST AUDIT</span>
              </div>

              {/* Status Display */}
              <div className="text-center py-6 border-y border-[#1F2937] my-3">
                <div className={cn(
                  "text-3xl font-black tracking-tight",
                  threatDetected ? "text-red-400 animate-pulse" : "text-emerald-400",
                  isSeniorMode && "text-4xl"
                )}>
                  {threatDetected ? "CRITICAL ALERT" : "PROTECTED"}
                </div>
                <div className={cn("text-xs font-mono text-slate-400 mt-2 uppercase", isSeniorMode && "text-base text-slate-200")}>
                  {threatDetected ? "Artificial Voice Signature Detected" : "Microphone Audio Stream Clean"}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-[#1F2937]">
              {threatDetected ? (
                <a
                  href="tel:1930"
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30 transition-colors"
                >
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  <span>{isSeniorMode ? "🚨 Call Helpline 1930 Now" : "Report Threat to Cyber Hotline 1930"}</span>
                </a>
              ) : (
                <button
                  onClick={triggerCelebration}
                  className="w-full py-3 rounded-xl bg-[#10B981] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>{isSeniorMode ? "🎉 Stream Clean & Safe!" : "Celebrate Clean Audio Stream"}</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
