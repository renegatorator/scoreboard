import React, { ChangeEvent, FC, useState } from "react";
import classes from "./WorldCupScoreboard.module.scss";
import Scoreboard from "../../features/Scoreboard/Scoreboard";
import MatchStarter from "../MatchStarter/MatchStarter";
import { Match, NewMatch, Score } from "../../Interfaces";

interface WorldCupScoreboardProps {
  scoreboard: Scoreboard;
}

const WorldCupScoreboard: FC<WorldCupScoreboardProps> = ({ scoreboard }) => {
  const [activeMatches, setActiveMatches] = useState<Match[]>(
    scoreboard.getMatches()
  );
  const [selectedMatch, setSelectedMatch] = useState<number>(-1);
  const [scoreUpdateVal, setScoreUpdateVal] = useState<Score>({
    home: 0,
    away: 0,
  });

  const startMatch = (newMatch: NewMatch) => {
    scoreboard.startMatch(newMatch.home, newMatch.away);
    storeChanges();
  };

  const finishMatch = (matchId: number) => {
    scoreboard.finishMatch(matchId);
    storeChanges();
  };

  const updateScore = (matchId: number) => {
    scoreboard.updateScore(matchId, scoreUpdateVal);
    resetSelection();
    storeChanges();
  };

  const selectMatch = (matchId: number, score: Score) => {
    setSelectedMatch(matchId);
    setScoreUpdateVal(score);
  };

  const resetSelection = () => {
    setSelectedMatch(-1);
    setScoreUpdateVal({
      home: 0,
      away: 0,
    });
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScoreUpdateVal({
      ...scoreUpdateVal,
      [e.target.name.replace("Score", "")]: Number(e.target.value),
    });
  };

  const storeChanges = () => {
    const newMatches = scoreboard.getMatches();
    setActiveMatches(newMatches);
    localStorage.setItem("scoreboard-matches", JSON.stringify(newMatches));
  };

  return (
    <div className={classes.Wrapper}>
      <h1>World Cup Scoreboard</h1>
      {/* Scoreboard */}
      {activeMatches.length > 0 && (
        <table className={classes.Scoreboard}>
          <tbody>
            {activeMatches.map((match) => (
              <tr key={match.id}>
                <td>{match.homeTeam.name}</td>

                {/* Match score */}
                {match.id !== selectedMatch && (
                  <td>{`${match.homeTeam.score} : ${match.awayTeam.score}`}</td>
                )}
                {/* Match score update */}
                {match.id === selectedMatch && (
                  <td>
                    <input
                      onChange={handleScoreChange}
                      name="homeScore"
                      type="number"
                      value={scoreUpdateVal.home}
                    />{" "}
                    :{" "}
                    <input
                      onChange={handleScoreChange}
                      name="awayScore"
                      type="number"
                      value={scoreUpdateVal.away}
                    />
                  </td>
                )}

                <td>{match.awayTeam.name}</td>
                <td>
                  {/* Match buttons */}
                  {match.id !== selectedMatch && (
                    <>
                      <button
                        onClick={() =>
                          selectMatch(match.id, {
                            home: match.homeTeam.score,
                            away: match.awayTeam.score,
                          })
                        }
                      >
                        Update score
                      </button>
                      <button onClick={() => finishMatch(match.id)}>
                        Finish
                      </button>
                    </>
                  )}
                  {/* Match buttons update */}
                  {match.id === selectedMatch && (
                    <>
                      <button onClick={() => updateScore(match.id)}>
                        Save score
                      </button>
                      <button onClick={() => resetSelection()}>Discard</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* No active matches */}
      {activeMatches.length === 0 && (
        <div className={classes.NoMatches}>
          <p>No matches are currently in progress.</p>
          <p>Please start a new match.</p>
        </div>
      )}

      <MatchStarter startMatch={startMatch} />
    </div>
  );
};

export default WorldCupScoreboard;
