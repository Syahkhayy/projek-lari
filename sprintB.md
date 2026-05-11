# Sprint B — Onboarding & Polish (Phase 4)

The goal: Ensure users understand the "Companionship" concept immediately and the app feels professional/stable.

---

## First-Time Onboarding
- [x] Create `components/OnboardingModal.tsx` — Pixel-style modal with "How it works".
- [x] Add `has_seen_onboarding` flag to Supabase `profiles` table logic.
- [x] Implement `?` Info button in Dashboard header to re-trigger onboarding.

## Input Hardening
- [x] Add `MAX_DISTANCE_KM = 100` constant.
- [x] Validate distance and time sanity checks in `LogRun.tsx`.
- [x] Implement friendly error toasts/messages for common failures.

## Mobile & UI Polish
- [x] Fix Mascot/Dashboard overlap on small mobile screens.
- [x] Add loading skeletons for the Endurance Card.
- [x] Ensure the Monologue Cloud tail doesn't overflow on small devices.

## Verification
- [x] Onboarding appears for new users.
- [x] Onboarding can be re-opened via the info button.
- [x] "Impossible" runs are blocked with a friendly message.
- [x] Mobile layout is clean on 375px width.
