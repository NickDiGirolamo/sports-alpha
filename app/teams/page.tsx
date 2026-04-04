import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { TeamPill } from "@/components/team-pill";
import { getTeams } from "@/lib/data/service";

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Teams"
        title="Team detail index"
        description="Season profile, advanced metrics, ATS context, and schedule hooks for each supported team."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/25 hover:bg-white/[0.05]">
            <TeamPill team={team} />
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Record</p>
                <p className="mt-1 text-white">{team.record}</p>
              </div>
              <div>
                <p className="text-slate-500">ATS</p>
                <p className="mt-1 text-white">{team.atsRecord}</p>
              </div>
              <div>
                <p className="text-slate-500">O/U</p>
                <p className="mt-1 text-white">{team.ouRecord}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
