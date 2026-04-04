import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { TeamPill } from "@/components/team-pill";
import { getTeamById } from "@/lib/data/service";

export default async function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const result = await getTeamById(teamId);

  if (!result) {
    notFound();
  }

  const { team, profile } = result;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow={`${team.sport} team`}
        title={`${team.city} ${team.name}`}
        description="Team profile page with season summary, advanced metrics, and expansion points for schedule and lineup intelligence."
      />
      <section className="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <TeamPill team={team} />
          <p className="mt-5 text-sm text-slate-300">{profile?.overview ?? "Profile data can be provided by the stats adapter for this team."}</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Record</p>
              <p className="mt-2 text-white">{team.record}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">ATS</p>
              <p className="mt-2 text-white">{team.atsRecord}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Totals</p>
              <p className="mt-2 text-white">{team.ouRecord}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Strengths</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {(profile?.strengths ?? ["Connect a live stats profile to populate team strengths."]).map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-300">Concerns</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {(profile?.concerns ?? ["Concerns and injury context can flow from future data providers."]).map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {profile?.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                {metric.rank ? <p className="mt-1 text-sm text-zinc-300">Rank #{metric.rank}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
