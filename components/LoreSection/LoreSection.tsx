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
        <span className="lore-tag">{currentSnippet.category.toUpperCase()}</span>
        <span className="lore-toggle">{isExpanded ? "−" : "+"}</span>
      </div>

      <div className="lore-content-wrapper">
        <h4 className="lore-title">{currentSnippet.title}</h4>
        <p className="lore-text">"{currentSnippet.content}"</p>
      </div>
    </div>
  );
}
