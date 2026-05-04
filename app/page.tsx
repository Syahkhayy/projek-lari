import Link from "next/link";
import { APP_VERSION, FOOTER_TEXT } from "@/lib/constants";
import "./home.css";

export default function Home() {
  return (
    <main className="home-main quest-pattern">
      <div className="home-card pixel-card">
        <h1 className="home-title">PROJEK LARI</h1>
        <p className="home-subtitle">
          Lari first, level up later
        </p>
        <div className="home-actions">
          <Link href="/login" className="pixel-btn pixel-btn-accent">
            START RUNNING
          </Link>
        </div>
      </div>
      <footer className="home-footer">
        {APP_VERSION} | {FOOTER_TEXT}
      </footer>
    </main>
  );
}
