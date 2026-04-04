import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getWatchlist } from "@/lib/data/service";

export default async function WatchlistPage() {
  const items = await getWatchlist();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Watchlist"
        title="Saved games and notes"
        description="Early scaffold for saved games, pinned matchups, and personal reminders around injuries, price targets, or situational spots."
      />
      <div className="grid gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`/game/${item.gameId}`} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/25 hover:bg-white/[0.05]">
            <p className="text-sm text-slate-400">{item.savedAt}</p>
            <p className="mt-2 text-xl font-semibold text-white">
              {item.game.awayTeam.code} @ {item.game.homeTeam.code}
            </p>
            <p className="mt-2 text-sm text-slate-300">{item.note}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
