import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Video, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Eye, 
  Upload, 
  Sparkles,
  Layers,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';

const VIDEO_TEST_CASES = [
  {
    id: 'video-safe',
    title: 'Executive Video Call',
    type: 'Authentic Video',
    status: 'safe',
    confidence: 99.2,
    blinkRate: 'Natural (16/min)',
    meshConsistency: '100% Alignment',
    summary: 'Sub-surface skin scattering and organic eye reflection verified.'
  },
  {
    id: 'video-deepfake',
    title: 'Political Speech Video Swap',
    type: 'AI Deepfake Face-Swap',
    status: 'critical',
    confidence: 12.5,
    blinkRate: 'Abnormal (0/min - Frozen)',
    meshConsistency: 'Jawline Blurring (88% Artificial)',
    summary: 'GAN boundary artifacts detected around chin contour and earlobes.'
  },
  {
    id: 'video-[#F59E0B]',
    title: 'Social Media Portrait Photo',
    type: 'AI Enhanced / Filtered',
    status: 'warning',
    confidence: 62.0,
    blinkRate: 'Static Image',
    meshConsistency: 'Smoothened Texture',
    summary: 'High beauty filter smoothing detected. Unsafe for identity verification.'
  }
];

export default function DeepfakeFaceScanner({ isSeniorMode }) {
  const [selectedCase, setSelectedCase] = useState(VIDEO_TEST_CASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [showMesh, setShowMesh] = useState(true);

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#10B981', '#3B82F6']
    });
  };

  const handleScan = (testCase) => {
    setIsScanning(true);
    setSelectedCase(testCase);
    setTimeout(() => {
      setIsScanning(false);
      if (testCase.status === 'safe') {
        triggerCelebration();
      }
    }, 1200);
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
            <div className="p-3.5 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-[#06B6D4] cyber-glow-cyan">
              <Video className={isSeniorMode ? "w-8 h-8" : "w-6 h-6"} />
            </div>
            <div>
              <h2 className={cn(
                "font-extrabold text-white flex items-center gap-2",
                isSeniorMode ? "text-2xl text-amber-200" : "text-xl"
              )}>
                {isSeniorMode ? "📹 Deepfake Video & Fake Face Scanner" : "Deepfake Face Scanner & Video Biometrics"}
              </h2>
              <p className={cn("text-slate-400 mt-1", isSeniorMode ? "text-base text-slate-200" : "text-sm")}>
                {isSeniorMode 
                  ? "Scan video clips or photos to detect if someone's face has been swapped using AI." 
                  : "Detect FaceSwap, DeepFaceLab, and Neural Avatar manipulations via 3D facial mesh alignment."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMesh(!showMesh)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center space-x-1.5",
                showMesh ? "bg-cyan-950/80 border-cyan-500 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showMesh ? "AI Mesh Grid: ON" : "AI Mesh Grid: OFF"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Live Preview & Face Scan Grid vs Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Video Frame & Test Cases */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simulated Video Scanner viewport */}
          <div className="relative rounded-2xl bg-[#0B0F17] border border-[#1F2937] overflow-hidden aspect-video flex items-center justify-center group">
            
            {/* Background scanner animation */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-transparent z-10" />

            {/* Simulated Face Graphic */}
            <div className="relative w-56 h-56 rounded-full border-2 border-dashed border-cyan-500/40 flex items-center justify-center p-4">
              <div className={cn(
                "w-full h-full rounded-full flex flex-col items-center justify-center relative transition-all duration-500",
                selectedCase.status === 'safe' && "bg-emerald-950/20 border-2 border-emerald-500/60 cyber-glow-emerald",
                selectedCase.status === 'warning' && "bg-amber-950/20 border-2 border-amber-500/60 cyber-glow-amber",
                selectedCase.status === 'critical' && "bg-red-950/30 border-2 border-red-500/60 cyber-glow-crimson"
              )}>
                <Eye className={cn(
                  "w-16 h-16 transition-colors",
                  selectedCase.status === 'safe' && "text-[#10B981]",
                  selectedCase.status === 'warning' && "text-[#F59E0B]",
                  selectedCase.status === 'critical' && "text-[#EF4444] animate-pulse"
                )} />

                <span className="text-xs font-mono font-bold mt-2 text-slate-200">
                  {selectedCase.title}
                </span>

                {/* AI Facial Landmark Wireframe Mesh Overlay */}
                {showMesh && (
                  <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
                    <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
                      <polygon points="50,15 35,35 65,35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="35,35 25,60 50,75" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="65,35 75,60 50,75" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="35" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="65" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Scanning Radar Line overlay */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 animate-bounce z-20 shadow-lg shadow-cyan-400" />
            )}

            {/* Top Bar inside Viewport */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-xs">
              <span className="px-3 py-1 rounded bg-[#0B0F17]/80 border border-[#1F2937] text-cyan-400 flex items-center gap-2">
                <Scan className="w-3.5 h-3.5 animate-spin" />
                FRAME ANALYSIS: 60 FPS
              </span>

              <span className={cn(
                "px-3 py-1 rounded font-bold uppercase border",
                selectedCase.status === 'safe' && "bg-emerald-950/90 text-emerald-400 border-emerald-500/40",
                selectedCase.status === 'warning' && "bg-amber-950/90 text-amber-400 border-amber-500/40",
                selectedCase.status === 'critical' && "bg-red-950/90 text-red-400 border-red-500/40"
              )}>
                {selectedCase.type}
              </span>
            </div>

          </div>

          {/* Preset Video Samples */}
          <div>
            <h3 className={cn("font-bold text-slate-300 mb-3 uppercase tracking-wider font-mono", isSeniorMode ? "text-lg text-amber-300" : "text-xs")}>
              {isSeniorMode ? "SELECT A SAMPLE VIDEO TO CHECK:" : "TEST VIDEO SCAN CASES:"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VIDEO_TEST_CASES.map((item) => {
                const isSelected = selectedCase.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScan(item)}
                    className={cn(
                      "p-4 rounded-xl border transition-all text-left flex flex-col justify-between",
                      "bg-[#111827] border-[#1F2937] hover:border-slate-600",
                      isSelected && item.status === 'safe' && "border-[#10B981] bg-[#10B981]/10 cyber-glow-emerald",
                      isSelected && item.status === 'warning' && "border-[#F59E0B] bg-[#F59E0B]/10 cyber-glow-amber",
                      isSelected && item.status === 'critical' && "border-[#EF4444] bg-[#EF4444]/10 cyber-glow-crimson",
                      isSeniorMode && "p-5 border-2"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Video className={cn(
                        "w-5 h-5",
                        item.status === 'safe' && "text-[#10B981]",
                        item.status === 'warning' && "text-[#F59E0B]",
                        item.status === 'critical' && "text-[#EF4444]"
                      )} />
                      <span className="text-[10px] font-mono text-slate-400">{item.confidence}% TRUST</span>
                    </div>

                    <h4 className={cn("font-bold text-white", isSeniorMode ? "text-lg text-white" : "text-sm")}>
                      {item.title}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Col: Biometric Scanner Diagnostic Panel */}
        <div className="space-y-6">
          <div className={cn(
            "p-6 rounded-2xl border bg-[#111827] cyber-card relative overflow-hidden flex flex-col justify-between h-full",
            selectedCase.status === 'safe' && "border-[#10B981]/40 cyber-glow-emerald",
            selectedCase.status === 'warning' && "border-[#F59E0B]/40 cyber-glow-amber",
            selectedCase.status === 'critical' && "border-[#EF4444]/40 cyber-glow-crimson",
            isSeniorMode && "p-8 border-2"
          )}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={cn("text-xs font-mono font-bold tracking-wider uppercase text-slate-400", isSeniorMode && "text-sm text-amber-300")}>
                  {isSeniorMode ? "FACE SCAN RESULT" : "BIOMETRIC VERDICT"}
                </span>
                <span className="text-xs font-mono text-cyan-400">GAN-NET v3.1</span>
              </div>

              {/* Big Trust Gauge */}
              <div className="text-center py-6 border-y border-[#1F2937] my-3">
                <div className={cn(
                  "text-5xl font-black font-mono tracking-tight",
                  selectedCase.status === 'safe' && "text-[#10B981]",
                  selectedCase.status === 'warning' && "text-[#F59E0B]",
                  selectedCase.status === 'critical' && "text-[#EF4444]",
                  isSeniorMode && "text-6xl"
                )}>
                  {selectedCase.confidence}%
                </div>
                <div className={cn("text-xs font-mono text-slate-400 mt-1 uppercase", isSeniorMode && "text-base text-slate-200")}>
                  {isSeniorMode ? "Authenticity Score" : "Visual Authenticity Confidence"}
                </div>
              </div>

              {/* Findings list */}
              <div className="space-y-3 my-4">
                <h4 className={cn("font-bold text-white text-sm", isSeniorMode && "text-lg text-amber-200")}>
                  {isSeniorMode ? "Key Visual Findings:" : "Facial Metric Diagnostics:"}
                </h4>

                <p className={cn("text-slate-300 leading-relaxed", isSeniorMode ? "text-base font-medium" : "text-xs")}>
                  {selectedCase.summary}
                </p>

                <div className="space-y-3 pt-2 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-[#0B0F17] border border-[#1F2937]">
                    <span className="text-slate-400 block text-[10px]">BLINK RATE & EYE MOTION</span>
                    <span className="text-slate-200 font-semibold">{selectedCase.blinkRate}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#0B0F17] border border-[#1F2937]">
                    <span className="text-slate-400 block text-[10px]">3D MESH CONTOUR CONSISTENCY</span>
                    <span className="text-slate-200 font-semibold">{selectedCase.meshConsistency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-[#1F2937]">
              {selectedCase.status === 'safe' ? (
                <button
                  onClick={triggerCelebration}
                  className="w-full py-3 rounded-xl bg-[#10B981] text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>{isSeniorMode ? "🎉 Safe Video Verified!" : "Celebrate Verified Authentic Video"}</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{isSeniorMode ? "⚠️ Fake face video detected! Do not send money." : "CRITICAL DEEPFAKE ALERT. Video call manipulation detected."}</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
