import React, { useState } from 'react';
import { PhoneCall, MessageCircle, AlertTriangle, X, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';

export default function EmergencyBanner({ isSeniorMode }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 px-4 py-2.5 rounded-full bg-crimson-600/90 hover:bg-red-600 text-white font-semibold flex items-center space-x-2 shadow-lg shadow-red-500/30 border border-red-400 animate-bounce transition-all",
          isSeniorMode ? "text-base py-3 px-5" : "text-xs"
        )}
      >
        <ShieldAlert className={isSeniorMode ? "w-6 h-6 text-amber-300" : "w-4 h-4"} />
        <span>Cyber Emergency Hotline 1930</span>
      </button>
    );
  }

  return (
    <div className={cn(
      "bg-gradient-to-r from-red-950/90 via-[#111827] to-amber-950/90 border-b border-red-500/30 text-slate-100 py-2.5 px-4 relative z-40 backdrop-blur-md shadow-md",
      isSeniorMode && "py-4 text-lg border-b-2 border-amber-400"
    )}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left message */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className={cn(
            "p-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 shrink-0",
            isSeniorMode ? "p-3" : "p-2"
          )}>
            <AlertTriangle className={cn("animate-pulse text-red-400", isSeniorMode ? "w-6 h-6" : "w-4 h-4")} />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className={cn(
                "font-bold text-red-400 uppercase tracking-wider",
                isSeniorMode ? "text-lg text-amber-300" : "text-xs"
              )}>
                {isSeniorMode ? "⚡ Cyber Emergency Support" : "CYBER CRIME EMERGENCY HELPLINE"}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-red-900/50 text-red-200 border border-red-500/30">
                24/7 TOLL-FREE
              </span>
            </div>
            <p className={cn(
              "text-slate-300",
              isSeniorMode ? "text-base text-white font-medium" : "text-xs text-slate-300"
            )}>
              {isSeniorMode 
                ? "If you suspect a scam or voice fraud, report immediately to stop financial loss." 
                : "Trapped in an active voice extortion or bank fraud scam? Report instantly to National Cyber Crime reporting portal."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 shrink-0">
          <a
            href="tel:1930"
            className={cn(
              "px-4 py-2 rounded-lg font-bold bg-red-600 hover:bg-red-500 text-white flex items-center space-x-2 shadow-lg shadow-red-600/30 transition-all border border-red-400 active:scale-95",
              isSeniorMode ? "text-base py-2.5 px-5 bg-red-600 hover:bg-red-500 text-white ring-2 ring-amber-300" : "text-xs"
            )}
          >
            <PhoneCall className={isSeniorMode ? "w-5 h-5" : "w-3.5 h-3.5"} />
            <span>{isSeniorMode ? "📞 Call 1930 (Free)" : "Call Hotline 1930"}</span>
          </a>

          <a
            href="https://wa.me/?text=Emergency%20Cyber%20Crime%20Incident%20Report"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-4 py-2 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all border border-emerald-400 active:scale-95",
              isSeniorMode ? "text-base py-2.5 px-5 bg-emerald-600" : "text-xs"
            )}
          >
            <MessageCircle className={isSeniorMode ? "w-5 h-5" : "w-3.5 h-3.5"} />
            <span>{isSeniorMode ? "💬 WhatsApp Support" : "WhatsApp Helpline"}</span>
          </a>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Minimize banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
