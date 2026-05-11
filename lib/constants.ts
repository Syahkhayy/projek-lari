export const APP_VERSION = "v0.0.4 Pre-Alpha";
export const FOOTER_TEXT = "Built for Champions";

// ─── Endurance System Constants ───
// Endurance is stored in km. Higher = stronger = better.
export const ENDURANCE_MIN = 1;           // 1km — Kura at his weakest
export const ENDURANCE_MAX = 42;          // 42km (marathon) — Kura at peak condition
export const ENDURANCE_DEFAULT = 1;       // New users start at minimum endurance
export const ENDURANCE_IMPROVEMENT = 0.7; // km gained per valid run

// ─── Decay Rules (km lost per inactive day) ───
export const DECAY_SMALL = 0.1;    // 3-4 days inactive
export const DECAY_MODERATE = 0.2; // 5-7 days inactive
export const DECAY_HEAVY = 0.4;    // 8+ days inactive

// ─── Run Validation ───
export const MIN_DISTANCE_KM = 1;  // Minimum 1KM per run
