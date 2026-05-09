/**
 * Font Mapper — converts burst signals into visual CSS properties.
 * Three axes: font-weight, color/opacity, letter-spacing gap.
 */

import type { Burst } from './burstDetector';

export interface BurstStyle {
  fontWeight: number;
  color: string;
  opacity: number;
  marginLeft: string; // pause gap
  letterSpacing?: string;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

export function mapBurstToStyle(burst: Burst, darkMode = false): BurstStyle {
  const { confidence, hesitation, pauseBefore } = burst;

  // ── Axis 1: Font Weight ──────────────────────────────────────────────────
  // confidence 0 → 200, 0.5 → 500, 1.0 → 800
  const rawWeight = confidence < 0.5
    ? lerp(200, 500, confidence * 2)
    : lerp(500, 800, (confidence - 0.5) * 2);
  // Round to nearest 100 for variable-font axis
  const fontWeight = Math.round(rawWeight / 50) * 50;

  // ── Axis 2: Color & Opacity ──────────────────────────────────────────────
  let color: string;
  if (darkMode) {
    // Hesitant → muted brown, confident → warm off-white
    const r = Math.round(lerp(90, 240, confidence));
    const g = Math.round(lerp(80, 232, confidence));
    const b = Math.round(lerp(72, 222, confidence));
    color = `rgb(${r},${g},${b})`;
  } else {
    // Hesitant → warm gray (#8A8580), confident → near-black (#1A1A1A)
    const r = Math.round(lerp(138, 26, confidence));
    const g = Math.round(lerp(133, 26, confidence));
    const b = Math.round(lerp(128, 26, confidence));
    color = `rgb(${r},${g},${b})`;
  }

  const opacity = lerp(0.65, 1.0, confidence);

  // ── Axis 3: Pause gap ────────────────────────────────────────────────────
  // pauseBefore 800ms → 4px, 3000ms+ → 20px
  const gapPx = pauseBefore > 800
    ? Math.min(20, 4 + ((pauseBefore - 800) / 2200) * 16)
    : 0;
  const marginLeft = gapPx > 0 ? `${gapPx}px` : '0';

  // Slight letter-spacing tightening on confident bursts
  const letterSpacing = confidence > 0.75 ? '-0.01em' : undefined;

  return { fontWeight, color, opacity, marginLeft, letterSpacing };
}