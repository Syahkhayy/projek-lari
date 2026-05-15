# Project Brief: Gamified Running Web App (Sprint 1)

## 🧱 Tech Stack
- Frontend/Backend: Next.js (App Router)
- Styling: Tailwind CSS
- Backend Services: Supabase (Auth + Database)
- Deployment: Vercel

---

## Theme
- Pixel art like zelda
- Playful
- Motivating
- Colourful but calm

## 📁 Folder Structure
/app
  /login
  /dashboard
  /api
/components
  RunForm.tsx
  RunList.tsx
/lib
  supabaseClient.ts
  utils.ts

---

## 🗄️ Database Structure

### runs table
- id (uuid)
- user_id (uuid)
- distance (float)   // in km
- time (float)       // in minutes
- created_at (timestamp)

---

## 🚀 Features (Sprint 1 Only)
1. User Authentication (signup/login)
2. Log a Run (distance + time)
3. Dashboard (view list of runs)

---

## 🔄 UI Flows

### 1. Login Flow
User signs up / logs in → redirected to dashboard

### 2. Dashboard
- Welcome message
- List of runs:
  - distance
  - time
  - pace (calculated)

### 3. Log Run Flow
User inputs:
- distance
- time

Click “Save Run” →

### 4. Confirmation State
Show:
✅ Run Saved!
- Distance
- Time
- Pace

Message:
"Nice work showing up today 👊"

---

## 🛠️ Build Steps

1. Setup Next.js project
2. Install Tailwind CSS
3. Setup Supabase project
4. Implement authentication (login/signup)
5. Create runs table in Supabase
6. Build Run Form UI
7. Save run data to database
8. Fetch and display runs in dashboard
9. Add pace calculation utility
10. Add confirmation UI after saving run

---

## ⭐ Most Important
The app must make the user feel:
“I did well today”

Focus on:
- simplicity
- quick interaction
- positive feedback after logging a run

---

## 🧠 UX Principle
- Avoid negative comparisons
- Reward completion, not performance
- Keep friction low (fast input)
- Provide immediate positive feedback

---

## ✅ Definition of Done

- User can sign up and log in
- User can log a run (distance + time)
- Run is saved in database
- Runs are displayed in dashboard
- Pace is calculated and shown
- Confirmation message appears after logging

---

End of Sprint 1 Project Brief
