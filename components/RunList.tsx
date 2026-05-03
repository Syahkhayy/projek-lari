"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { calculatePace } from "@/lib/utils";
import "./RunList.css";

interface Run {
  id: string;
  distance: number;
  time: number;
  created_at: string;
}

export default function RunList({ refreshKey }: { refreshKey?: number }) {
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

  if (loading) {
    return <div className="run-list-container loading-state">FETCHING HISTORY...</div>;
  }

  return (
    <div className="run-list-container">
      <h2 className="run-list-title">Your History</h2>
      
      {runs.length === 0 ? (
        <div className="empty-state">
          No runs recorded yet. Your journey begins with the first step!
        </div>
      ) : (
        <div className="run-items-stack">
          {runs.map((run) => {
            const date = new Date(run.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const pace = calculatePace(run.distance, run.time);

            return (
              <div key={run.id} className="run-item-card">
                <div className="run-item-main">
                  <span className="run-item-date">{date}</span>
                  <span className="run-item-details">{run.distance} km</span>
                </div>
                
                <div className="run-item-stats">
                  <div className="run-stat-box">
                    <span className="run-stat-label">Time</span>
                    <span className="run-stat-value">{run.time}m</span>
                  </div>
                  <div className="run-stat-box">
                    <span className="run-stat-label">Pace</span>
                    <span className="run-stat-value">{pace}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
