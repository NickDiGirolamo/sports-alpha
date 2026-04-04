import { PageHeader } from "@/components/page-header";
import { SlateBoard } from "@/components/slate-board";
import { getTopGames } from "@/lib/data/service";

export default async function SlatePage() {
  const games = await getTopGames();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Slate"
        title="Daily slate"
        description="A fast, filterable board for today's matchups, current lines, line movement, and transparent model edge signals."
      />
      <SlateBoard games={games} />
    </div>
  );
}
