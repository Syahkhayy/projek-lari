/**
 * endurance.ts — Kura's Endurance Engine
 * Endurance is stored as km internally. Higher = stronger = better.
 *
 * Think of it like this:
 *   - Kura starts at 1km — barely able to move
 *   - Every run makes him stronger (+0.7 km)
 *   - Skipping days makes him weaker (decay)
 *   - He can reach up to 42km — full marathon, peak condition
 */

import {
  ENDURANCE_MIN,
  ENDURANCE_MAX,
  ENDURANCE_IMPROVEMENT,
  DECAY_SMALL,
  DECAY_MODERATE,
  DECAY_HEAVY,
} from "./constants";

// ─── Clamp ───
// Keeps endurance within the valid range (1–42 km).
// This prevents Kura from going below minimum or above marathon distance.
function clampEndurance(endurance: number): number {
  return Math.max(ENDURANCE_MIN, Math.min(ENDURANCE_MAX, endurance));
}

// ─── Improve Endurance ───
// Called after a valid run is logged.
// Adds the improvement value and clamps the result.
export function improveEndurance(currentEndurance: number): number {
  return clampEndurance(currentEndurance + ENDURANCE_IMPROVEMENT);
}

// ─── Apply Decay ───
// Called when loading the dashboard.
// Calculates how many days Kura has been inactive and subtracts decay.
export function applyDecay(currentEndurance: number, daysSinceLastRun: number): number {
  if (daysSinceLastRun <= 2) return currentEndurance; // no decay

  let decay = 0;

  if (daysSinceLastRun <= 4) {
    decay = DECAY_SMALL * daysSinceLastRun;
  } else if (daysSinceLastRun <= 7) {
    decay = DECAY_MODERATE * daysSinceLastRun;
  } else {
    decay = DECAY_HEAVY * daysSinceLastRun;
  }

  return clampEndurance(currentEndurance - decay);
}

// ─── Format Endurance ───
// Converts endurance km to a human-readable string like "5.0"
export function formatEndurance(enduranceKm: number): string {
  return enduranceKm.toFixed(1);
}

// ─── Endurance Progress ───
// Returns a percentage (0–100) representing how fit Kura is.
// 0% = weakest (1km), 100% = strongest (42km)
export function getEnduranceProgress(enduranceKm: number): number {
  const range = ENDURANCE_MAX - ENDURANCE_MIN; // 41
  const position = enduranceKm - ENDURANCE_MIN;
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
// Returns a motivational message based on Kura's current endurance.
export function getStatusMessage(enduranceKm: number): string {
  if (enduranceKm >= 35) return "Kura is unstoppable! 🏃‍♂️💨";
  if (enduranceKm >= 21) return "Kura is getting strong 💪";
  if (enduranceKm >= 10) return "Kura is building stamina 🎵";
  if (enduranceKm >= 5) return "Kura is warming up 🐢";
  return "Kura is just starting... 😴";
}
