import { Match } from "./Interfaces";

export const defaultMatches: Match[] = [
  {
    id: 0,
    started: new Date(),
    isFinished: false,
    homeTeam: {
      name: "Argentina",
      score: 3,
    },
    awayTeam: {
      name: "Columbia",
      score: 2,
    },
  },
  {
    id: 1,
    started: new Date(),
    isFinished: false,
    homeTeam: {
      name: "Germany",
      score: 0,
    },
    awayTeam: {
      name: "Switzerland",
      score: 4,
    },
  },
  {
    id: 2,
    started: new Date(),
    isFinished: false,
    homeTeam: {
      name: "Brazil",
      score: 6,
    },
    awayTeam: {
      name: "Mexico",
      score: 4,
    },
  },
];
