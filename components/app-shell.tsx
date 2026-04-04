import Link from "next/link";
import { BarChart3, Bookmark, Database, Flame, Home, LineChart, Newspaper, ShieldAlert, Swords, Trophy } from "lucide-react";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/slate", label: "Today's Slate", icon: BarChart3 },
  { href: "/odds", label: "Odds", icon: LineChart },
  { href: "/game/nba-bos-den", label: "Matchups", icon: Swords },
  { href: "/teams", label: "Teams", icon: Trophy },
  { href: "/trends", label: "Trends", icon: Flame },
  { href: "/model", label: "Model", icon: ShieldAlert },
  { href: "/insights", label: "Insights", icon: Newspaper },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_22%),radial-gradient(circle_at_18%_12%,_rgba(184,255,59,0.08),_transparent_18%),linear-gradient(180deg,_#111315_0%,_#090a0c_38%,_#040506_100%)] text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-30 mb-6 rounded-3xl border border-white/10 bg-black/55 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-lime-100">
                  Sports Alpha
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  Research platform only
                </div>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Premium sports betting research and decision support
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-zinc-300 sm:text-base">
                Live-ready architecture for odds, market movement, matchup context, and transparent model insight. No bet placement, no sportsbook flow.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
              <Database className="h-4 w-4 text-zinc-200" />
              Near-live ingestion ready
            </div>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-lime-300/25 hover:bg-lime-300/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-10 rounded-3xl border border-white/10 bg-black/50 px-5 py-5 text-sm text-zinc-400 backdrop-blur-xl">
          <p>
            Sports Alpha is an informational analytics product. It does not facilitate wagering or guarantee outcomes. Use responsibly and seek help from local responsible gambling resources if betting stops being fun.
          </p>
        </footer>
      </div>
    </div>
  );
}
