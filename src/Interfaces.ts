export interface Match {
  id: number;
  started: Date;
  isFinished: boolean;
  homeTeam: {
    name: string;
    score: number;
  };
  awayTeam: {
    name: string;
    score: number;
  };
}

export interface Score {
  home: number;
  away: number;
}
