import React, { ChangeEvent, FC, useState } from "react";
import classes from "./WorldCupScoreboard.module.scss";
import Scoreboard from "../../features/Scoreboard/Scoreboard";
import MatchStarter from "../MatchStarter/MatchStarter";
import { Match, NewMatch, Score } from "../../Interfaces";

interface WorldCupScoreboardProps {
  scoreboard: Scoreboard;
}

const WorldCupScoreboard: FC<WorldCupScoreboardProps> = ({ scoreboard }) => {
  const [matches, setMatches] = useState<Match[]>(scoreboard.getMatches());
  const [selectedMatch, setSelectedMatch] = useState<number>(-1);
  const [scoreUpdateVal, setScoreUpdateVal] = useState<Score>({
    home: 0,
    away: 0,
  });
  const startMatch = (newMatch: NewMatch) => {
    scoreboard.startMatch(newMatch.home, newMatch.away);
    setMatches(scoreboard.getMatches());
  };
  const finishMatch = (matchId: number) => {
    scoreboard.finishMatch(matchId);
    setMatches(scoreboard.getMatches());
  };
  const updateScore = (matchId: number) => {
    scoreboard.updateScore(matchId, scoreUpdateVal);
    resetSelection();
    setMatches(scoreboard.getMatches());
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
  return (
    <div className={classes.Wrapper}>
      <h1>World Cup Scoreboard</h1>
      <table className={classes.Scoreboard}>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.homeTeam.name}</td>
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
              {match.id !== selectedMatch && (
                <td>{`${match.homeTeam.score} : ${match.awayTeam.score}`}</td>
              )}

              <td>{match.awayTeam.name}</td>
              <td>
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
      <MatchStarter startMatch={startMatch} />
    </div>
  );
};

export default WorldCupScoreboard;
