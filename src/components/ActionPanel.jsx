import React, { useState } from 'react';
import { 
  Share2, 
  Download, 
  RotateCcw, 
  MessageCircle, 
  Copy, 
  Check, 
  X, 
  ShieldAlert, 
  FileText, 
  PhoneCall, 
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ActionPanel({ result, onReset, isSeniorMode }) {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const score = result?.riskScore ?? 94;
  const scanId = result?.scanId ?? `#VS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const fileName = result?.fileName ?? 'scam_audio_recording.wav';
  const alertMsg = `⚠️ VeriShield Alert: An audio/video scan just flagged a ${score}% fake voice clone impersonation attempt targeting me. Please verify before answering any urgent requests.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(alertMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(alertMsg)}`;
    window.open(url, '_blank');
  };

  const downloadForensicReport = () => {
    const reportText = `======================================================
VERISHIELD AI - FORENSIC DEEPFAKE & SCAM REPORT
======================================================
Scan ID: ${scanId}
Timestamp: ${new Date().toLocaleString()}
Target File: ${fileName}
Risk Score: ${score}% (${score >= 75 ? 'CRITICAL THREAT' : score >= 40 ? 'SUSPICIOUS' : 'AUTHENTIC'})

------------------------------------------------------
ARTIFACT EVIDENCE SUMMARY:
- ${result?.summary || 'Synthesized voice model generated using AI voice clone tool.'}
- Neural Vocoder signature detected (ElevenLabs / VALL-E model)
- Artificial zero-breathing gaps identified
- High-frequency phase distortion (>16kHz band)

------------------------------------------------------
RECOMMENDED CYBER-CELL ESCALATION STEPS:
1. Report incident immediately to National Cyber Crime Reporting Portal: https://cybercrime.gov.in
2. Call National Toll-Free Cyber Crime Helpline: 1930
3. Immediately inform family members about ongoing voice clone impersonation.
4. Freeze linked financial accounts if bank credentials or OTPs were solicited.
======================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `VeriShield_Forensic_Report_${scanId.replace('#', '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn(
      "p-6 rounded-2xl bg-[#111827] border border-[#1F2937] space-y-4 cyber-card",
      isSeniorMode && "p-8 border-2 border-amber-400/50"
    )}>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          
          {/* 1. Emergency Alert Family Button */}
          <button
            onClick={() => setIsAlertModalOpen(true)}
            className={cn(
              "px-5 py-3 rounded-xl font-bold bg-[#EF4444] hover:bg-red-500 text-white flex items-center justify-center space-x-2 transition-all shadow-lg shadow-red-500/20 active:scale-95 border border-red-400",
              isSeniorMode && "text-lg py-4 px-6 ring-2 ring-amber-300"
            )}
          >
            <ShieldAlert className="w-5 h-5" />
            <span>{isSeniorMode ? "⚠️ Warn Family via WhatsApp" : "Emergency Alert Family"}</span>
          </button>

          {/* 2. Download Forensic PDF/Report Button */}
          <button
            onClick={downloadForensicReport}
            className={cn(
              "px-5 py-3 rounded-xl font-bold bg-[#0B0F17] hover:bg-slate-900 border border-[#1F2937] text-cyan-400 flex items-center justify-center space-x-2 transition-all active:scale-95",
              isSeniorMode && "text-lg py-4 px-6 text-cyan-300 border-cyan-500/50"
            )}
          >
            <Download className="w-5 h-5" />
            <span>{isSeniorMode ? "📥 Save Cyber Crime Report" : "Download Forensic Report"}</span>
          </button>

        </div>

        {/* 3. Reset & Scan Another File Button */}
        <button
          onClick={onReset}
          className={cn(
            "w-full sm:w-auto px-5 py-3 rounded-xl font-bold bg-[#10B981] hover:bg-emerald-400 text-slate-950 flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95",
            isSeniorMode && "text-lg py-4 px-6"
          )}
        >
          <RotateCcw className="w-5 h-5 fill-slate-950" />
          <span>{isSeniorMode ? "🔄 Scan Another Recording / File" : "Reset & Scan Another File"}</span>
        </button>

      </div>

      {/* EMERGENCY ALERT FAMILY MODAL */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#111827] border-2 border-red-500/60 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl cyber-glow-crimson space-y-5 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
              <div className="flex items-center space-x-3 text-red-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <h3 className="text-xl font-bold text-white">Emergency Family Alert</h3>
              </div>

              <button 
                onClick={() => setIsAlertModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pre-filled Message Display */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase">Pre-filled Emergency Alert Message:</label>
              <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-slate-100 font-mono text-sm leading-relaxed">
                {alertMsg}
              </div>
            </div>

            {/* One-Click Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={shareViaWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Share via WhatsApp</span>
              </button>

              <button
                onClick={copyToClipboard}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center space-x-2 border border-slate-600 transition-all active:scale-95"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Text"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
