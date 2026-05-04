export const APP_VERSION = "v0.0.3 Pre-Alpha";
export const FOOTER_TEXT = "Built for Champions";

// ─── Pace System Constants ───
// Pace is stored in seconds/km. Lower = faster = better.
export const PACE_WORST = 1200;    // 20:00 min/km — Kura at his laziest
export const PACE_BEST = 150;      // 2:30 min/km  — Kura at peak condition
export const PACE_DEFAULT = 1200;  // New users start at worst pace
export const PACE_IMPROVEMENT = 20; // Seconds improved per valid run

// ─── Decay Rules (seconds added per inactive period) ───
export const DECAY_SMALL = 10;     // 1-2 days inactive
export const DECAY_MODERATE = 30;  // 3-4 days inactive
export const DECAY_HEAVY = 60;     // 5+ days inactive

// ─── Run Validation ───
export const MIN_DISTANCE_KM = 1;  // Minimum 1KM per run
