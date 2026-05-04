/**
 * pace.ts — Kura's Pace Engine
 * Pace is stored as seconds/km internally. Lower = faster = better.
 *
 * Think of it like this:
 *   - Kura starts at 1200 (20:00 min/km) — barely moving
 *   - Every run makes him a little faster (-20 seconds)
 *   - Skipping days makes him slower again (decay)
 *   - He can never go below 150 (2:30 min/km) — that's his peak
 */

import {
  PACE_WORST,
  PACE_BEST,
  PACE_IMPROVEMENT,
  DECAY_SMALL,
  DECAY_MODERATE,
  DECAY_HEAVY,
} from "./constants";

// ─── Clamp ───
// Keeps pace within the valid range (150–1200).
// This prevents Kura from becoming impossibly fast or impossibly slow.
function clampPace(pace: number): number {
  return Math.max(PACE_BEST, Math.min(PACE_WORST, pace));
}

// ─── Improve Pace ───
// Called after a valid run is logged.
// Subtracts the improvement value and clamps the result.
export function improvePace(currentPace: number): number {
  return clampPace(currentPace - PACE_IMPROVEMENT);
}

// ─── Apply Decay ───
// Called when loading the dashboard.
// Calculates how many days Kura has been inactive and adds decay.
export function applyDecay(currentPace: number, daysSinceLastRun: number): number {
  if (daysSinceLastRun <= 0) return currentPace; // Ran today, no decay

  let decay = 0;

  if (daysSinceLastRun <= 2) {
    decay = DECAY_SMALL * daysSinceLastRun;
  } else if (daysSinceLastRun <= 4) {
    decay = DECAY_MODERATE * daysSinceLastRun;
  } else {
    decay = DECAY_HEAVY * daysSinceLastRun;
  }

  return clampPace(currentPace + decay);
}

// ─── Format Pace ───
// Converts seconds/km to a human-readable string like "5:40"
export function formatPace(paceSeconds: number): string {
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = paceSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// ─── Pace Progress ───
// Returns a percentage (0–100) representing how fit Kura is.
// 0% = worst (1200s), 100% = best (150s)
export function getPaceProgress(paceSeconds: number): number {
  const range = PACE_WORST - PACE_BEST; // 1050
  const position = PACE_WORST - paceSeconds;
  return Math.round((position / range) * 100);
}

// ─── Days Since Last Run ───
// Calculates the number of full days between a date and now.
export function daysSince(dateString: string): number {
  const last = new Date(dateString);
  const now = new Date();

  // Reset both to midnight for clean day comparison
  last.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffMs = now.getTime() - last.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

// ─── Status Message ───
// Returns a motivational message based on Kura's current pace.
export function getStatusMessage(paceSeconds: number): string {
  if (paceSeconds <= 300) return "Kura is flying! 🏃‍♂️💨";
  if (paceSeconds <= 450) return "Kura is getting strong 💪";
  if (paceSeconds <= 600) return "Kura is building rhythm 🎵";
  if (paceSeconds <= 900) return "Kura is warming up 🐢";
  return "Kura is just starting... 😴";
}
