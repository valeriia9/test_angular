export interface Filter {
  name: string;
  order: number;
  markets: number[];
}

export interface Odd {
  marketId: number;
  field: string;
  alias: string;
  value: string;
  order: number;
  description: string;
  values: any[];
}

export interface Market {
  competitors: string;
  description: string;
  forbiddenToCombine: string;
  id: number;
  code: string;
  isMain: boolean;
  name: string;
  order: number;
  maxPayin?: any;
  minCombinations?: number;
  validations: string;
  odds: Odd[];
}

export interface menulist {
  id: number;
  masterId: number;
  betRadarId: string;
  order: number;
  competitors: string;
  countryName: string;
  countryOrder: number;
  iconId: number;
  leagueId: number;
  leagueName: string;
  leagueOrder: number;
  leagueDescription?: any;
  matchDate: Date;
  sportId: number;
  masterSportId: number;
  originalSportId: number;
  sportName: string;
  sportOrder: number;
  filters: Filter[];
  markets: Market[];
}
