import Link from "next/link";
import { APP_VERSION, FOOTER_TEXT } from "@/lib/constants";
import "./home.css";

export default function Home() {
  return (
    <main className="home-main">
      <div className="home-content">
        <div className="home-card pixel-card">
          <h1 className="home-title">PROJEK KURA</h1>
          <p className="home-subtitle">
            Your journey to fitness-habit starts in Nusantara Village.
          </p>
          <div className="home-actions">
            <Link href="/login" className="pixel-btn pixel-btn-accent start-btn">
              START RUNNING
            </Link>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        {APP_VERSION} | {FOOTER_TEXT}
      </footer>
    </main>
  );
}
