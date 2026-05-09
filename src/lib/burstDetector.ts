/**
 * Burst Detector — groups characters into typing bursts for legible styling.
 * Prevents the "ransom note" effect of per-character styling.
 */

import type { TypingSignal } from './signalProcessor';

export interface Burst {
  id: string;
  text: string;
  confidence: number;
  hesitation: number;
  pauseBefore: number;   // ms pause that preceded this burst
  avgIKI: number;
}

interface PendingChar {
  char: string;
  signal: TypingSignal;
}

const BURST_SPEED_RATIO = 2.0;   // 2× speed change splits burst
const MIN_BURST_CHARS   = 3;
const PAUSE_THRESHOLD   = 800;

let _idCounter = 0;
const uid = () => `b${++_idCounter}`;

export class BurstDetector {
  private pending: PendingChar[] = [];
  private currentBurstAvgIKI = 200;

  reset() {
    this.pending = [];
    this.currentBurstAvgIKI = 200;
    _idCounter = 0;
  }

  /** Push a character + its signal. Returns completed bursts (may be empty). */
  push(char: string, signal: TypingSignal): Burst[] {
    const completed: Burst[] = [];

    // A pause always flushes the current pending burst
    if (signal.pause > PAUSE_THRESHOLD && this.pending.length >= MIN_BURST_CHARS) {
      completed.push(this.flush());
    }

    // Speed divergence splits burst (but only once we have enough chars)
    if (
      this.pending.length >= MIN_BURST_CHARS &&
      signal.iki > 0 && signal.iki < 2000
    ) {
      const ratio = signal.iki / (this.currentBurstAvgIKI || 200);
      if (ratio > BURST_SPEED_RATIO || ratio < 1 / BURST_SPEED_RATIO) {
        completed.push(this.flush());
      }
    }

    this.pending.push({ char, signal });

    // Update running IKI avg for current burst
    const validIKIs = this.pending
      .map(p => p.signal.iki)
      .filter(v => v > 0 && v < 2000);
    this.currentBurstAvgIKI = validIKIs.length
      ? validIKIs.reduce((a, b) => a + b, 0) / validIKIs.length
      : 200;

    return completed;
  }

  /** Force-flush whatever is pending (e.g. on space/newline). */
  flushPending(): Burst | null {
    if (this.pending.length === 0) return null;
    return this.flush();
  }

  private flush(): Burst {
    const chars = this.pending;
    this.pending = [];
    this.currentBurstAvgIKI = 200;

    const avgConf = chars.reduce((s, c) => s + c.signal.confidence, 0) / chars.length;
    const avgHes  = chars.reduce((s, c) => s + c.signal.hesitation, 0) / chars.length;
    const avgIKI  = chars
      .map(c => c.signal.iki)
      .filter(v => v > 0 && v < 2000)
      .reduce((s, v, _, a) => s + v / a.length, 0) || 200;
    const pauseBefore = chars[0]?.signal.pause || 0;

    return {
      id: uid(),
      text: chars.map(c => c.char).join(''),
      confidence: Math.max(0, Math.min(1, avgConf)),
      hesitation: Math.max(0, Math.min(1, avgHes)),
      pauseBefore,
      avgIKI,
    };
  }
}