import React, { FC } from "react";
import classes from "./WorldCupScoreboard.module.scss";
import Scoreboard from "../../features/Scoreboard/Scoreboard";

const WorldCupScoreboard: FC = () => {
  const scoreboard = new Scoreboard();
  return (
    <div className={classes.Wrapper}>
      <h1>World Cup Scoreboard</h1>
      <table className={classes.Scoreboard}>
        <tbody>
          {scoreboard.matches.map((match) => (
            <tr key={match.id}>
              <td>{match.homeTeam.name}</td>
              <td>{`${match.homeTeam.score} : ${match.awayTeam.score}`}</td>
              <td>{match.awayTeam.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorldCupScoreboard;
