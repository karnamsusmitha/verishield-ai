/**
 * VeriShield AI - Backend API Integration Service
 * Base URL: http://localhost:8000
 * Includes automatic fallback to local simulated mode if the backend is offline/unreachable.
 */

const BACKEND_BASE_URL = "http://localhost:8000";

/**
 * Check backend health status
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API offline, operating in client fallback mode:", err.message);
  }
  return null;
}

/**
 * Send audio file to FastAPI backend (/api/v1/analyze-audio) with automatic fallback
 */
export async function analyzeAudioAPI(file, fallbackPayload) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BACKEND_BASE_URL}/api/v1/analyze-audio`, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(3500)
    });

    if (response.ok) {
      const data = await response.json();
      return {
        id: `api-audio-${Date.now()}`,
        title: file.name,
        type: data.verdict === 'SYNTHETIC' ? 'AI Voice Clone' : 'Acoustic Audio',
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        riskScore: data.riskScore,
        status: data.riskScore >= 75 ? 'critical' : data.riskScore >= 40 ? 'warning' : 'safe',
        badge: data.riskScore >= 75 ? '🚨 CRITICAL AI CLONE' : data.riskScore >= 40 ? '⚠️ SUSPECT AUDIO' : '🟢 AUTHENTIC HUMAN',
        summary: `FastAPI Engine (${data.latencyMs}ms): Verdict ${data.verdict}. ${data.artifacts.join('. ')}`,
        technicalDetails: [
          `Signal Energy Variance: ${data.signalStats?.energyVariance ?? 'N/A'}`,
          `Zero-Crossing Rate: ${data.signalStats?.zeroCrossingRate ?? 'N/A'}`,
          ...data.artifacts
        ]
      };
    }
  } catch (err) {
    console.warn("FastAPI audio endpoint unreachable, reverting to client simulation:", err.message);
  }

  // Automatic fallback to simulated payload
  return fallbackPayload;
}

/**
 * Send text/SMS string to FastAPI backend (/api/v1/analyze-text) with automatic fallback
 */
export async function analyzeTextAPI(text, fallbackPayload) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/v1/analyze-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(3500)
    });

    if (response.ok) {
      const data = await response.json();
      return {
        id: `api-text-${Date.now()}`,
        title: 'SMS / Text Inspection Result',
        type: 'NLP Scam Inspection',
        sender: 'USER INPUT',
        text: text,
        riskScore: data.riskScore,
        status: data.riskScore >= 75 ? 'critical' : data.riskScore >= 40 ? 'warning' : 'safe',
        badge: data.riskScore >= 75 ? '🚨 CRITICAL PHISHING' : data.riskScore >= 40 ? '⚠️ PHISHING WARNING' : '🟢 SAFE MESSAGE',
        summary: `FastAPI Engine (${data.latencyMs}ms): ${data.summary}`,
        reasons: data.matchedKeywords
      };
    }
  } catch (err) {
    console.warn("FastAPI text endpoint unreachable, reverting to client simulation:", err.message);
  }

  // Automatic fallback to simulated payload
  return fallbackPayload;
}
