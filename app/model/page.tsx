import { PageHeader } from "@/components/page-header";
import { getTopGames } from "@/lib/data/service";

export default async function ModelPage() {
  const games = await getTopGames();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Model"
        title="Projections and methodology"
        description="Transparent MVP methodology so model output is inspectable, replaceable, and clearly informational."
      />
      <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Methodology</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-3">Weighted blend of season-long strength, recent form, and opponent-adjusted efficiency.</li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-3">Home-court or home-field adjustment layered on top of power rating differences.</li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-3">Injury and availability modifiers applied only when player impact is meaningful.</li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-3">Rest, travel, bullpen usage, and weather serve as context variables when relevant.</li>
            <li className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-zinc-200">For informational use only. Model outputs are not guarantees and should be interpreted alongside market context.</li>
          </ul>
        </div>
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-400">
                    {game.awayTeam.code} @ {game.homeTeam.code}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white">{game.projection.lean}</p>
                </div>
                <div className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-sm text-lime-100">
                  {game.projection.modelEdgePercent.toFixed(1)}% edge
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Fair spread</p>
                  <p className="mt-2 text-white">{game.projection.fairSpread.toFixed(1)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Fair total</p>
                  <p className="mt-2 text-white">{game.projection.fairTotal.toFixed(1)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Confidence</p>
                  <p className="mt-2 text-white">{game.projection.confidence}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
