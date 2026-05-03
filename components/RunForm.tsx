"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { calculatePace } from "@/lib/utils";
import "./RunForm.css";

export default function RunForm({ onRunSaved }: { onRunSaved?: () => void }) {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to save a run.");
      }

      // 2. Save to Supabase
      const { error: insertError } = await supabase.from("runs").insert({
        user_id: user.id,
        distance: parseFloat(distance),
        time: parseFloat(time),
      });

      if (insertError) throw insertError;

      // 3. Trigger refresh in parent
      if (onRunSaved) onRunSaved();

      // 4. Show success state
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to save run.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDistance("");
    setTime("");
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    const pace = calculatePace(parseFloat(distance), parseFloat(time));
    
    return (
      <div className="run-form-container success-state">
        <span className="success-icon">✅</span>
        <h2 className="success-msg">Run Saved!</h2>
        
        <div className="success-stats">
          <div className="stat-item">
            <span className="stat-label">Distance</span>
            <span className="stat-value">{distance} km</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{time} min</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pace</span>
            <span className="stat-value">{pace} /km</span>
          </div>
        </div>

        <p className="motivational-msg">"Nice work showing up today 👊"</p>
        
        <button onClick={resetForm} className="log-again-btn">
          LOG ANOTHER RUN
        </button>
      </div>
    );
  }

  return (
    <div className="run-form-container">
      <h2 className="run-form-title">Log a Run</h2>
      
      <form onSubmit={handleSave} className="run-form-stack">
        {error && <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>}
        
        <div className="run-input-group">
          <label htmlFor="distance">Distance (km)</label>
          <input
            id="distance"
            type="number"
            step="0.1"
            className="run-input"
            placeholder="e.g. 5.0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="run-input-group">
          <label htmlFor="time">Time (minutes)</label>
          <input
            id="time"
            type="number"
            className="run-input"
            placeholder="e.g. 30"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? "SAVING..." : "SAVE RUN"}
        </button>
      </form>
    </div>
  );
}
