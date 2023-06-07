import React from "react";
import WorldCupScoreboard from "./components/WorldCupScoreboard/WorldCupScoreboard";
import Scoreboard from "./features/Scoreboard/Scoreboard";

function App() {
  const scoreboard = new Scoreboard();
  return <WorldCupScoreboard scoreboard={scoreboard} />;
}

export default App;
