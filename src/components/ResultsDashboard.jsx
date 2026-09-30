import React from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  FileText, 
  PhoneCall, 
  Share2, 
  CheckCircle2, 
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ResultsDashboard({ result, isSeniorMode }) {
  if (!result) return null;

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#3B82F6']
    });
  };

  const isSafe = result.status === 'safe';
  const isCritical = result.status === 'critical';
  const isWarning = result.status === 'warning';

  return (
    <div className={cn(
      "p-6 sm:p-8 rounded-2xl border bg-[#111827] cyber-card transition-all relative overflow-hidden space-y-6",
      isSafe && "border-[#10B981]/50 cyber-glow-emerald bg-[#10B981]/5",
      isWarning && "border-[#F59E0B]/50 cyber-glow-amber bg-[#F59E0B]/5",
      isCritical && "border-[#EF4444]/50 cyber-glow-crimson bg-[#EF4444]/5",
      isSeniorMode && "p-8 border-2"
    )}>
      
      {/* Header Verdict Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-6">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "p-4 rounded-2xl border shrink-0",
            isSafe && "bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981]",
            isWarning && "bg-[#F59E0B]/20 border-[#F59E0B]/50 text-[#F59E0B]",
            isCritical && "bg-[#EF4444]/20 border-[#EF4444]/50 text-[#EF4444]"
          )}>
            {isSafe && <ShieldCheck className="w-8 h-8" />}
            {isWarning && <AlertTriangle className="w-8 h-8" />}
            {isCritical && <ShieldAlert className="w-8 h-8" />}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded border",
                isSafe && "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40",
                isWarning && "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40",
                isCritical && "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40"
              )}>
                {result.badge || result.type}
              </span>
              <span className="text-xs font-mono text-slate-400">File: {result.fileName}</span>
            </div>

            <h3 className={cn("font-extrabold text-white mt-1", isSeniorMode ? "text-2xl text-amber-200" : "text-xl")}>
              {result.title}
            </h3>
          </div>
        </div>

        {/* Big Risk Gauge */}
        <div className="text-right shrink-0">
          <div className={cn(
            "text-5xl font-black font-mono tracking-tight",
            isSafe && "text-[#10B981]",
            isWarning && "text-[#F59E0B]",
            isCritical && "text-[#EF4444]",
            isSeniorMode && "text-6xl"
          )}>
            {result.riskScore}%
          </div>
          <div className={cn("text-xs font-mono text-slate-400 uppercase", isSeniorMode && "text-base text-slate-200 font-semibold")}>
            {isSeniorMode ? "Overall Scam / Deepfake Risk" : "AI Threat Risk Level"}
          </div>
        </div>
      </div>

      {/* Summary Explanation */}
      <div className="space-y-3">
        <h4 className={cn("font-bold text-white text-sm flex items-center gap-2", isSeniorMode && "text-lg text-amber-200")}>
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>{isSeniorMode ? "Summary Analysis Explanation:" : "AI Neural Diagnostic Summary:"}</span>
        </h4>

        <p className={cn("text-slate-200 leading-relaxed bg-[#0B0F17] p-4 rounded-xl border border-[#1F2937]", isSeniorMode ? "text-lg text-white font-medium" : "text-sm font-mono")}>
          {result.summary}
        </p>
      </div>

      {/* Technical Evidence Bullet Points */}
      {result.technicalDetails && (
        <div className="space-y-3">
          <h4 className={cn("font-bold text-white text-sm flex items-center gap-2", isSeniorMode && "text-lg text-amber-200")}>
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{isSeniorMode ? "Evidence & Deep Inspection Findings:" : "Technical Evidence Audit Points:"}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {result.technicalDetails.map((detail, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-xs font-mono text-slate-300">
                <span className="text-cyan-400 font-bold block mb-1">METRIC #{idx + 1}</span>
                <span className={isSeniorMode ? "text-sm text-white font-sans font-medium" : ""}>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-4">
        {isSafe ? (
          <button
            onClick={triggerCelebration}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#10B981] hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{isSeniorMode ? "🎉 Safe Verification Celebration!" : "Celebrate Authentic Verification"}</span>
          </button>
        ) : (
          <a
            href="tel:1930"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-red-600/30 transition-all active:scale-95 border border-red-400"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isSeniorMode ? "🚨 Call Emergency Hotline 1930" : "Report Threat to Cyber Crime Portal 1930"}</span>
          </a>
        )}

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button 
            onClick={() => alert("Audit Report PDF generated & saved!")}
            className="px-4 py-2.5 rounded-xl bg-[#0B0F17] border border-[#1F2937] hover:border-slate-600 text-slate-300 text-xs font-mono font-semibold flex items-center space-x-2 transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Download Audit PDF</span>
          </button>
        </div>
      </div>

    </div>
  );
}
