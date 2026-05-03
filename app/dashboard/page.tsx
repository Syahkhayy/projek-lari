"use client";

import { useState } from "react";
import RunForm from "@/components/RunForm";
import RunList from "@/components/RunList";
import Mascot from "@/components/Mascot";
import "./stylesheet.css";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRunSaved = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">DASHBOARD</h1>
          <p className="dashboard-subtitle">Nice work showing up today 👊</p>
        </div>
        <div className="rank-badge">Rank: Novice Runner</div>
      </header>

      <div className="dashboard-grid">
        <RunForm onRunSaved={handleRunSaved} />
        <RunList refreshKey={refreshKey} />
      </div>

      <Mascot />
    </div>
  );
}
