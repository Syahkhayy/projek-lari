import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center quest-pattern">
      <div className="space-y-6 max-w-2xl p-12 pixel-card">
        <h1 className="text-5xl md:text-6xl font-bold text-primary pixel-font tracking-tighter">
          PROJEK LARI
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium">
          Lari first, level up later
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/login" className="pixel-btn pixel-btn-primary">
            START RUNNING
          </Link>
          <Link href="/dashboard" className="pixel-btn pixel-btn-accent">
            VIEW STATS
          </Link>
        </div>
      </div>
      <footer className="mt-12 text-muted-foreground/60 pixel-font text-xs">
        v0.0.1-initiated | Built for Champion
      </footer>
    </main>
  );
}
