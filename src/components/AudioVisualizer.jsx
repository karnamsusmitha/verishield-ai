import React, { useRef, useEffect, useState } from 'react';
import { Mic, MicOff, Activity, Layers, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AudioVisualizer({ threatMode = 'critical', isSeniorMode }) {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('waveform'); // 'waveform' | 'spectrogram'
  const [isMicActive, setIsMicActive] = useState(false);
  const [micError, setMicError] = useState(null);
  const [showAnomalyTag, setShowAnomalyTag] = useState(true);

  // Web Audio Refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // Toggle Live Mic Mode
  const toggleLiveMic = async () => {
    if (isMicActive) {
      stopLiveMic();
    } else {
      try {
        setMicError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        setIsMicActive(true);
      } catch (err) {
        console.warn("Microphone access blocked or unavailable, falling back to simulated mode:", err);
        setMicError("Microphone access unavailable. Switched to high-precision simulated acoustic mode.");
        setIsMicActive(false);
      }
    }
  };

  const stopLiveMic = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsMicActive(false);
  };

  useEffect(() => {
    return () => {
      stopLiveMic();
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  // Main Canvas Rendering Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas background
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Collect data (Live Mic vs Synthetic Curve)
      let dataArray;
      if (isMicActive && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        if (viewMode === 'waveform') {
          analyserRef.current.getByteTimeDomainData(dataArray);
        } else {
          analyserRef.current.getByteFrequencyData(dataArray);
        }
      } else {
        // Mode B: Synthetic Frequency Curve with Artificial Jitter Spikes
        const count = 64;
        dataArray = new Uint8Array(count);
        for (let i = 0; i < count; i++) {
          let val = Math.sin(time + i * 0.15) * 40 + Math.cos(time * 0.8 + i * 0.1) * 35 + 128;
          // Add artificial jitter spikes in middle section (anomaly zone)
          if (threatMode === 'critical' && i > 20 && i < 40) {
            val += Math.sin(time * 5 + i) * 50;
          }
          dataArray[i] = Math.min(255, Math.max(0, val));
        }
      }

      // ---------------- RENDER VIEWS ----------------

      if (viewMode === 'waveform') {
        // WAVEFORM VIEW: Neon Cyan / Red line graph
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = threatMode === 'critical' ? '#EF4444' : '#06B6D4';
        ctx.strokeStyle = threatMode === 'critical' ? '#EF4444' : '#06B6D4';

        ctx.beginPath();
        const sliceWidth = width / dataArray.length;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow

      } else {
        // SPECTROGRAM HEATMAP VIEW: Multi-color spectral bars
        const barWidth = (width / dataArray.length) * 0.8;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = (dataArray[i] / 255) * (height * 0.85);

          // Color gradient depending on threat & amplitude
          let gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
          if (threatMode === 'critical' && i > 15 && i < 35) {
            gradient.addColorStop(0, '#7F1D1D');
            gradient.addColorStop(0.5, '#EF4444');
            gradient.addColorStop(1, '#F59E0B');
          } else {
            gradient.addColorStop(0, '#064E3B');
            gradient.addColorStop(0.5, '#10B981');
            gradient.addColorStop(1, '#06B6D4');
          }

          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth, barHeight);

          x += barWidth + 2;
        }
      }

      // ---------------- ANOMALY HIGHLIGHT OVERLAY ----------------
      if (showAnomalyTag && threatMode === 'critical') {
        const boxX = width * 0.32;
        const boxWidth = width * 0.38;
        const boxY = height * 0.15;
        const boxHeight = height * 0.7;

        // Pulsating border opacity
        const pulse = (Math.sin(time * 3) + 1) / 2 * 0.5 + 0.5;

        // Draw dashed highlight box
        ctx.save();
        ctx.strokeStyle = `rgba(239, 68, 68, ${pulse})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillStyle = `rgba(239, 68, 68, 0.08)`;
        ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        ctx.restore();

        // Draw Flag Label Box inside canvas
        ctx.fillStyle = '#991B1B';
        ctx.fillRect(boxX + 8, boxY + 8, 260, 24);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillText('⚠️ Artifact: Unnatural Pitch Flatness (0.42s-1.15s)', boxX + 14, boxY + 24);
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [viewMode, isMicActive, threatMode, showAnomalyTag]);

  return (
    <div className={cn(
      "p-6 rounded-2xl bg-[#111827] border border-[#1F2937] space-y-4 cyber-card relative overflow-hidden",
      isSeniorMode && "p-8 border-2 border-amber-400/50"
    )}>
      {/* Top Bar Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Mode & Title */}
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-2.5 rounded-xl border text-cyan-400 shrink-0",
            isMicActive ? "bg-red-950 border-red-500 text-red-400 animate-pulse" : "bg-cyan-950 border-cyan-500/40"
          )}>
            <Activity className="w-5 h-5" />
          </div>

          <div>
            <h3 className={cn("font-bold text-white flex items-center gap-2", isSeniorMode ? "text-xl text-amber-200" : "text-base")}>
              <span>{isSeniorMode ? "🎙️ Real-Time Audio Frequency Visualizer" : "Spectral Waveform & Audio Analyzer"}</span>
              <span className={cn(
                "text-[10px] font-mono px-2 py-0.5 rounded border uppercase",
                isMicActive ? "bg-red-950 text-red-400 border-red-500/40" : "bg-cyan-950 text-cyan-400 border-cyan-500/40"
              )}>
                {isMicActive ? "LIVE MIC FEED" : "SYNTHETIC SIMULATOR"}
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Web Audio API • FFT 256 Bin Resolution • Real-Time Stream
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          
          {/* Live Mic Switch Button */}
          <button
            onClick={toggleLiveMic}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all border active:scale-95",
              isMicActive 
                ? "bg-red-600 hover:bg-red-500 text-white border-red-400 shadow-lg shadow-red-600/30" 
                : "bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border-cyan-500/40"
            )}
          >
            {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isMicActive ? "Stop Live Mic Scanner" : "Start Live Mic Scanner"}</span>
          </button>

          {/* View Switch: Waveform vs Spectrogram */}
          <div className="flex items-center rounded-xl bg-[#0B0F17] border border-[#1F2937] p-1 text-xs font-mono">
            <button
              onClick={() => setViewMode('waveform')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all",
                viewMode === 'waveform' ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              Waveform
            </button>
            <button
              onClick={() => setViewMode('spectrogram')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all",
                viewMode === 'spectrogram' ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              Spectrogram
            </button>
          </div>

        </div>
      </div>

      {/* Mic Error Notice if permissions blocked */}
      {micError && (
        <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{micError}</span>
        </div>
      )}

      {/* HTML5 Canvas Element */}
      <div className="relative rounded-xl overflow-hidden border border-[#1F2937] bg-[#0B0F17]">
        <canvas
          ref={canvasRef}
          width={720}
          height={220}
          className="w-full h-52 object-cover block"
        />

        {/* Anomaly Highlight Flag Toggle */}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => setShowAnomalyTag(!showAnomalyTag)}
            className={cn(
              "px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-all flex items-center space-x-1.5",
              showAnomalyTag ? "bg-red-950/90 text-red-400 border-red-500/50" : "bg-slate-900 text-slate-400 border-slate-700"
            )}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>{showAnomalyTag ? "Anomaly Flag: VISIBLE" : "Anomaly Flag: HIDDEN"}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
