import { Match, Score } from "../../Interfaces";

export default class Scoreboard {
  // holds all matches
  private matches: Match[] = [];

  constructor(matches: Match[]) {
    // turns started string into Date
    const formattedMatches = matches.map((match) =>
      typeof match.started === "string"
        ? { ...match, started: new Date(match.started) }
        : match
    );

    // assigns default matches
    this.matches = this.sortMatches(formattedMatches);
  }

  // gets active matches
  getMatches = () => {
    return this.matches.filter((match) => !match.isFinished);
  };

  // starts new match
  startMatch = (homeTeam: string, awayTeam: string) => {
    const match: Match = {
      id: -1,
      started: new Date(),
      isFinished: false,
      homeTeam: { name: homeTeam, score: 0 },
      awayTeam: { name: awayTeam, score: 0 },
    };
    this.matches = this.sortMatches(this.matches.concat([match]));
  };

  // finishes active match
  finishMatch = (matchId: number) => {
    const updatedMatches = this.matches.map((match) => {
      if (match.id === matchId) {
        return { ...match, isFinished: true };
      }
      return match;
    });
    this.matches = this.sortMatches(updatedMatches);
  };

  // updates score
  updateScore = (matchId: number, score: Score) => {
    const updatedMatches = this.matches.map((match) => {
      if (match.id === matchId) {
        return {
          ...match,
          homeTeam: { ...match.homeTeam, score: score.home },
          awayTeam: { ...match.awayTeam, score: score.away },
        };
      }
      return match;
    });
    this.matches = this.sortMatches(updatedMatches);
  };

  // sorts matches
  private sortMatches = (matches: Match[]) => {
    return (
      matches
        .sort((matchA, matchB) => {
          const totalA = matchA.homeTeam.score + matchA.awayTeam.score;
          const totalB = matchB.homeTeam.score + matchB.awayTeam.score;

          // sort by start time if total is the same
          if (totalA === totalB) {
            return matchB.started.getTime() - matchA.started.getTime();
          }
          // sort by score descending
          return totalB - totalA;
        })

        // adding ids
        .map((match, idx) => ({ ...match, id: idx }))
    );
  };
}
