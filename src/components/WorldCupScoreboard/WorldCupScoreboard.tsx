import React, { FC, useState } from "react";
import classes from "./WorldCupScoreboard.module.scss";
import Scoreboard from "../../features/Scoreboard/Scoreboard";
import MatchStarter from "../MatchStarter/MatchStarter";
import { Match, NewMatch } from "../../Interfaces";

interface WorldCupScoreboardProps {
  scoreboard: Scoreboard;
}

const WorldCupScoreboard: FC<WorldCupScoreboardProps> = ({ scoreboard }) => {
  const [matches, setMatches] = useState<Match[]>(scoreboard.getMatches());
  const startMatch = (newMatch: NewMatch) => {
    scoreboard.startMatch(newMatch.home, newMatch.away);
    setMatches(scoreboard.getMatches());
  };
  return (
    <div className={classes.Wrapper}>
      <h1>World Cup Scoreboard</h1>
      <table className={classes.Scoreboard}>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.homeTeam.name}</td>
              <td>{`${match.homeTeam.score} : ${match.awayTeam.score}`}</td>
              <td>{match.awayTeam.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <MatchStarter startMatch={startMatch} />
    </div>
  );
};

export default WorldCupScoreboard;
