"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { GameCard } from "@/components/game-card";
import { SportKey, Team } from "@/lib/types";

type SlateGame = {
  id: string;
  sport: SportKey;
  popularityScore: number;
  lineMovement: Array<{ market: string; delta: number }>;
  projection: { modelEdgePercent: number };
  awayTeam: Team;
  homeTeam: Team;
  [key: string]: unknown;
};

export function SlateBoard({ games, title = "Daily slate" }: { games: SlateGame[]; title?: string }) {
  const [sportFilter, setSportFilter] = useState<SportKey | "ALL">("ALL");
  const [sortBy, setSortBy] = useState<"popularity" | "movement" | "edge">("popularity");
  const [query, setQuery] = useState("");

  const filteredGames = useMemo(() => {
    const searched = games.filter((game) => {
      const matchesSport = sportFilter === "ALL" || game.sport === sportFilter;
      const haystack = `${game.awayTeam.city} ${game.awayTeam.name} ${game.homeTeam.city} ${game.homeTeam.name}`.toLowerCase();
      return matchesSport && haystack.includes(query.toLowerCase());
    });

    return [...searched].sort((a, b) => {
      if (sortBy === "movement") {
        const aMove = Math.max(...a.lineMovement.map((entry) => Math.abs(entry.delta)));
        const bMove = Math.max(...b.lineMovement.map((entry) => Math.abs(entry.delta)));
        return bMove - aMove;
      }

      if (sortBy === "edge") {
        return b.projection.modelEdgePercent - a.projection.modelEdgePercent;
      }

      return b.popularityScore - a.popularityScore;
    });
  }, [games, query, sortBy, sportFilter]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">{title}</p>
          <p className="mt-2 text-sm text-zinc-300">Sort by sport, biggest movement, or model edge to identify the most actionable spots quickly.</p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-zinc-300">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search team or city"
              className="w-full min-w-0 bg-transparent outline-none placeholder:text-zinc-500"
            />
          </div>
          <select
            value={sportFilter}
            onChange={(event) => setSportFilter(event.target.value as SportKey | "ALL")}
            className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-zinc-200 outline-none"
          >
            <option value="ALL">All sports</option>
            <option value="NBA">NBA</option>
            <option value="MLB">MLB</option>
            <option value="NFL">NFL</option>
            <option value="NCAAB">NCAAB</option>
            <option value="NHL">NHL</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "popularity" | "movement" | "edge")}
            className="rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-zinc-200 outline-none"
          >
            <option value="popularity">Sort: Popularity</option>
            <option value="movement">Sort: Biggest movement</option>
            <option value="edge">Sort: Model edge</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: index * 0.04 }}
          >
            <GameCard game={game as never} />
          </motion.div>
        ))}
      </div>

      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-sm text-zinc-400">
        Multi-book filter, date selector, and saved custom notes are scaffolded through the service layer and can plug into live providers or persisted storage next.
        <Link href="/admin/data-health" className="ml-2 text-lime-100 underline underline-offset-4">
          View ingestion health
        </Link>
      </div>
    </section>
  );
}
