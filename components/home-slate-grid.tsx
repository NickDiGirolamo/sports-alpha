"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Game, SportKey, Team } from "@/lib/types";
import { formatGameTime, formatMoneyline, formatSpread } from "@/lib/utils";

const filterSports: Array<SportKey | "ALL"> = ["ALL", "NCAAB", "NBA", "NFL", "MLB", "NHL"];

export function HomeSlateGrid({
  games,
}: {
  games: Array<Game & { awayTeam: Team; homeTeam: Team }>;
}) {
  const [activeSport, setActiveSport] = useState<SportKey | "ALL">("ALL");

  const filteredGames = useMemo(
    () => games.filter((game) => activeSport === "ALL" || game.sport === activeSport),
    [activeSport, games],
  );
  const topEdge = filteredGames.length
    ? Math.max(...filteredGames.map((game) => game.projection.modelEdgePercent)).toFixed(1)
    : "0.0";

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-300">Today&apos;s slate</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">Compact matchup board</h3>
          <p className="mt-2 max-w-3xl text-sm text-zinc-300">
            Each block is a direct path into the deeper matchup page, where the market, movement, team context, injuries, and model output are broken down in detail.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Games</p>
            <p className="mt-1 text-xl font-semibold text-white">{filteredGames.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Top edge</p>
            <p className="mt-1 text-xl font-semibold text-lime-100">{topEdge}%</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Books</p>
            <p className="mt-1 text-xl font-semibold text-white">3</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterSports.map((sport) => (
          <button
            key={sport}
            type="button"
            onClick={() => setActiveSport(sport)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeSport === sport
                ? "border-lime-300/22 bg-lime-300/12 text-lime-100"
                : "border-white/10 bg-white/5 text-zinc-300 hover:border-lime-300/20 hover:bg-lime-300/10"
            }`}
          >
            {sport === "ALL" ? "All leagues" : sport}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredGames.map((game) => {
          const topMove = [...game.lineMovement].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))[0];

          return (
            <Link
              key={game.id}
              href={`/game/${game.id}`}
              className="group rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 transition hover:-translate-y-0.5 hover:border-lime-300/22 hover:bg-[linear-gradient(180deg,rgba(184,255,59,0.08),rgba(255,255,255,0.03))]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-lime-300/18 bg-lime-300/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-lime-100">
                      {game.league}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                      {formatGameTime(game.startTime)}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">
                    {game.awayTeam.code} @ {game.homeTeam.code}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{game.venue}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-400 transition group-hover:border-lime-300/22 group-hover:bg-lime-300/10 group-hover:text-lime-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-4 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {game.awayTeam.logoUrl ? (
                        <Image src={game.awayTeam.logoUrl} alt={`${game.awayTeam.city} ${game.awayTeam.name} logo`} width={72} height={72} className="h-[68px] w-[68px] object-contain" unoptimized />
                      ) : (
                        <span className="text-lg font-semibold text-white">{game.awayTeam.code}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{game.awayTeam.code}</p>
                      <p className="truncate text-xs text-zinc-400">{game.awayTeam.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2 px-1">
                    <div className="rounded-full border border-lime-300/22 bg-lime-300/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-lime-100">
                      VS
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 items-center justify-end gap-3 text-right">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{game.homeTeam.code}</p>
                      <p className="truncate text-xs text-zinc-400">{game.homeTeam.name}</p>
                    </div>
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      {game.homeTeam.logoUrl ? (
                        <Image src={game.homeTeam.logoUrl} alt={`${game.homeTeam.city} ${game.homeTeam.name} logo`} width={72} height={72} className="h-[68px] w-[68px] object-contain" unoptimized />
                      ) : (
                        <span className="text-lg font-semibold text-white">{game.homeTeam.code}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Moneyline</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {formatMoneyline(game.currentLine.moneyline.away)} / {formatMoneyline(game.currentLine.moneyline.home)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Spread</p>
                  <p className="mt-1 text-sm font-semibold text-white">{formatSpread(game.currentLine.spread.away)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Total</p>
                  <p className="mt-1 text-sm font-semibold text-white">{game.currentLine.total.points.toFixed(1)}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Strongest move</p>
                  <p className="mt-1 text-sm text-zinc-200">
                    {topMove.market} {topMove.open} to {topMove.current}
                  </p>
                </div>
                <div className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-sm font-medium text-lime-100">
                  {game.projection.modelEdgePercent.toFixed(1)}% edge
                </div>
              </div>

              <p className="mt-4 line-clamp-2 text-sm text-zinc-300">{game.quickInsight}</p>

              <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
                <span>Open full matchup analysis</span>
                <ChevronRight className="h-4 w-4 transition group-hover:text-lime-100" />
              </div>
            </Link>
          );
        })}
      </div>

      {filteredGames.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-sm text-zinc-400">
          No games are currently loaded for that league filter in the mock slate.
        </div>
      ) : null}
    </section>
  );
}
