"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { PACE_DEFAULT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { formatPace, getPaceProgress, getStatusMessage, daysSince, applyDecay } from "@/lib/pace";
import Mascot from "@/components/Mascot";
import LogRun from "@/components/LogRun";
import RunList from "@/components/RunList";
import "./stylesheet.css";

export default function DashboardPage() {
  const router = useRouter();
  const [currentPace, setCurrentPace] = useState(PACE_DEFAULT);
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

      // 1. Fetch current pace from profile
      let { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("current_kura_pace")
        .eq("id", user.id)
        .single();

      // Handle missing profile
      if (profileError && profileError.code === "PGRST116") {
        const { data: newProfile } = await supabase
          .from("profiles")
          .insert({ id: user.id, current_kura_pace: PACE_DEFAULT })
          .select().single();
        profile = newProfile;
      }

      if (!profile) return;

      let finalPace = profile.current_kura_pace;

      // 2. Check for Decay (Step 4 Logic)
      const { data: lastRun } = await supabase
        .from("runs")
        .select("created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (lastRun && lastRun.length > 0) {
        const daysPassed = daysSince(lastRun[0].created_at);
        
        if (daysPassed > 0) {
          const decayedPace = applyDecay(profile.current_kura_pace, daysPassed);
          
          // If pace changed, update the DB
          if (decayedPace !== profile.current_kura_pace) {
            await supabase
              .from("profiles")
              .update({ current_kura_pace: decayedPace })
              .eq("id", user.id);
            finalPace = decayedPace;
          }
        }
      }

      setCurrentPace(finalPace);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogSuccess = (newPace: number) => {
    setCurrentPace(newPace);
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

  // Derived values from the pace engine
  const paceDisplay = formatPace(currentPace);
  const progress = getPaceProgress(currentPace);
  const statusMessage = getStatusMessage(currentPace);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-inner">
        {/* ─── Header ─── */}
        <header className="dashboard-header">
          <div className="header-info">
            <h1 className="dashboard-title">KURA</h1>
            <p className="dashboard-subtitle">{statusMessage}</p>
          </div>
          <button onClick={handleLogout} className="pixel-btn logout-btn">
            LOGOUT
          </button>
        </header>

        {/* ─── Dashboard Content ─── */}
        <div className="dashboard-content">
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

              <div className="pace-disclaimer">THIS IS KURA'S PACE, NOT YOUR'S</div>
            </div>
          </section>

          {/* ─── Action Area (Step 2) ─── */}
          <section className="action-area">
            <LogRun 
              currentKuraPace={currentPace} 
              onLogSuccess={handleLogSuccess} 
              refreshKey={refreshKey}
            />
          </section>
        </div>

        <Mascot />

        {/* ─── Training History ─── */}
        <RunList 
          refreshKey={refreshKey} 
          onPaceUpdate={(newPace) => {
            setCurrentPace(newPace);
            setRefreshKey(prev => prev + 1);
          }} 
        />
      </div>
    </div>
  );
}
