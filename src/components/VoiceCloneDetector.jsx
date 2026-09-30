import React, { useState } from 'react';
import UploadZone from './UploadZone';
import RiskDashboard from './RiskDashboard';
import AudioVisualizer from './AudioVisualizer';
import ActionPanel from './ActionPanel';
import { FileAudio } from 'lucide-react';
import { cn } from '../lib/utils';

const SAMPLE_AUDIO_CASES = [
  {
    id: 'sample-safe',
    title: 'Family Member Voice Note',
    type: 'Safe Audio',
    fileName: 'family_voice_note.wav',
    fileSize: '1.2 MB',
    status: 'safe',
    riskScore: 8,
    scanId: '#VS-2026-9812',
    badge: '🟢 SAFE HUMAN VOICE (92% TRUST)',
    summary: 'Natural pitch modulation and uncompressed human vocal acoustics confirmed.',
    technicalDetails: [
      'Micro-pitch variation: Organic (Natural vocal cord tremor)',
      'Neural Vocoder artifacts: 0% detected',
      'Uncompressed 44.1kHz acoustic spectrum matched'
    ]
  },
  {
    id: 'sample-warning',
    title: 'Unverified Bank Officer Call',
    type: 'Suspicious',
    fileName: 'bank_officer_call_rec.mp3',
    fileSize: '3.4 MB',
    status: 'warning',
    riskScore: 58,
    scanId: '#VS-2026-9813',
    badge: '⚠️ SUSPECT AUDIO (58% RISK)',
    summary: 'Robotic phase distortion detected in high-frequency vocal bands. Unverified caller identity.',
    technicalDetails: [
      'Spectral flux anomaly at 3.2kHz frequency band',
      'Potential VoIP compression or voice filter artifact',
      'Manual verification recommended before sharing details'
    ]
  },
  {
    id: 'sample-critical',
    title: 'Kidnapping Extortion Call (AI Clone)',
    type: 'AI Deepfake Clone',
    fileName: 'extortion_voice_clone.wav',
    fileSize: '2.1 MB',
    status: 'critical',
    riskScore: 94,
    scanId: '#VS-2026-9814',
    badge: '🚨 CRITICAL AI CLONE (94% RISK)',
    summary: 'Synthesized voice model generated using 5-second voice sample. Neural Vocoder signature detected!',
    technicalDetails: [
      'ElevenLabs / VALL-E AI synthesis pattern matched',
      'Artificial zero-breathing gaps identified',
      'Synthesized pitch contour flatlining'
    ]
  }
];

export default function VoiceCloneDetector({ isSeniorMode }) {
  const [analysisResult, setAnalysisResult] = useState(SAMPLE_AUDIO_CASES[2]);

  const handleReset = () => {
    setAnalysisResult(SAMPLE_AUDIO_CASES[0]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Integrated Drag & Drop Upload Zone with Hackathon Presets */}
      <UploadZone 
        onAnalysisComplete={(payload) => setAnalysisResult(payload)} 
        isSeniorMode={isSeniorMode} 
      />

      {/* 2. High-Contrast Risk Speedometer & Forensic Dashboard */}
      {analysisResult && (
        <RiskDashboard 
          result={analysisResult} 
          isSeniorMode={isSeniorMode} 
        />
      )}

      {/* 3. Action Panel: Emergency Family Alert Modal, Download Forensic PDF/TXT, Reset State */}
      {analysisResult && (
        <ActionPanel 
          result={analysisResult} 
          onReset={handleReset} 
          isSeniorMode={isSeniorMode} 
        />
      )}

      {/* 4. Real-Time Canvas Audio Visualizer & Waveform Spectrogram */}
      <AudioVisualizer 
        threatMode={analysisResult?.status || 'critical'} 
        isSeniorMode={isSeniorMode} 
      />

      {/* 5. Preset Voice Case Studies Selector */}
      <div className="pt-4">
        <h3 className={cn("font-bold text-slate-300 mb-3 uppercase tracking-wider font-mono", isSeniorMode ? "text-lg text-amber-300" : "text-xs")}>
          {isSeniorMode ? "OR SELECT ADDITIONAL VOICE TEST SAMPLES:" : "SPECIFIC AUDIO CASE STUDIES:"}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SAMPLE_AUDIO_CASES.map((sample) => {
            const isSelected = analysisResult?.id === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => setAnalysisResult(sample)}
                className={cn(
                  "p-4 rounded-xl border transition-all text-left flex flex-col justify-between",
                  "bg-[#111827] border-[#1F2937] hover:border-slate-600",
                  isSelected && sample.status === 'safe' && "border-[#10B981] bg-[#10B981]/10 cyber-glow-emerald",
                  isSelected && sample.status === 'warning' && "border-[#F59E0B] bg-[#F59E0B]/10 cyber-glow-amber",
                  isSelected && sample.status === 'critical' && "border-[#EF4444] bg-[#EF4444]/10 cyber-glow-crimson",
                  isSeniorMode && "p-5 border-2"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <FileAudio className={cn(
                    "w-5 h-5",
                    sample.status === 'safe' && "text-[#10B981]",
                    sample.status === 'warning' && "text-[#F59E0B]",
                    sample.status === 'critical' && "text-[#EF4444]"
                  )} />
                  <span className="text-[10px] font-mono text-slate-400">{sample.fileSize}</span>
                </div>

                <div>
                  <h4 className={cn("font-bold text-white", isSeniorMode ? "text-lg text-white" : "text-sm")}>
                    {sample.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{sample.type}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
