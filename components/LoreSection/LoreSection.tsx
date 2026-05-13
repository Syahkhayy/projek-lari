"use client";

import { useState, useMemo } from "react";
import { getRandomUnlockedSnippet } from "@/lib/lore";
import "./LoreSection.css";

interface LoreSectionProps {
  currentEndurance: number;
}

export default function LoreSection({ currentEndurance }: LoreSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize the random snippet so it only changes when endurance tier changes or session refreshes
  const currentSnippet = useMemo(() => {
    return getRandomUnlockedSnippet(currentEndurance);
  }, [currentEndurance]);

  if (!currentSnippet) return null;

  return (
    <div className={`lore-section ${isExpanded ? "expanded" : ""}`}>
      <div className="lore-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="lore-tag">{currentSnippet.title.toUpperCase()}</span>
        <span className="lore-toggle">{isExpanded ? "−" : "+"}</span>
      </div>

      <div className="lore-content-wrapper" onClick={() => setIsExpanded(!isExpanded)}>
        <p className="lore-text">"{currentSnippet.content}"</p>
      </div>

      {!isExpanded && (
        <div className="lore-hint" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="lore-divider">---------------------------------</div>
          <div className="lore-hint-text">READ MORE</div>
        </div>
      )}
    </div>
  );
}
