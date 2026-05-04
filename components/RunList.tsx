"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import "./RunList.css";

interface Run {
  id: string;
  distance: number;
  time: number;
  created_at: string;
  kura_pace_snapshot?: number;
}

interface RunListProps {
  refreshKey?: number;
  onPaceUpdate: (newKuraPace: number) => void;
}

export default function RunList({ refreshKey, onPaceUpdate }: RunListProps) {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    try {
      const { data, error } = await supabase
        .from("runs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRuns(data || []);
    } catch (err) {
      console.error("Error fetching runs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, [refreshKey]);

  const handleDelete = async (run: Run) => {
    if (!confirm("Are you sure you want to delete this run?")) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Delete the run
      const { error: deleteError } = await supabase
        .from("runs")
        .delete()
        .eq("id", run.id);

      if (deleteError) throw deleteError;

      // 2. Revert Kura's Pace if a snapshot exists
      if (run.kura_pace_snapshot) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ current_kura_pace: run.kura_pace_snapshot })
          .eq("id", user.id);

        if (profileError) throw profileError;

        // 3. Update the UI state
        onPaceUpdate(run.kura_pace_snapshot);
      }

      fetchRuns(); // Refresh the history list
    } catch (err) {
      console.error("Error deleting run:", err);
      alert("Failed to delete run.");
    }
  };

  if (loading) {
    return <div className="run-list-empty">FETCHING HISTORY...</div>;
  }

  return (
    <div className="run-history">
      <h2 className="history-title">TRAINING HISTORY</h2>

      {runs.length === 0 ? (
        <div className="run-list-empty">
          Kura's diary is empty. Start training to see your history!
        </div>
      ) : (
        <div className="history-stack">
          {runs.map((run) => {
            const date = new Date(run.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            // Calculate User Pace (min/km)
            const userPaceRaw = run.time / run.distance;
            const userPaceMins = Math.floor(userPaceRaw);
            const userPaceSecs = Math.round((userPaceRaw - userPaceMins) * 60);
            const userPaceFormatted = `${userPaceMins}:${userPaceSecs.toString().padStart(2, '0')}`;

            return (
              <div key={run.id} className="history-card pixel-card">
                <div className="history-main">
                  <div className="history-date">{date}</div>
                  <div className="history-distance">{run.distance} KM</div>
                </div>

                <div className="history-stats">
                  <div className="h-stat">
                    <span className="h-label">YOUR PACE</span>
                    <span className="h-value">{userPaceFormatted}</span>
                  </div>
                  <div className="h-stat">
                    <span className="h-label">TIME</span>
                    <span className="h-value">{run.time}m</span>
                  </div>

                  <button
                    onClick={() => handleDelete(run)}
                    className="delete-btn"
                    title="Delete Run"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
