import { Score } from "../../Interfaces";
import Scoreboard from "./Scoreboard";

const scoreBoard = new Scoreboard();

describe("Get matches", () => {
  const matches = scoreBoard.getMatches();

  it("Scoreboard should contain 3 matches by default", () => {
    expect(matches.length).toBe(3);
  });

  it("Matches should be sorted by total score (descending)", () => {
    expect(
      matches[0].homeTeam.score + matches[0].awayTeam.score >=
        matches[1].homeTeam.score + matches[1].awayTeam.score
    ).toBe(true);
  });
});

describe("Start new match", () => {
  scoreBoard.startMatch("France", "Belgium");
  const matches = scoreBoard.getMatches();

  it("Starting a match should increase number of active matches from 3 to 4", () => {
    expect(matches.length).toBe(4);
  });

  it("New match should have a total score of 0", () => {
    const match = matches.find((match) => match.homeTeam.name === "France");
    if (!match) throw Error();
    const total = match.homeTeam.score + match.awayTeam.score;
    expect(total).toBe(0);
  });

  it("New match should be at the end of the array because of the lowest total", () => {
    expect(matches[3].homeTeam.name).toBe("France");
  });
});

describe("Update score", () => {
  const newScore: Score = { home: 12, away: 9 };
  scoreBoard.updateScore(3, newScore);

  it("The updated match should have a score of 12 : 9", () => {
    const matches = scoreBoard.getMatches();
    const match = matches.find((match) => match.homeTeam.name === "France");
    if (!match) throw Error();
    expect(match.homeTeam.score).toBe(12);
    expect(match.awayTeam.score).toBe(9);
  });

  it("New match should be at the start of the array because of the highest total", () => {
    const matches = scoreBoard.getMatches();
    expect(matches[0].homeTeam.name).toBe("France");
  });

  it("Matches with the same total score should be sorted by starting time (descending)", () => {
    const newScore: Score = { home: 12, away: 9 };
    scoreBoard.updateScore(1, newScore);
    const matches = scoreBoard.getMatches();
    expect(matches[0].homeTeam.name).toBe("France");
  });
});

describe("Finish match", () => {
  it("Finishing a match should reduce the number of active matches from 4 to 3", () => {
    scoreBoard.finishMatch(0);
    const matches = scoreBoard.getMatches();
    expect(matches.length).toBe(3);
  });

  it("Finishing a match should remove it from the active matches", () => {
    const matches = scoreBoard.getMatches();
    const match = matches.find((match) => match.homeTeam.name === "France");
    expect(!!match).toBe(false);
  });
});
