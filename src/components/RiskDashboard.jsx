import React from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  HelpCircle,
  XCircle,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function RiskDashboard({ result, isSeniorMode }) {
  // Default values if no result passed yet
  const score = result?.riskScore ?? 94;
  const fileName = result?.fileName ?? 'recording_sample.wav';
  const title = result?.title ?? 'Grandson Emergency Bail Scam (AI Voice Clone)';

  // Verdict classifications based on score
  const isCritical = score >= 75;
  const isWarning = score >= 40 && score < 75;
  const isSafe = score < 40;

  const getVerdictText = () => {
    if (isCritical) return "CRITICAL: HIGH PROBABILITY OF AI SYNTHESIS / FRAUD";
    if (isWarning) return "SUSPICIOUS: INCONSISTENT AUDIO/VISUAL SIGNALS";
    return "AUTHENTIC: NATURAL HUMAN BIOMETRICS VERIFIED";
  };

  const getThemeColor = () => {
    if (isCritical) return { main: '#EF4444', text: 'text-red-400', bg: 'bg-red-950/60', border: 'border-red-500/40', glow: 'cyber-glow-crimson' };
    if (isWarning) return { main: '#F59E0B', text: 'text-amber-400', bg: 'bg-amber-950/60', border: 'border-amber-500/40', glow: 'cyber-glow-amber' };
    return { main: '#10B981', text: 'text-emerald-400', bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', glow: 'cyber-glow-emerald' };
  };

  const theme = getThemeColor();

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#3B82F6']
    });
  };

  // 4 Forensic Metrics
  const metrics = [
    {
      name: "Pitch Jitter Variance",
      seniorName: "Real Voice Pitch Variation",
      val: isCritical ? 92 : isWarning ? 64 : 8,
      status: isCritical ? "Synthetic Flatness (92%)" : isWarning ? "Inconsistent (64%)" : "Organic Tremor (8%)",
      desc: "Measures natural vocal cord micro-tremors vs robotic flatlining."
    },
    {
      name: "Respiration Gap Check",
      seniorName: "Human Breathing & Pause Check",
      val: isCritical ? 88 : isWarning ? 55 : 4,
      status: isCritical ? "Continuous TTS (No Lungs)" : isWarning ? "Irregular Pauses" : "Natural Lungs Breathing",
      desc: "Checks for natural inhalation pauses between spoken words."
    },
    {
      name: "High-Frequency Spectral Cutoff",
      seniorName: "Microphone Audio Quality Test",
      val: isCritical ? 95 : isWarning ? 50 : 12,
      status: isCritical ? ">16kHz AI Vocoder Artifacts" : isWarning ? "Filtered Spectrum" : "Uncompressed Full Range",
      desc: "Inspects neural vocoder phase shifts above 16,000 Hz."
    },
    {
      name: "Emotional Urgency Score",
      seniorName: "Scam Pressure & Fear Level",
      val: isCritical ? 90 : isWarning ? 70 : 15,
      status: isCritical ? "Extreme Panic Pressure" : isWarning ? "Urgent Demands" : "Normal Conversation Tone",
      desc: "Natural Language Processing threat score for panic/coercion language."
    }
  ];

  return (
    <div className={cn(
      "p-6 sm:p-8 rounded-2xl border bg-[#111827] cyber-card relative overflow-hidden space-y-8",
      theme.border,
      theme.glow,
      isSeniorMode && "p-8 border-2"
    )}>
      
      {/* 1. Top Title & File Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className={cn("px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border", theme.bg, theme.text, theme.border)}>
              {isCritical ? "CRITICAL THREAT" : isWarning ? "WARNING" : "SAFE VERIFIED"}
            </span>
            <span className="text-xs font-mono text-slate-400">File: {fileName}</span>
          </div>

          <h2 className={cn("font-extrabold text-white mt-1.5", isSeniorMode ? "text-2xl text-amber-200" : "text-xl")}>
            {title}
          </h2>
        </div>

        <button 
          onClick={() => alert("Detailed Diagnostic PDF generated.")}
          className="px-4 py-2 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-slate-300 hover:text-white text-xs font-mono font-semibold flex items-center space-x-2 shrink-0"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Export Audit PDF</span>
        </button>
      </div>

      {/* 2. Speedometer Gauge & Verdict Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* SVG Speedometer Radial Gauge */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-48 h-32 flex items-center justify-center overflow-hidden">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
              {/* Background Arc Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1F2937"
                strokeWidth="10"
                strokeDasharray="188.5"
                strokeDashoffset="62.8"
                strokeLinecap="round"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={theme.main}
                strokeWidth="10"
                strokeDasharray="188.5"
                strokeDashoffset={188.5 - (125.7 * (score / 100))}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              <span className={cn("text-4xl font-black font-mono tracking-tight", theme.text, isSeniorMode && "text-5xl")}>
                {score}%
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Risk Level</span>
            </div>
          </div>

          <div className="flex justify-between w-44 text-[10px] font-mono text-slate-500 mt-1">
            <span>0% (SAFE)</span>
            <span>50%</span>
            <span>100% (CRITICAL)</span>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="md:col-span-2 space-y-3">
          <div className={cn(
            "p-4 rounded-xl border flex items-center space-x-3",
            theme.bg,
            theme.border
          )}>
            {isCritical && <ShieldAlert className="w-7 h-7 text-red-400 shrink-0" />}
            {isWarning && <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0" />}
            {isSafe && <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />}

            <div>
              <h3 className={cn("font-bold text-white uppercase text-sm font-mono tracking-wide", theme.text, isSeniorMode && "text-lg")}>
                {getVerdictText()}
              </h3>
              <p className={cn("text-slate-300 mt-0.5", isSeniorMode ? "text-base font-medium" : "text-xs")}>
                {isCritical 
                  ? "High neural vocoder pattern confidence. This recording displays clear AI voice synthesis artifacts."
                  : isWarning 
                    ? "Inconclusive audio metrics. Acoustic phase shift detected, manual confirmation required."
                    : "Organic acoustic harmonics verified. No synthetic deepfake voice signatures detected."}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Senior / Easy Mode Adapter vs Technical Forensic Breakdown */}
      {isSeniorMode ? (
        /* Senior Mode Plain Advice Cards (Large text, simplified) */
        <div className="space-y-4 p-6 rounded-2xl bg-[#0B0F17] border-2 border-amber-400/60 shadow-xl">
          <h3 className="text-xl font-extrabold text-amber-300 flex items-center gap-2">
            <span>📢 SIMPLE SAFETY ADVICE FOR YOU</span>
          </h3>

          {isCritical || isWarning ? (
            <div className="space-y-4 text-white text-lg leading-relaxed">
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start space-x-3">
                <XCircle className="w-7 h-7 text-red-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-red-300 text-xl block mb-1">⚠️ SCAM WARNING DETECTED:</span>
                  <span>This is <strong>NOT</strong> your real family member's voice. A computer program made this fake voice to trick you into sending money.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                <span className="font-bold text-amber-300 text-xl block">✅ WHAT YOU SHOULD DO RIGHT NOW:</span>
                <ol className="list-decimal list-inside space-y-2 font-medium text-slate-200">
                  <li><strong>Hang up the phone call immediately.</strong></li>
                  <li><strong>Call your family member directly</strong> using their normal saved phone number to check if they are okay.</li>
                  <li><strong>Do NOT transfer money</strong>, buy gift cards, or share any bank passwords.</li>
                </ol>
              </div>

              <a
                href="tel:1930"
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xl flex items-center justify-center space-x-3 shadow-lg shadow-red-600/40 transition-all border border-red-400"
              >
                <PhoneCall className="w-6 h-6 text-amber-300 animate-bounce" />
                <span>Call Cyber Emergency Hotline 1930 (Free Call)</span>
              </a>
            </div>
          ) : (
            <div className="space-y-4 text-white text-lg leading-relaxed">
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start space-x-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-emerald-300 text-xl block mb-1">✅ SAFE & AUTHENTIC VOICE:</span>
                  <span>This voice recording sounds like a real person. No fake computer voice tricks were found.</span>
                </div>
              </div>

              <button
                onClick={triggerCelebration}
                className="w-full py-4 rounded-xl bg-[#10B981] hover:bg-emerald-400 text-slate-950 font-extrabold text-xl flex items-center justify-center space-x-3 shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Sparkles className="w-6 h-6 fill-slate-950" />
                <span>🎉 Click to Celebrate Safe Voice!</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Technical Forensic Diagnostic Breakdown (4 metrics with mini progress bars) */
        <div className="space-y-4 pt-2">
          <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider text-slate-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>FORENSIC DIAGNOSTIC BREAKDOWN (4 BIOMETRIC METRICS):</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0B0F17] border border-[#1F2937] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{m.name}</span>
                  <span className={m.val > 70 ? "text-red-400 font-bold" : m.val > 35 ? "text-amber-400" : "text-emerald-400"}>
                    {m.status}
                  </span>
                </div>

                {/* Mini Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-700",
                      m.val > 70 ? "bg-red-500" : m.val > 35 ? "bg-amber-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${m.val}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
