import React from 'react';
import { ShieldCheck, Activity, Eye, Zap, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Header({ isSeniorMode, setIsSeniorMode }) {
  return (
    <header className={cn(
      "border-b border-[#1F2937] bg-[#111827]/90 backdrop-blur-md sticky top-0 z-30 transition-all",
      isSeniorMode && "border-amber-400/40 bg-[#0B0F17] py-1"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Shield Logo & Branding */}
        <div className="flex items-center space-x-3.5">
          <div className={cn(
            "p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-[#06B6D4] cyber-glow-cyan flex items-center justify-center shrink-0",
            isSeniorMode && "p-3 border-2 border-cyan-400 bg-cyan-900/40"
          )}>
            <ShieldCheck className={cn("text-[#06B6D4]", isSeniorMode ? "w-8 h-8 text-cyan-300" : "w-7 h-7")} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-100 bg-clip-text text-transparent",
                isSeniorMode ? "text-2xl text-white font-black" : "text-xl sm:text-2xl"
              )}>
                VeriShield <span className="text-[#06B6D4]">AI</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                VERIFIED PROTECTED
              </span>
            </div>
            <p className={cn(
              "text-slate-400 tracking-wide font-medium",
              isSeniorMode ? "text-base text-amber-300 font-semibold" : "text-xs"
            )}>
              {isSeniorMode ? "Easy Scam & Fake Voice Protector" : "Multimodal Scam & Deepfake Defense"}
            </p>
          </div>
        </div>

        {/* Center: System Status Pill Badge */}
        <div className="hidden lg:flex items-center justify-center">
          <div className={cn(
            "px-4 py-1.5 rounded-full bg-[#0B0F17] border border-[#1F2937] flex items-center space-x-3 font-mono text-xs shadow-inner",
            isSeniorMode && "border-cyan-400/50 py-2 px-5 text-sm bg-slate-900"
          )}>
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className={cn("text-emerald-400 font-semibold", isSeniorMode && "text-base text-emerald-300")}>
                Engine: Active / v1.4
              </span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className={isSeniorMode ? "text-base text-slate-200" : "text-slate-300"}>Latency: 140ms</span>
            </div>
          </div>
        </div>

        {/* Right: Senior / Easy Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className={cn(
            "flex items-center space-x-3 px-3.5 py-2 rounded-xl border transition-all",
            isSeniorMode 
              ? "bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/40" 
              : "bg-[#0B0F17] border-[#1F2937] text-slate-300 hover:border-slate-700"
          )}>
            <div className="flex flex-col text-right hidden sm:block">
              <span className={cn("font-bold leading-tight", isSeniorMode ? "text-base text-amber-300" : "text-xs text-white")}>
                {isSeniorMode ? "Senior / Easy Mode ON" : "Senior / Easy Mode"}
              </span>
              <span className="text-[10px] text-slate-400">
                {isSeniorMode ? "Large text & extra clarity" : "High Contrast & Larger Text"}
              </span>
            </div>

            <button
              onClick={() => setIsModeSwitching(setIsSeniorMode, !isSeniorMode)}
              role="switch"
              aria-checked={isSeniorMode}
              className={cn(
                "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#0B0F17]",
                isSeniorMode ? "bg-amber-500" : "bg-slate-700"
              )}
            >
              <span className="sr-only">Toggle Senior Mode</span>
              <span
                className={cn(
                  "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[#0B0F17]",
                  isSeniorMode ? "translate-x-5 text-amber-900" : "translate-x-0 text-slate-600"
                )}
              >
                <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}

function setIsModeSwitching(setIsSeniorMode, newValue) {
  setIsSeniorMode(newValue);
}
