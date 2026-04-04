import { PageHeader } from "@/components/page-header";
import { getTeams, getTopGames } from "@/lib/data/service";

export default async function TrendsPage() {
  const [teams, games] = await Promise.all([getTeams(), getTopGames()]);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Trends"
        title="Angles and situational spots"
        description="Trend-led research laid out carefully so it informs decisions instead of overwhelming them."
      />
      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Best ATS teams</p>
          <div className="mt-4 space-y-3">
            {teams.slice(0, 3).map((team) => (
              <div key={team.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">
                  {team.city} {team.name}
                </p>
                <p className="mt-1 text-sm text-zinc-300">{team.atsRecord} ATS</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Today&apos;s value spots</p>
          <div className="mt-4 space-y-3">
            {games.map((game) => (
              <div key={game.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">{game.projection.lean}</p>
                <p className="mt-1 text-sm text-zinc-300">{game.projection.rationale[0]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Recent line-move performance</p>
          <div className="mt-4 space-y-3">
            {games.map((game) => (
              <div key={game.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">
                  {game.awayTeam.code} @ {game.homeTeam.code}
                </p>
                <p className="mt-1 text-sm text-zinc-300">{game.lineMovement[0]?.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
