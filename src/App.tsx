import React from "react";
import WorldCupScoreboard from "./components/WorldCupScoreboard/WorldCupScoreboard";
import Scoreboard from "./features/Scoreboard/Scoreboard";
import { defaultMatches } from "./globalConstants";

function App() {
  // checks local storage for saved matches and creates a scoreboard with them
  // otherwise default matches are used
  const localMatches = localStorage.getItem("scoreboard-matches");
  let matches = defaultMatches;
  if (localMatches) {
    matches = JSON.parse(localMatches);
  }
  const scoreboard = new Scoreboard(matches);
  return <WorldCupScoreboard scoreboard={scoreboard} />;
}

export default App;
