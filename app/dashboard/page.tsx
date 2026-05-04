"use client";

import { PACE_DEFAULT } from "@/lib/constants";
import { formatPace, getPaceProgress, getStatusMessage } from "@/lib/pace";
import Mascot from "@/components/Mascot";
import "./stylesheet.css";

export default function DashboardPage() {
  // For now, we use the default pace (1200s = 20:00 min/km).
  // In Step 3, this will come from Supabase.
  const currentPace = PACE_DEFAULT;

  // Derived values from the pace engine
  const paceDisplay = formatPace(currentPace);
  const progress = getPaceProgress(currentPace);
  const statusMessage = getStatusMessage(currentPace);

  return (
    <div className="dashboard-layout">
      {/* ─── Header ─── */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">KURA</h1>
          <p className="dashboard-subtitle">{statusMessage}</p>
        </div>
      </header>

      {/* ─── Pace Card ─── */}
      <section className="pace-card pixel-card">
        <div className="pace-label">KURA CURRENT PACE</div>
        <div className="pace-value">{paceDisplay}</div>
        <div className="pace-unit">min/km</div>

        {/* ─── Progress Bar ─── */}
        <div className="progress-container">
          <div className="progress-labels">
            <span className="progress-label-slow">Slow</span>
            <span className="progress-label-fast">Fast</span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ "--progress": `${progress}%` } as React.CSSProperties}
            ></div>
          </div>
          <div className="progress-percent">{progress}%</div>

          <div className="pace-label" style={{ fontSize: "0.5rem", marginTop: "20px" }}>THIS IS KURA'S PACE, NOT YOUR'S </div>
        </div>


      </section>

      {/* ─── Placeholder for future Log Run button (Step 2) ─── */}
      <section className="action-area">
        <p className="action-hint">Run logging coming soon...</p>
      </section>

      <Mascot />
    </div>
  );
}
