
# 🐢 Kura Project Summary

## 🎯 Project Goals

Kura is a beginner-friendly gamified running app focused on emotional companionship and consistency.

The app is NOT designed to be:

* a hardcore fitness tracker
* a competitive running platform
* a data-heavy analytics app

Instead, Kura focuses on:

* emotional connection
* gentle motivation
* consistency over perfection
* helping beginners build sustainable running habits

The core concept is:

> The user’s real-life running helps Kura improve, evolve, protect his village, and slowly defeat his inner dark voice.

The emotional loop is:

> “I want to help Kura improve.”

instead of:

> “I need to maintain a streak.”

Core Loop : 
    → User runs
    → Kura endurance improves
    → Kura evolves
    → User gets curious
    → User returns
    → Final race slowly approaches

---

# 🧭 Product Identity

Kura’s identity is built around:

* folklore-inspired storytelling
* companionship
* emotional progression
* soft motivation
* visible improvement

What makes Kura unique compared to normal fitness apps:

* Kura is a companion, not a statistic
* Progress is emotional and visual
* Endurance represents Kura’s condition, not the user’s real endurance
* Users are encouraged to return because they care about Kura

---

# 🚀 Versioning Philosophy

## Patch Updates — `0.0.X`

Used for:

* bug fixes
* UI fixes
* small improvements
* non-major adjustments

Examples:

* fixing layout issues
* correcting pace display
* improving loading states

---

## Minor Updates — `0.X.0`

Used for:

* meaningful new systems
* gameplay improvements
* retention-focused additions
* beta milestones

Examples:

* Kura evolution
* story progression
* journey milestones

---

## Major Updates — `X.0.0`

Used for:

* major public releases
* polished complete experiences
* identity-defining changes

Examples:

* official launch
* full story mode
* complete progression systems

---

# 🎯 v0.1.0 Beta Goal

The goal of version 0.1.0 is NOT to create a full game.

The goal is:

> “Can users emotionally care about Kura enough to return voluntarily?”

Success means:

* users return consistently
* users mention Kura emotionally
* users feel attached to Kura’s progress
* users understand the companionship concept immediately

---

# 🏗️ PHASE 1 — Core Mechanics

## Purpose

This phase creates the functional gameplay loop.

Without this phase:

* the app has no progression
* Kura cannot improve
* users have no reason to return

This phase establishes:

* running
* endurance progression
* decay system
* dashboard functionality

---

## Core Systems

### Endurance System

Kura uses an endurance-based progression system instead of streaks.

Concept:

* endurance improves when users run
* endurance decays naturally with inactivity
* higher endurance means stronger Kura

Endurance range:

* weakest = 1km
* strongest = 42km

Internal representation:

* stored in float (km) for easier calculations

---

### Run Logging System

Rules:

* minimum 1KM
* one run per day
* manual input only

Purpose:

* encourage real effort
* prevent spam logging
* keep system simple for beginners

---

### Endurance Decay System

Purpose:

* encourage consistency without harsh punishment

Behavior:

* short inactivity → small decay
* long inactivity → heavier decay
* no hard reset system

This avoids toxic streak pressure.

---

## Phase 1 Checklist 

### Database

* [ ] Update `endurance` column
* [ ] Default endurance = 1
* [ ] Clamp values between 1 and 42

### Run Logging

* [✅] Validate minimum 1KM
* [✅] Block multiple runs per day
* [ ] Update endurance after run

### Pace Decay

* [✅] Detect inactivity duration
* [ ] Apply decay rules
* [ ] Update endurance dynamically

### Pace Formatting

* [✅] Convert seconds → mm:ss
* [ ] Display readable endurance

### Dashboard

* [✅] Show Kura clearly
* [ ] Show endurance immediately
* [ ] Add endurance progress bar
* [✅] Add log run button

---

# 🐢 PHASE 2 — Emotional Layer

## Purpose

This phase creates emotional attachment and retention.

Without this phase:

* the app becomes a normal tracker
* users lose emotional connection
* retention becomes weak

This phase makes Kura feel alive.

---

## Emotional Systems

### Kura Mood States

Kura changes visually based on endurance.

Examples:

* weak
* trying
* runner
* elite

Purpose:

* visual progression
* emotional feedback
* visible improvement

---

### Dynamic Messages

Messages react to:

* successful runs
* inactivity
* milestones
* Kura condition

Tone:

* soft
* encouraging
* beginner-friendly

Purpose:

* reinforce emotional bond
* reduce guilt
* encourage return behavior

---

## Phase 2 Checklist

### Mood States

* [ ] Create endurance ranges
* [ ] Create visual variations
* [ ] Connect moods to endurance

### Messages

* [ ] Add encouraging messages
* [ ] Add inactivity messages
* [ ] Add milestone messages
* [ ] Randomize message selection

### Emotional UI

* [✅] Keep Kura visible at all times
* [ ] Prioritize companionship over analytics

---

# 🗺️ PHASE 3 — Narrative Layer

## Purpose

Introduce world-building and story progression.

This phase keeps users curious about:

* Kura
* the village
* AR. Nab army
* the larger story

The story should remain lightweight during beta.

---

## Narrative Systems

### Story Snippets

Tiny lore messages appear over time.

Examples:

* There smokes seen in the west, big enough for an army camp.”
* “AR’s soldiers were seen nearby.”
* “The village believes in Kura.”
* “Ciktam told Kura that Oyen agreed to training with him.”

Purpose:

* strengthen immersion
* remind users why Kura trains
* maintain curiosity

---

## Phase 3 Checklist

### Story Content

* [ ] Write 10–20 lore snippets
* [ ] Create pacing for story reveals

### Placement

* [ ] Add snippets to dashboard
* [ ] Keep presentation subtle

---

# 📱 PHASE 4 — Beta Polish

## Purpose

Prevent users from quitting due to poor experience.

This phase improves:

* usability
* responsiveness
* onboarding clarity
* stability

---

## Polish Systems

### Error Handling

Purpose:

* avoid frustration
* improve trust

### Mobile Optimization

Purpose:

* ensure comfortable phone usage
* improve readability

### Onboarding

Purpose:

* explain Kura immediately
* explain endurance system clearly
* avoid confusion

Important clarification:

> “Kura’s endurance is not your real endurance.”

---

## Phase 4 Checklist

### Error Handling

* [✅] Prevent duplicate logs
* [ ] Validate input properly
* [ ] Handle loading states
* [ ] Handle Supabase errors

### Mobile Optimization

* [ ] Ensure responsive layouts
* [ ] Prevent overflow issues
* [ ] Optimize touch interaction

### Onboarding

* [ ] Explain Kura concept
* [ ] Explain endurance meaning
* [ ] Explain companionship idea

---

# ✅ Final v0.1.0 Beta Checklist

## Core Functionality

* [✅] Authentication works
* [✅] Run logging works
* [✅] Endurance system works
* [✅] Decay system works
* [✅] Dashboard stable

## Emotional Experience

* [✅] Kura always visible
* [✅] Mood states update correctly
* [✅] Messages rotate properly

## User Experience

* [✅] Mobile-friendly
* [✅] Beginner-friendly
* [✅] Clear onboarding
* [✅] Minimal bugs

## Beta Testing

* [ ] Test with 3–5 users
* [ ] Observe confusion points
* [ ] Observe emotional reactions
* [ ] Measure return behavior

---

# 🧠 Core Design Philosophy

Every feature should strengthen:

> the bond between the user and Kura.

If a feature does not strengthen companionship, emotional attachment, or consistency:

* simplify it
* delay it
* or remove it

The product’s long-term strength is NOT complexity.

It is:

* emotional attachment
* visible growth
* sustainable consistency
* companionship


--------------------------------------------------------------------------------------------------------------------------------------------

🧭 Suggested Roadmap
0.1.0 Beta

“Can this habit loop work?”

Focus:

consistency
emotional attachment
simplicity
0.2.0

“Kura becomes alive”

Add:

evolution stages
milestone journey
simple story progression
0.3.0

“Training becomes meaningful”

Add:

milestone challenges
beginner plans
pace-based unlocks
1.0.0

“The full Kura experience”

Only when:

polished
emotionally cohesive
stable
tested by real users