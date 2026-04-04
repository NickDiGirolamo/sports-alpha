import { InsightCard } from "@/components/insight-card";
import { PageHeader } from "@/components/page-header";
import { getInsights } from "@/lib/data/service";

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        eyebrow="Insights"
        title="Research notes and educational content"
        description="A content layer for daily notes, market watch items, matchup breakdowns, and educational analytics posts."
      />
      <div className="grid gap-4 xl:grid-cols-3">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
}
