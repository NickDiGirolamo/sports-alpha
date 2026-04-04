import { HomeSections } from "@/components/home-sections";
import { HomeSlateGrid } from "@/components/home-slate-grid";
import { PageHeader } from "@/components/page-header";
import { getInsights, getTopGames } from "@/lib/data/service";

export default async function HomePage() {
  const [games, insights] = await Promise.all([getTopGames(), getInsights()]);

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        eyebrow="Home"
        title="Today&apos;s premium research board"
        description="The homepage is now slate-first: compact clickable game blocks up front, with the heavier statistical analysis and market breakdown reserved for each matchup page."
      />
      <HomeSlateGrid games={games} />
      <HomeSections games={games} insights={insights} />
    </div>
  );
}
