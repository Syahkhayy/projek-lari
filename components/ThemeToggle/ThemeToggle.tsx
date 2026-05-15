"use client";

import { useEffect, useState } from "react";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const nextTheme = theme === "light" ? "dark" : "light";
  const icon = theme === "light" ? "☀" : "☾";

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      data-theme-mode={theme}
      title={`Switch to ${nextTheme} mode`}
      aria-label="Toggle Theme"
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
