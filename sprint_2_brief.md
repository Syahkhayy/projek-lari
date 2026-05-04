# Sprint 2 Project Brief — Kura Running Habit App

## 🧠 Overview
Sprint 2 focuses on building the **core emotional loop** of the app: helping users stay consistent in running through a gamified character named **Kura**.

Instead of streaks or rigid daily systems, the app uses a **Pace System** to represent Kura’s condition. This makes progress feel more natural, forgiving, and beginner-friendly.

The goal of Sprint 2 is NOT to build a full game.
It is to build a **habit feedback system that users feel emotionally connected to.**

---

# ⚙️ Features (Max 3)

## 1. 🏃 Pace System (Core Mechanic)
Pace replaces traditional streaks or XP systems.
It represents Kura’s physical condition and training momentum.

### Concept:
- Pace is measured in **min/km format**
- Range:
  - Worst: **20:00 min/km** (very low fitness / inactive)
  - Best: **2:30 min/km** (peak condition)

### Internal Storage:
- Pace is stored in **seconds per km** for simplicity:
  - 20:00 = 1200 seconds
  - 2:30 = 150 seconds

### Behavior:
- Better consistency → Pace improves (lower value)
- Inactivity → Pace worsens (higher value)

### Why this works:
- Feels like real running metric
- Easy to understand visually
- Encourages consistency without pressure

---

## 2. 🏃 Run Logging System (Minimum Effort Rule)
This is the main interaction of the app.

### Rules:
- User can log **only 1 run per day**
- Minimum requirement: **1KM per run**
- Distance is manually input by user

### Effects:
- Each valid run improves Kura’s pace
- Encourages real participation instead of spam logging

### Pace Improvement Logic:
- Every valid run improves pace by a fixed amount (e.g. 20 sec/km improvement)
- Pace is clamped so it never goes beyond best limit (150 seconds)

---

## 3. ⏳ Natural Pace Decay System (No Streak Pressure)
Instead of streaks, the system uses **time-based decay** to represent loss of momentum.

### Concept:
- If user does not run, Kura slowly loses fitness
- No hard reset immediately
- Only gradual decay unless inactivity is long

### Decay Rules:
- 1–2 days inactive → small decay
- 3–4 days inactive → moderate decay
- 5+ days inactive → heavy decay
- Pace is capped at worst level (1200 seconds)

### Reset Rule:
- There is no instant reset system
- Progress always decays naturally

### Why this works:
- Less guilt-driven than streaks
- More realistic habit modeling
- Encourages return without punishment

---

# 📱 App Sections / Pages

## 1. 🔐 Authentication Page (Existing)
Already implemented in Sprint 1:
- Email login/signup
- Verification via email (SMTP + Supabase)

---

## 2. 📊 Dashboard (Main Page)
This is the core experience of the app.

### Displays:
- Kura’s current pace (e.g. 6:40 min/km)
- Visual progress bar (fast → slow scale)
- Last run date
- Status message (based on pace)

### Actions:
- “Log Run” button
- Manual input for distance (≥ 1KM)

### Emotional Feedback:
- Encouraging messages based on performance
- Soft tone (no punishment language)

---

## 3. 📜 History Page (Optional)
Simple log of past runs:
- Date
- Distance
- Optional pace snapshot

This is not required for Sprint 2 but can be added if time allows.

---

# 🧭 Build Steps (Detailed Execution Plan)

## Step 1 — Database Setup (Supabase)
Create or extend table: `runs`

### Fields:
- id (primary key)
- user_id (foreign key)
- distance (float, minimum 1.0)
- created_at (timestamp)

### Optional (recommended):
- Store last_run_date in user profile or derive from latest run

---

## Step 2 — Add Pace Field
Add to user profile or separate table:

- `pace_seconds` (integer)
- Default value: **1200 (20:00 min/km)**

---

## Step 3 — Implement Run Logging Logic

### When user logs a run:
1. Validate distance ≥ 1KM
2. Check if user already logged today → block if true
3. Insert run into database
4. Update pace:
   - Reduce pace by fixed improvement value (e.g. -20 seconds)
   - Clamp to minimum (150 seconds)

---

## Step 4 — Implement Natural Decay System
Triggered on dashboard load:

### Logic:
1. Get last run date
2. Calculate days since last run
3. Apply decay based on inactivity:
   - ≤2 days → small decay
   - 3–4 days → moderate decay
   - ≥5 days → heavy decay
4. Update pace in database
5. Clamp to max (1200 seconds)

---

## Step 5 — Pace Conversion & Display
Convert stored seconds into UI format:

### Formula:
- minutes = floor(seconds / 60)
- seconds = remainder

### Display format:
- `5:40 /km`

---

## Step 6 — Visual Progress Bar

### Concept:
- Lower pace = better
- Higher pace = worse

### Calculation:
- Convert pace into percentage between:
  - Best = 150 seconds
  - Worst = 1200 seconds

### UI:
- Horizontal bar showing improvement visually

---

## Step 7 — Status Messaging System
Based on current pace range:

### Example states:
- Elite (fast pace): "Kura is flying"
- Good: "Kura is getting strong"
- Average: "Kura is building rhythm"
- Slow: "Kura is just starting"

Tone must remain soft and encouraging.

---

# 🎯 Sprint 2 Success Criteria
Sprint 2 is successful if:

- User can log a run easily
- User understands Kura’s condition via pace
- User feels encouraged, not pressured
- User can return after missing days without guilt
- Visual feedback makes progress feel real

---

# 🧠 Design Philosophy

This sprint is built around:
- Consistency over perfection
- Gentle motivation over pressure
- Emotional connection to Kura
- Simple mechanics, not complex game systems

---

# ❓ Open Questions for Next Iteration

1. Should pace improvements scale with distance in Sprint 3?
2. Should there be milestone messages at certain pace thresholds?
3. Should inactivity ever fully reset progress or only degrade it?
4. Should future versions introduce "training types" (easy run, long run, etc.)?

---

End of Sprint 2 Brief 🚀

