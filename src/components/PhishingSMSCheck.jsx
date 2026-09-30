import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { analyzeTextAPI } from '../services/api';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles,
  FileText
} from 'lucide-react';
import { cn } from '../lib/utils';

const PRESET_SMS = [
  {
    id: 'sms-critical',
    title: 'Urgent Bank Block SMS',
    status: 'critical',
    sender: 'HDFC-ALERT-SPOOF',
    text: 'DEAR CUSTOMER, YOUR HDFC NETBANKING WILL BE SUSPENDED TODAY! UPDATE YOUR PAN CARD IMMEDIATELY TO AVOID BLOCK: http://hdfc-verify-pan-update.top/login',
    riskScore: 98,
    reasons: ['Suspicious domain (.top extension)', 'Artificial psychological urgency (2 hours limit)', 'Spoofed bank header']
  },
  {
    id: 'sms-warning',
    title: 'Lottery Prize Claim WhatsApp',
    status: 'warning',
    sender: '+91 98765 43210',
    text: 'Congratulations! You won 25 Lakhs in Kaun Banega Crorepati Lucky Draw. Call Mr. Sharma now or click bit.ly/kbc-claim2026',
    riskScore: 74,
    reasons: ['Shortened link hiding real destination', 'Advance-fee lottery scam pattern', 'Unverified personal mobile sender']
  },
  {
    id: 'sms-safe',
    title: 'Legitimate OTP Code',
    status: 'safe',
    sender: 'AMAZON-IN',
    text: '129402 is your Amazon verification code. Never share your OTP with anyone, including Amazon employees.',
    riskScore: 2,
    reasons: ['Standard 6-digit OTP template', 'Explicit security warning included', 'No external links']
  }
];

export default function PhishingSMSCheck({ isSeniorMode }) {
  const [inputText, setInputText] = useState(PRESET_SMS[0].text);
  const [activePreset, setActivePreset] = useState(PRESET_SMS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#06B6D4']
    });
  };

  const handleAnalyze = async (preset = null) => {
    setIsAnalyzing(true);
    const targetText = preset ? preset.text : inputText;

    const fallbackPayload = preset || {
      id: 'custom-input',
      title: 'Custom User Text',
      status: targetText.toLowerCase().includes('http') || targetText.toLowerCase().includes('urgent') ? 'critical' : 'safe',
      sender: 'USER INPUT',
      text: targetText,
      riskScore: targetText.toLowerCase().includes('http') ? 89 : 5,
      reasons: targetText.toLowerCase().includes('http') 
        ? ['External unverified URL detected', 'Potentially dangerous link structure']
        : ['No suspicious links found', 'Normal messaging tone']
    };

    // Send text to FastAPI backend /api/v1/analyze-text (with fallback)
    const result = await analyzeTextAPI(targetText, fallbackPayload);

    if (preset) {
      setInputText(preset.text);
    }
    setActivePreset(result);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (result.status === 'safe') {
        triggerCelebration();
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={cn(
        "p-6 rounded-2xl bg-[#111827] border border-[#1F2937] cyber-card",
        isSeniorMode && "border-amber-400/40 p-8"
      )}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-[#F59E0B] cyber-glow-amber">
              <MessageSquare className={isSeniorMode ? "w-8 h-8" : "w-6 h-6"} />
            </div>
            <div>
              <h2 className={cn(
                "font-extrabold text-white flex items-center gap-2",
                isSeniorMode ? "text-2xl text-amber-200" : "text-xl"
              )}>
                {isSeniorMode ? "💬 Phishing & Fake SMS Checker" : "Phishing & SMS Scam Detector"}
              </h2>
              <p className={cn("text-slate-400 mt-1", isSeniorMode ? "text-base text-slate-200" : "text-sm")}>
                {isSeniorMode 
                  ? "Paste any suspicious SMS, WhatsApp text, or link to check if it's a bank scam or trap." 
                  : "Scan messages via FastAPI regex engine for malicious URLs, sender spoofing, and urgency triggers."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Input Area vs Analysis Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Text Box & Presets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Preset Buttons */}
          <div>
            <h3 className={cn("font-bold text-slate-300 mb-3 uppercase tracking-wider font-mono", isSeniorMode ? "text-lg text-amber-300" : "text-xs")}>
              {isSeniorMode ? "TRY AN EXAMPLE SCAM MESSAGE BELOW:" : "QUICK SAMPLE MESSAGES:"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_SMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAnalyze(item)}
                  className={cn(
                    "p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between",
                    "bg-[#111827] border-[#1F2937] hover:border-slate-600",
                    activePreset.id === item.id && item.status === 'safe' && "border-[#10B981] bg-[#10B981]/10",
                    activePreset.id === item.id && item.status === 'warning' && "border-[#F59E0B] bg-[#F59E0B]/10",
                    activePreset.id === item.id && item.status === 'critical' && "border-[#EF4444] bg-[#EF4444]/10",
                    isSeniorMode && "p-4 border-2"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-300">{item.title}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                      item.status === 'safe' && "bg-emerald-950 text-emerald-400 border border-emerald-500/30",
                      item.status === 'warning' && "bg-amber-950 text-amber-400 border border-amber-500/30",
                      item.status === 'critical' && "bg-red-950 text-red-400 border border-red-500/30"
                    )}>
                      {item.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1F2937] space-y-4">
            <div className="flex items-center justify-between">
              <label className={cn("font-bold text-white text-sm flex items-center gap-2", isSeniorMode && "text-lg text-amber-200")}>
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>{isSeniorMode ? "Paste or Type Message Here:" : "SMS / WhatsApp Text Body:"}</span>
              </label>

              <span className="text-xs font-mono text-slate-400">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious SMS text, WhatsApp message, or website link here..."
              rows={5}
              className={cn(
                "w-full p-4 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-white focus:outline-none focus:border-amber-500 font-mono transition-all selection:bg-amber-500 selection:text-black",
                isSeniorMode ? "text-lg p-5 leading-relaxed border-amber-400/40" : "text-sm"
              )}
            />

            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !inputText.trim()}
              className={cn(
                "w-full py-3.5 rounded-xl font-bold bg-[#F59E0B] hover:bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50",
                isSeniorMode && "text-xl py-4"
              )}
            >
              <Send className="w-5 h-5 fill-slate-950" />
              <span>{isAnalyzing ? "Analyzing FastAPI Threat Rules..." : "Verify Message via FastAPI"}</span>
            </button>
          </div>

        </div>

        {/* Right Col: Risk Analysis Verdict */}
        <div className="space-y-6">
          <div className={cn(
            "p-6 rounded-2xl border bg-[#111827] cyber-card relative overflow-hidden flex flex-col justify-between h-full",
            activePreset.status === 'safe' && "border-[#10B981]/40 cyber-glow-emerald",
            activePreset.status === 'warning' && "border-[#F59E0B]/40 cyber-glow-amber",
            activePreset.status === 'critical' && "border-[#EF4444]/40 cyber-glow-crimson",
            isSeniorMode && "p-8 border-2"
          )}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs font-mono font-bold tracking-wider uppercase text-slate-400", isSeniorMode && "text-sm text-amber-300")}>
                  {isSeniorMode ? "SCAM RISK VERDICT" : "PHISHING THREAT INDEX"}
                </span>
                <span className="text-xs font-mono text-amber-400">FASTAPI NLP</span>
              </div>

              {/* Score Gauge */}
              <div className="text-center py-6 border-y border-[#1F2937] my-3">
                <div className={cn(
                  "text-5xl font-black font-mono tracking-tight",
                  activePreset.status === 'safe' && "text-[#10B981]",
                  activePreset.status === 'warning' && "text-[#F59E0B]",
                  activePreset.status === 'critical' && "text-[#EF4444]",
                  isSeniorMode && "text-6xl"
                )}>
                  {activePreset.riskScore}%
                </div>
                <div className={cn("text-xs font-mono text-slate-400 mt-1 uppercase", isSeniorMode && "text-base text-slate-200")}>
                  {isSeniorMode ? "Scam & Fraud Risk Level" : "Phishing Probability Score"}
                </div>
              </div>

              {/* Reasons */}
              <div className="space-y-3 my-4">
                <h4 className={cn("font-bold text-white text-sm", isSeniorMode && "text-lg text-amber-200")}>
                  {isSeniorMode ? "Why this is dangerous:" : "Threat Vector Analysis:"}
                </h4>

                <div className="space-y-2">
                  {(activePreset.reasons || activePreset.matchedKeywords || []).map((reason, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs font-mono">
                      <div className="shrink-0 mt-0.5">
                        {activePreset.status === 'safe' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                        )}
                      </div>
                      <span className={cn("text-slate-300", isSeniorMode && "text-base font-sans text-slate-200")}>
                        {reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-[#1F2937]">
              {activePreset.status === 'safe' ? (
                <button
                  onClick={triggerCelebration}
                  className="w-full py-3 rounded-xl bg-[#10B981] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>{isSeniorMode ? "🎉 Safe Message Verified!" : "Celebrate Safe Message"}</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{isSeniorMode ? "⚠️ DO NOT CLICK ANY LINKS in this message!" : "HIGH RISK PHISHING. Do not click links or enter passwords."}</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
