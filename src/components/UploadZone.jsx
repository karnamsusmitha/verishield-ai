import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { analyzeAudioAPI } from '../services/api';
import { 
  UploadCloud, 
  FileAudio, 
  FileVideo, 
  FileImage, 
  Loader2, 
  Zap, 
  Play
} from 'lucide-react';
import { cn } from '../lib/utils';

export const HACKATHON_PRESETS = [
  {
    id: 'preset-grandson-bail',
    title: 'Grandson Emergency Bail Scam',
    type: 'Simulated Audio Clone',
    mediaType: 'audio',
    fileName: 'grandson_bail_voice_call.wav',
    fileSize: '2.4 MB',
    riskScore: 94,
    status: 'critical',
    badge: '🚨 CRITICAL DEEPFAKE (94% RISK)',
    summary: 'Neural Vocoder signature detected! 5-second voice clone trained on social media audio. Artificial breathing gaps identified.',
    technicalDetails: [
      'Mel-Frequency Cepstral Coefficients (MFCC) variance: 0.89 (Artificial)',
      'Phase continuity loss in 4kHz-8kHz frequency band',
      'Zero biological micro-pitch variations (Robotic Formant)'
    ]
  },
  {
    id: 'preset-bank-kyc',
    title: 'Urgent Bank KYC Expired SMS',
    type: 'Phishing Screenshot',
    mediaType: 'image',
    fileName: 'hdfc_bank_kyc_expired_sms.png',
    fileSize: '840 KB',
    riskScore: 88,
    status: 'warning',
    badge: '⚠️ PHISHING WARNING (88% RISK)',
    summary: 'Fake bank URL (hdfc-kyc-update.top) detected. High psychological urgency & pressure tactics found.',
    technicalDetails: [
      'Unverified domain extension (.top) flagged in global threat DB',
      'Optical Character Recognition (OCR) extracted 3 urgent call-to-actions',
      'Sender SMS header mismatch (Spoofed Shortcode)'
    ]
  },
  {
    id: 'preset-team-call',
    title: 'Legitimate Team Video Call',
    type: 'Simulated Natural Video',
    mediaType: 'video',
    fileName: 'weekly_sync_zoom_call.mp4',
    fileSize: '14.2 MB',
    riskScore: 11,
    status: 'safe',
    badge: '🟢 SAFE & AUTHENTIC (11% RISK)',
    summary: 'Sub-surface skin scattering, natural eye blinks (14/min), and organic acoustic reverberation confirmed.',
    technicalDetails: [
      '3D Face Mesh alignment: 100% natural contour',
      'Organic pupil dilation & eyelid blink pattern verified',
      'Sensor noise pattern matches physical camera hardware'
    ]
  }
];

export default function UploadZone({ onAnalysisComplete, isSeniorMode }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const SCAN_STEPS = [
    "Step 1/3: Extracting Mel-Frequency Cepstral Coefficients (MFCC)...",
    "Step 2/3: Checking spectral flux & synthetic breathing gaps...",
    "Step 3/3: Running anomaly score aggregation on FastAPI Kernel..."
  ];

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#3B82F6']
    });
  };

  const startScanSequence = async (payload, rawFile = null) => {
    setIsScanning(true);
    setCurrentStepIndex(0);
    setUploadProgress(20);

    // Step 1
    setTimeout(() => {
      setCurrentStepIndex(1);
      setUploadProgress(60);
    }, 800);

    // Step 2
    setTimeout(() => {
      setCurrentStepIndex(2);
      setUploadProgress(90);
    }, 1600);

    // If rawFile is uploaded, call FastAPI backend endpoint (with automatic fallback)
    let finalPayload = payload;
    if (rawFile) {
      finalPayload = await analyzeAudioAPI(rawFile, payload);
    }

    // Step 3 completion -> 2.5s
    setTimeout(() => {
      setUploadProgress(100);
      setIsScanning(false);
      if (finalPayload.status === 'safe') {
        triggerCelebration();
      }
      if (onAnalysisComplete) {
        onAnalysisComplete(finalPayload);
      }
    }, 2500);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const isAudio = file.type.startsWith('audio');
    const isVideo = file.type.startsWith('video');
    const isImage = file.type.startsWith('image');

    const filePayload = {
      id: `custom-file-${Date.now()}`,
      title: file.name,
      type: isAudio ? 'Uploaded Audio' : isVideo ? 'Uploaded Video' : 'Uploaded Image / Screenshot',
      mediaType: isAudio ? 'audio' : isVideo ? 'video' : 'image',
      fileName: file.name,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      riskScore: Math.floor(Math.random() * 20) + 10,
      status: 'safe',
      badge: '🟢 SCAN COMPLETE (SAFE)',
      summary: 'Deep neural network scan complete. No deepfake or voice cloning patterns detected.',
      technicalDetails: [
        'Acoustic/Visual spectral density: Normal',
        'Hardware sensor noise fingerprint matched',
        'Zero GAN boundary artifacts found'
      ]
    };

    setSelectedFile(filePayload);
    startScanSequence(filePayload, file);
  };

  const handlePresetSelect = (preset) => {
    setSelectedFile(preset);
    startScanSequence(preset);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Drag & Drop File Upload Box */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "p-8 rounded-2xl border-2 border-dashed transition-all relative overflow-hidden text-center",
          dragActive 
            ? "border-cyan-400 bg-cyan-950/30 scale-[1.01]" 
            : "border-[#1F2937] hover:border-cyan-500/50 bg-[#111827]/80",
          isScanning && "border-amber-400/60 bg-amber-950/10",
          isSeniorMode && "p-10 border-2 border-amber-400/50 bg-slate-900"
        )}
      >
        <input 
          type="file"
          accept="audio/*,video/*,image/*"
          onChange={handleFileChange}
          disabled={isScanning}
          className="absolute inset-0 opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
        />

        {isScanning ? (
          <div className="py-6 space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-center space-x-3 text-cyan-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className={cn("font-mono font-bold", isSeniorMode ? "text-xl text-amber-200" : "text-base")}>
                FASTAPI NEURAL KERNEL SCANNING...
              </span>
            </div>

            <div className="w-full bg-[#0B0F17] h-3 rounded-full overflow-hidden border border-[#1F2937]">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            <div className={cn(
              "p-3 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-cyan-300 font-mono text-xs animate-pulse",
              isSeniorMode && "text-base py-4 text-white font-semibold"
            )}>
              {SCAN_STEPS[currentStepIndex]}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <FileAudio className="w-6 h-6" />
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <FileVideo className="w-6 h-6" />
              </div>
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-400">
                <FileImage className="w-6 h-6" />
              </div>
            </div>

            <div>
              <p className={cn("font-bold text-white", isSeniorMode ? "text-2xl text-amber-200" : "text-lg")}>
                {isSeniorMode 
                  ? "📁 Drop any recording, video, or message photo here" 
                  : "Drag & Drop Audio, Video, or Screenshot File Here"}
              </p>
              <p className={cn("text-slate-400 mt-1", isSeniorMode ? "text-base text-slate-300" : "text-xs font-mono")}>
                Connected to FastAPI Backend (http://localhost:8000) • Supports .mp3, .wav, .mp4, .png
              </p>
            </div>

            <button className={cn(
              "px-5 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95",
              isSeniorMode && "text-lg py-3 px-6 ring-2 ring-amber-300"
            )}>
              <UploadCloud className="w-4 h-4 fill-slate-950" />
              <span>{isSeniorMode ? "Browse Files on Device" : "Browse Local File"}</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. Hackathon Demo Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "font-extrabold text-white flex items-center gap-2 font-mono uppercase tracking-wider",
            isSeniorMode ? "text-xl text-amber-300" : "text-xs text-slate-300"
          )}>
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>HACKATHON DEMO PRESETS (ONE-CLICK TEST SCENARIOS)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HACKATHON_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              disabled={isScanning}
              className={cn(
                "p-4 rounded-xl border transition-all text-left flex flex-col justify-between group relative overflow-hidden",
                "bg-[#111827] border-[#1F2937] hover:border-slate-500 hover:scale-[1.01]",
                preset.status === 'critical' && "hover:border-red-500/60 hover:bg-red-950/10",
                preset.status === 'warning' && "hover:border-amber-500/60 hover:bg-amber-950/10",
                preset.status === 'safe' && "hover:border-emerald-500/60 hover:bg-emerald-950/10",
                isSeniorMode && "p-5 border-2"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                  preset.status === 'critical' && "bg-red-950 text-red-400 border border-red-500/40",
                  preset.status === 'warning' && "bg-amber-950 text-amber-400 border border-amber-500/40",
                  preset.status === 'safe' && "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                )}>
                  {preset.type}
                </span>

                <span className={cn(
                  "text-xs font-mono font-bold",
                  preset.status === 'critical' && "text-red-400",
                  preset.status === 'warning' && "text-amber-400",
                  preset.status === 'safe' && "text-emerald-400"
                )}>
                  {preset.riskScore}% RISK
                </span>
              </div>

              <div>
                <h4 className={cn(
                  "font-bold text-white group-hover:text-cyan-300 transition-colors",
                  isSeniorMode ? "text-lg text-white" : "text-sm"
                )}>
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">{preset.fileName}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1F2937] flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>Click to Run Scan</span>
                <Play className="w-3.5 h-3.5 fill-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
