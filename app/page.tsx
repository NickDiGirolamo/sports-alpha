import { HomeSections } from "@/components/home-sections";
import { HomeSlateGrid } from "@/components/home-slate-grid";
import { getInsights, getTopGames } from "@/lib/data/service";

export default async function HomePage() {
  const [games, insights] = await Promise.all([getTopGames(), getInsights()]);

  return (
    <div className="space-y-8 pb-10">
      <HomeSlateGrid games={games} />
      <HomeSections games={games} insights={insights} />
    </div>
  );
}
