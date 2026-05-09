/**
 * Signal Processor — analyzes typing rhythm to compute confidence & hesitation.
 * Adapts to the user's personal baseline via EMA.
 */

const EMA_ALPHA = 0.15; // smoothing factor for baseline IKI
const PAUSE_THRESHOLD_MS = 800;
const MIN_BURST_CHARS = 3;

export interface TypingSignal {
  iki: number;          // inter-key interval ms
  burst: number;        // chars per second
  pause: number;        // ms pause before this key (0 if none)
  confidence: number;   // 0–1
  hesitation: number;   // 0–1
  type: 'insert' | 'delete';
}

export class SignalProcessor {
  private baselineIKI = 200; // personal avg IKI (ms), adapts over time
  private correctionCount = 0;
  private totalKeys = 0;
  private lastKeyTime = 0;
  private recentIKIs: number[] = [];

  reset() {
    this.baselineIKI = 200;
    this.correctionCount = 0;
    this.totalKeys = 0;
    this.lastKeyTime = 0;
    this.recentIKIs = [];
  }

  process(now: number, isDelete: boolean): TypingSignal {
    const iki = this.lastKeyTime > 0 ? now - this.lastKeyTime : 0;
    const pause = iki > PAUSE_THRESHOLD_MS ? iki : 0;
    this.lastKeyTime = now;
    this.totalKeys++;

    if (isDelete) this.correctionCount++;

    // Update baseline via EMA (only for actual typing, not huge pauses)
    if (iki > 0 && iki < 2000) {
      this.baselineIKI = this.baselineIKI * (1 - EMA_ALPHA) + iki * EMA_ALPHA;
      this.recentIKIs.push(iki);
      if (this.recentIKIs.length > 20) this.recentIKIs.shift();
    }

    // Confidence: how fast relative to personal baseline
    let confidence = 0.5;
    if (iki > 0 && iki < 2000) {
      const ratio = iki / this.baselineIKI;
      if (ratio < 0.6) confidence = 0.85 + Math.min(0.15, (0.6 - ratio) * 0.5);
      else if (ratio < 1.0) confidence = 0.5 + (1.0 - ratio) * 0.875;
      else if (ratio < 1.6) confidence = 0.5 - (ratio - 1.0) * 0.5;
      else confidence = Math.max(0.1, 0.2 - (ratio - 1.6) * 0.1);
    }

    // Correction penalty
    const correctionRate = this.totalKeys > 5 ? this.correctionCount / this.totalKeys : 0;
    confidence = Math.max(0.05, confidence - correctionRate * 0.3);

    // Hesitation: pauses + IKI variance + corrections
    const variance = this.recentIKIs.length > 3
      ? this.recentIKIs.reduce((s, v) => s + Math.pow(v - this.baselineIKI, 2), 0) / this.recentIKIs.length
      : 0;
    const normalizedVariance = Math.min(1, variance / (this.baselineIKI * this.baselineIKI));
    const hesitation = Math.min(1,
      (pause > 0 ? 0.4 : 0) +
      normalizedVariance * 0.4 +
      correctionRate * 0.3
    );

    const burst = iki > 0 && iki < 2000 ? 1000 / iki : 0;

    return {
      iki,
      burst,
      pause,
      confidence: Math.max(0, Math.min(1, confidence)),
      hesitation: Math.max(0, Math.min(1, hesitation)),
      type: isDelete ? 'delete' : 'insert',
    };
  }
}