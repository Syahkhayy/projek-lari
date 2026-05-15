# 🐢 Kura v0.1.0 Beta — Current State & Implementation Plan

## Current State Summary

After the pace → endurance migration, **Phase 1 is essentially complete**. Phases 2, 3, and 4 are largely untouched.

---

## Phase-by-Phase Audit

### ✅ PHASE 1 — Core Mechanics (COMPLETE)

| Item | Status | Where |
|---|---|---|
| Endurance column in DB | ✅ | Supabase `profiles.kura_endurance` |
| Default endurance = 1 | ✅ | `constants.ts` → `ENDURANCE_DEFAULT` |
| Clamp values 1–42 | ✅ | `endurance.ts` → `clampEndurance()` |
| Validate minimum 1KM | ✅ | `LogRun.tsx` → validation |
| Block multiple runs/day | ✅ | `LogRun.tsx` → `checkTodayLog()` |
| Update endurance after run | ✅ | `LogRun.tsx` → `improveEndurance()` |
| Detect inactivity duration | ✅ | `endurance.ts` → `daysSince()` |
| Apply decay rules | ✅ | `endurance.ts` → `applyDecay()` |
| Update endurance dynamically | ✅ | `dashboard/page.tsx` → on load |
| Display readable endurance | ✅ | `endurance.ts` → `formatEndurance()` |
| Show Kura clearly | ✅ | `Mascot.tsx` — draggable on dashboard |
| Show endurance immediately | ✅ | Endurance card on dashboard |
| Endurance progress bar | ✅ | Progress bar with Weak → Strong |
| Log run button | ✅ | LogRun component |

---

### 🟡 PHASE 2 — Emotional Layer (NOT STARTED)

This is where Kura starts feeling "alive." Currently, the Mascot walks around and says random things, but it's **not connected to endurance** at all.

| Item | Status | Notes |
|---|---|---|
| Create endurance ranges for moods | ❌ | Need to define: weak / trying / runner / elite thresholds |
| Create visual variations (sprites) | ✅ | Generated: kura-weak.png, kura-trying.png, kura-runner.png, kura-elite.png |
| Connect moods to endurance | ❌ | Mascot component needs to receive endurance and change appearance |
| Add encouraging messages (post-run) | ❌ | Messages after a successful run |
| Add inactivity messages | ❌ | Sad/worried messages when decay is happening |
| Add milestone messages | ❌ | Special messages at 5km, 10km, 21km, 42km |
| Randomize message selection | 🟡 | Mascot already has random messages, but they're static/generic |
| Keep Kura visible at all times | ✅ | Already done |
| Prioritize companionship over analytics | ❌ | Dashboard still feels like a tracker, not a companion |

---

### 🔴 PHASE 3 — Narrative Layer (NOT STARTED)

| Item | Status | Notes |
|---|---|---|
| Write 10–20 lore snippets | ❌ | Content writing needed |
| Create pacing for story reveals | ❌ | Logic for when to show which snippet |
| Add snippets to dashboard | ❌ | UI component needed |
| Keep presentation subtle | ❌ | Design decision |

---

### 🟡 PHASE 4 — Beta Polish (PARTIALLY DONE)

| Item | Status | Notes |
|---|---|---|
| Prevent duplicate logs | ✅ | `checkTodayLog()` blocks second run |
| Validate input properly | 🟡 | Basic validation exists, but no max distance cap or time sanity check |
| Handle loading states | 🟡 | Dashboard has "FINDING KURA...", LogRun has "TRAINING...", but no skeleton/shimmer |
| Handle Supabase errors | 🟡 | Errors caught but shown as raw messages, not user-friendly |
| Ensure responsive layouts | 🟡 | Grid breakpoints exist, but not fully mobile-tested |
| Prevent overflow issues | ❌ | Not verified |
| Optimize touch interaction | 🟡 | Mascot has touch support, but forms are basic |
| Explain Kura concept (onboarding) | ❌ | No onboarding screen exists |
| Explain endurance meaning | ❌ | Only a small disclaimer text |
| Explain companionship idea | ❌ | Nothing explains this to new users |

---

## Recommended Execution Order

Based on the roadmap's stated goal:

> *"Can users emotionally care about Kura enough to return voluntarily?"*

### Sprint A — Emotional Core (Phase 2, highest impact)

1. **Kura Mood System** — Define endurance ranges, connect to Mascot visually
2. **Dynamic Messages** — Endurance-aware messages (post-run, inactivity, milestones)
3. **Companion-first Dashboard** — Make Kura the centerpiece, not the endurance number

### Sprint B — Onboarding & Polish (Phase 4)

4. **First-time Onboarding** — Simple welcome modal on first login + ? info button
5. **Input Validation Hardening** — Max distance cap, time sanity, friendly error messages
6. **Mobile Polish** — Test & fix responsive issues, overflow, touch targets

### Sprint C — Story Layer (Phase 3)

7. **Lore Snippets** — Write content, build reveal system
8. **Dashboard Story Section** — Subtle placement
