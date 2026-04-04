import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { SlateBoard } from "@/components/slate-board";
import { getTopGames } from "@/lib/data/service";
import { SportKey } from "@/lib/types";

const validSports: SportKey[] = ["NFL", "NBA", "MLB", "NCAAF", "NCAAB", "NHL"];

export default async function SportSlatePage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params;
  const normalized = sport.toUpperCase() as SportKey;

  if (!validSports.includes(normalized)) {
    notFound();
  }

  const games = await getTopGames(normalized);

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow={`${normalized} slate`}
        title={`${normalized} board`}
        description={`Sport-specific slate view for ${normalized} with the same market and model tooling as the full board.`}
      />
      <SlateBoard games={games} title={`${normalized} daily slate`} />
    </div>
  );
}
