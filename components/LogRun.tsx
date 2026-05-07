"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { PACE_IMPROVEMENT, PACE_BEST, MIN_DISTANCE_KM } from "@/lib/constants";
import { improvePace } from "@/lib/pace";
import "./LogRun.css";

interface LogRunProps {
  currentKuraPace: number;
  onLogSuccess: (newKuraPace: number) => void;
  refreshKey?: number;
}

export default function LogRun({ currentKuraPace, onLogSuccess, refreshKey }: LogRunProps) {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState(""); // User's actual time
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  useEffect(() => {
    setIsSuccess(false); // Reset success state on refresh
    checkTodayLog();
  }, [refreshKey]);


  const checkTodayLog = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("runs")
      .select("created_at")
      .eq("user_id", user.id)
      .gte("created_at", `${today}T00:00:00Z`)
      .lte("created_at", `${today}T23:59:59Z`)
      .limit(1);

    if (data && data.length > 0) {
      setHasLoggedToday(true);
    } else {
      setHasLoggedToday(false); // Make sure to reset if no log found
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const distNum = parseFloat(distance);
    const timeNum = parseFloat(time);

    try {
      // 1. Validation
      if (isNaN(distNum) || distNum < MIN_DISTANCE_KM) {
        throw new Error(`Kura needs at least ${MIN_DISTANCE_KM}km to improve!`);
      }
      if (isNaN(timeNum) || timeNum <= 0) {
        throw new Error("Please enter a valid time for your run.");
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in to train Kura.");

      // 2. Insert Run (Includes distance, time, and Kura snapshot)
      const { error: runError } = await supabase.from("runs").insert({
        user_id: user.id,
        distance: distNum,
        time: timeNum,
        kura_pace_snapshot: currentKuraPace // Store Kura's pace BEFORE this run
      });
      if (runError) throw runError;

      // 3. Update Kura's Current Pace
      const newKuraPace = improvePace(currentKuraPace);
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ current_kura_pace: newKuraPace })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 4. Success
      setIsSuccess(true);
      setHasLoggedToday(true);
      onLogSuccess(newKuraPace);
    } catch (err: any) {
      setError(err.message || "Failed to log run.");
    } finally {
      setLoading(false);
    }
  };

  if (hasLoggedToday && !isSuccess) {
    return (
      <div className="log-run-card logged-today">
        <p className="log-message">Kura is exhausted from today's run. Come back tomorrow!</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="log-run-card success">
        <p className="log-message">Great run! Kura's pace improved!</p>
      </div>
    );
  }

  return (
    <div className="log-run-card pixel-card">
      <h3 className="log-title">LOG TODAY'S RUN</h3>
      <form onSubmit={handleSubmit} className="log-form">
        <div className="log-inputs-row">
          <div className="input-group">
            <label htmlFor="distance">Distance (km)</label>
            <input
              id="distance"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="pixel-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="time">Time (min)</label>
            <input
              id="time"
              type="number"
              step="1"
              placeholder="0"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pixel-input"
            />
          </div>
        </div>

        {error && <p className="log-error">{error}</p>}

        <button type="submit" className="pixel-btn pixel-btn-primary full-width" disabled={loading}>
          {loading ? "TRAINING..." : "TRAIN KURA"}
        </button>
      </form>
    </div>
  );
}
