export interface Match {
  id: number;
  started: Date;
  isFinished: boolean;
  homeTeam: Team;
  awayTeam: Team;
}

export interface Team {
  name: string;
  score: number;
}

export interface Score {
  home: number;
  away: number;
}
