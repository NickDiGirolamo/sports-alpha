# Sports Alpha

Sports Alpha is a premium sports betting research and decision-support MVP built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Recharts. It is explicitly not a sportsbook. The product focuses on current lines, matchup context, line movement, team metrics, and transparent model-driven insight.

## Architecture

The app is split into four main layers:

1. `app/`
   Route-driven UI built with the Next.js App Router. The homepage, daily slate, and game detail page are the primary MVP surfaces.
2. `components/`
   Reusable analytics UI primitives such as `GameCard`, `OddsBadge`, `LineMovementIndicator`, `TeamComparisonTable`, `MetricCard`, `InsightCard`, `TrendChart`, and `WatchlistButton`.
3. `lib/types.ts`
   Normalized domain types for `Sport`, `Team`, `Game`, `OddsSnapshot`, line structures, `TeamMetric`, `InjuryReport`, `Projection`, `Insight`, and watchlist records.
4. `lib/data/`
   Service and provider abstraction. UI reads from a data service, not from hardcoded component-local objects. The current MVP uses `mock-provider.ts`, which can be replaced by live adapters later.

## Data model

The normalized model is designed to support multi-sport expansion and live data ingestion:

- `Sport`: league metadata and visual accenting
- `Team`: identity, branding, rank, record, ATS, and totals performance
- `Game`: schedule metadata, venue, opening/current line, movement, metrics, injuries, weather, and projection
- `OddsSnapshot`: timestamped odds state for future line history storage
- `GameLine`: moneyline, spread, and total structures
- `TeamMetric`: side-by-side sport-specific comparison metrics
- `InjuryReport`: player status and estimated impact
- `Projection`: projected score, fair line, edge, confidence, and rationale
- `Insight`: stat-driven or market-driven editorial notes
- `WatchlistItem`: saved game and note scaffold
- `DataHealthStatus`: ingestion monitoring output for the admin page

## Page hierarchy

- `/`
- `/slate`
- `/slate/[sport]`
- `/game/[gameId]`
- `/teams`
- `/teams/[teamId]`
- `/odds`
- `/trends`
- `/model`
- `/insights`
- `/watchlist`
- `/admin/data-health`

## Data services needed for live mode

To move from mocked data to live or near-live updates, plug providers into `lib/data/` for:

- schedule provider
- odds provider
- opening-line and snapshot history provider
- team stats provider
- injury provider
- weather provider
- projection/model provider
- editorial insights provider

The service layer is intentionally provider-agnostic so APIs can be swapped without rewriting the UI.

## Model approach

The MVP model is lightweight and transparent:

- season-long team strength and efficiency baseline
- recent-form weighting
- home-court or home-field adjustment
- injury impact adjustment
- rest and schedule context
- weather or bullpen fatigue where relevant

Outputs include projected score, fair spread, fair total, fair moneyline, edge percentage, and confidence tier. This is informational only and intentionally easy to replace with a stronger model later.

## Mocked vs live

Current MVP status:

- mocked: schedules, odds, movement history, metrics, injuries, weather, watchlist, and insights
- live-ready: UI contracts, service abstraction, page architecture, and charting flows

To add a live provider, replace or extend `lib/data/providers/mock-provider.ts` and keep the return shapes aligned with `lib/types.ts`.

## How to run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## How to add a new sport or provider

1. Add the new sport key and metadata in `lib/types.ts` and the provider source.
2. Extend the provider to return teams, games, metrics, and projections for that sport.
3. Add sport-specific metric selection logic if the comparison set differs materially.
4. Keep the UI components generic so they continue to render normalized domain objects without page-level rewrites.
