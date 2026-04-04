export type SportKey = "NFL" | "NBA" | "MLB" | "NCAAF" | "NCAAB" | "NHL";

export type MarketType = "moneyline" | "spread" | "total";

export interface Sport {
  key: SportKey;
  name: string;
  season: string;
  accent: string;
}

export interface Team {
  id: string;
  sport: SportKey;
  city: string;
  name: string;
  code: string;
  shortName: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  rank?: number;
  record: string;
  atsRecord: string;
  ouRecord: string;
}

export interface Moneyline {
  home: number;
  away: number;
}

export interface SpreadLine {
  home: number;
  away: number;
}

export interface TotalLine {
  points: number;
  overPrice?: number;
  underPrice?: number;
}

export interface GameLine {
  moneyline: Moneyline;
  spread: SpreadLine;
  total: TotalLine;
}

export interface LineMovement {
  market: MarketType;
  open: number;
  current: number;
  delta: number;
  direction: "up" | "down" | "flat";
  summary: string;
}

export interface OddsSnapshot {
  timestamp: string;
  sportsbook: string;
  line: GameLine;
}

export interface TeamMetric {
  key: string;
  label: string;
  homeValue: number;
  awayValue: number;
  format?: "number" | "percent" | "decimal";
  higherIsBetter?: boolean;
}

export interface TrendNote {
  label: string;
  away: string;
  home: string;
}

export interface InjuryReport {
  id: string;
  teamId: string;
  player: string;
  status: "Out" | "Questionable" | "Probable";
  impact: "Low" | "Medium" | "High";
  note: string;
}

export interface Projection {
  gameId: string;
  projectedHomeScore: number;
  projectedAwayScore: number;
  fairSpread: number;
  fairTotal: number;
  fairMoneylineHome: number;
  modelEdgePercent: number;
  confidence: "Low" | "Moderate" | "High";
  lean: string;
  rationale: string[];
}

export interface Insight {
  id: string;
  title: string;
  category: "Market watch" | "Matchup note" | "Model edge" | "Education";
  summary: string;
  timestamp: string;
}

export interface WeatherReport {
  summary: string;
  temperature: number;
  windMph: number;
  precipitationChance: number;
}

export interface LinePoint {
  time: string;
  spread: number;
  total: number;
}

export interface Game {
  id: string;
  sport: SportKey;
  league: string;
  startTime: string;
  venue: string;
  awayTeamId: string;
  homeTeamId: string;
  headline: string;
  importance: "Featured" | "Strong" | "Standard";
  popularityScore: number;
  books: string[];
  currentLine: GameLine;
  openingLine: GameLine;
  lineMovement: LineMovement[];
  quickInsight: string;
  marketSummary: string;
  weather?: WeatherReport;
  metrics: TeamMetric[];
  trends: TrendNote[];
  injuries: InjuryReport[];
  projection: Projection;
  lineHistory: LinePoint[];
}

export interface TeamProfile {
  teamId: string;
  overview: string;
  strengths: string[];
  concerns: string[];
  metrics: Array<{ label: string; value: string; rank?: number }>;
  upcoming: Array<{ opponent: string; date: string; location: string }>;
}

export interface WatchlistItem {
  id: string;
  gameId: string;
  note: string;
  savedAt: string;
}

export interface DataHealthStatus {
  provider: string;
  status: "Healthy" | "Delayed" | "Warning";
  lastUpdated: string;
  recordsToday: number;
  notes: string;
}
