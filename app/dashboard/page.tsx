"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ENDURANCE_DEFAULT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { formatEndurance, getEnduranceProgress, getStatusMessage, daysSince, applyDecay } from "@/lib/endurance";
import Mascot from "@/components/Mascot";
import LogRun from "@/components/LogRun";
import RunList from "@/components/RunList";
import "./stylesheet.css";

export default function DashboardPage() {
  const router = useRouter();
  const [currentEndurance, setCurrentEndurance] = useState(ENDURANCE_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch current endurance from profile
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("kura_endurance")
        .eq("id", user.id)
        .single();

      // Handle missing profile
      if (profileError && profileError.code === "PGRST116") {
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({ id: user.id, kura_endurance: ENDURANCE_DEFAULT })
          .select().single();
        profile = newProfile;
      }

      if (!profile) return;

      let finalEndurance = profile.kura_endurance;

      // 2. Check for Decay
      const { data: lastRun } = await supabase
        .from("runs")
        .select("created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (lastRun && lastRun.length > 0) {
        const daysPassed = daysSince(lastRun[0].created_at);

        // Only decay after 3 days of no running
        if (daysPassed > 2) {
          const decayedEndurance = applyDecay(profile.kura_endurance, daysPassed);

          // If endurance changed, update the DB
          if (decayedEndurance !== profile.kura_endurance) {
            await supabase
              .from("profiles")
              .update({ kura_endurance: decayedEndurance })
              .eq("id", user.id);
            finalEndurance = decayedEndurance;
          }
        }
      }

      setCurrentEndurance(finalEndurance);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogSuccess = (newEndurance: number) => {
    setCurrentEndurance(newEndurance);
    setRefreshKey(prev => prev + 1); // Trigger RunList refresh
  };

  const handleLogout = async () => {
    if (!confirm("Ready to rest for a while? Kura will miss you!")) return;

    setIsLoggingOut(true);

    // Brief delay to show the "See you" message
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push("/login");
    }, 1500);
  };

  if (isLoggingOut) {
    return (
      <div className="dashboard-layout logout-screen">
        <div className="logout-message">
          <h1 className="pixel-font">SEE YOU SOON!</h1>
          <p className="pixel-font">Kura is going to sleep... 😴</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-layout">
        <p className="pixel-font" style={{ textAlign: 'center', marginTop: '4rem' }}>
          FINDING KURA...
        </p>
      </div>
    );
  }

  // Derived values from the endurance engine
  const enduranceDisplay = formatEndurance(currentEndurance);
  const progress = getEnduranceProgress(currentEndurance);
  const statusMessage = getStatusMessage(currentEndurance);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-inner">
        {/* ─── Header ─── */}
        <header className="dashboard-header">
          <div className="header-info">
            <h1 className="dashboard-title">TRAINING GROUND</h1>
            <p className="dashboard-subtitle">{statusMessage}</p>
          </div>
          <button onClick={handleLogout} className="pixel-btn logout-btn">
            LOGOUT
          </button>
        </header>

        {/* ─── Dashboard Content ─── */}
        <div className="dashboard-content">
          {/* ─── Endurance Card ─── */}
          <section className="endurance-card pixel-card">
            <div className="endurance-label">KURA ENDURANCE</div>
            <div className="endurance-main-display">
              <div className="endurance-value">{enduranceDisplay}</div>
              <div className="endurance-unit">km</div>
            </div>

            {/* ─── Progress Bar ─── */}
            <div className="progress-container">
              <div className="progress-labels">
                <span className="progress-label-slow">Weak</span>
                <span className="progress-label-fast">Strong</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ "--progress": `${progress}%` } as React.CSSProperties}
                ></div>
              </div>
              <div className="progress-percent">{progress}%</div>

              <div className="endurance-disclaimer">THIS IS KURA'S ENDURANCE, NOT YOURS</div>
            </div>
          </section>

          {/* ─── Action Area ─── */}
          <section className="action-area">
            <LogRun
              currentEndurance={currentEndurance}
              onLogSuccess={handleLogSuccess}
              refreshKey={refreshKey}
            />
          </section>
        </div>

        <Mascot />

        {/* ─── Training History ─── */}
        <RunList
          refreshKey={refreshKey}
          onEnduranceUpdate={(newEndurance) => {
            setCurrentEndurance(newEndurance);
            setRefreshKey(prev => prev + 1);
          }}
        />
      </div>
    </div>
  );
}
