# Sprint A — Emotional Core (Phase 2)

The goal: Make Kura feel alive. Without this, the app is just a number tracker.

---

## Mood System
- [x] Create `lib/mood.ts` — mood state logic, thresholds, message pools
  - Weak: 1–5 km
  - Trying: 5–10 km
  - Runner: 10–21 km
  - Elite: 21–42 km
- [x] Generate 4 mood sprites (weak, trying, runner, elite)
  - `public/kura-weak.png`
  - `public/kura-trying.png`
  - `public/kura-runner.png`
  - `public/kura-elite.png`

## Mascot Integration
- [x] Update `Mascot.tsx` — accept endurance prop, swap sprite by mood
- [x] Make Mascot show mood-aware random messages instead of generic ones

## Dynamic Messages
- [x] Post-run messages tied to current mood (in LogRun success state)
- [x] Inactivity-aware messages (dashboard subtitle reacts to days since last run)
- [x] Milestone messages at key endurance thresholds (5, 10, 21, 42 km)

## Dashboard Updates
- [x] Pass endurance to Mascot component
- [x] Update status message to be mood-aware (already using `getStatusMessage`)
- [x] Ensure companion feel — Kura is the focus, not the number

## Verification
- [x] Build passes
- [x] Browser test — sprite changes at different endurance levels
- [x] Messages vary based on mood state
