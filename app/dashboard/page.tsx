import RunForm from "@/components/RunForm";
import RunList from "@/components/RunList";
import "./stylesheet.css";

export default function DashboardPage() {
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
        <RunForm />
        <RunList />
      </div>
    </div>
  );
}
