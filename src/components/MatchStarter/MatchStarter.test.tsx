import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MatchStarter from "./MatchStarter";
import Scoreboard from "../../features/Scoreboard/Scoreboard";
import { NewMatch } from "../../Interfaces";

const scoreboard = new Scoreboard();
const startMatch = (newMatch: NewMatch) => {
  scoreboard.startMatch(newMatch.home, newMatch.away);
};

render(<MatchStarter startMatch={startMatch} />);

describe("Heading", () => {
  const heading = screen.getByRole("heading");

  it("Should display the title", () => {
    expect(heading).toBeInTheDocument();
  });

  it("The title should say 'Start a new match'", () => {
    expect(heading).toHaveTextContent("Start a new match");
  });
});

describe("Start new match", () => {
  const homeField: HTMLInputElement = screen.getByLabelText("Home team name");
  const awayField: HTMLInputElement = screen.getByLabelText("Away team name");
  expect(homeField).toBeInTheDocument();
  expect(awayField).toBeInTheDocument();
  const startButton = screen.getByDisplayValue("Start");

  it("Input field values should be empty strings", () => {
    expect(homeField).toHaveValue("");
    expect(awayField).toHaveValue("");
  });

  fireEvent.change(homeField, { target: { value: "Cuba" } });
  fireEvent.change(awayField, { target: { value: "Fiji" } });
  fireEvent.click(startButton);

  it("The new match should be in the matches array'", () => {
    const newMatch = scoreboard
      .getMatches()
      .find((match) => match.homeTeam.name === "Cuba");
    expect(newMatch?.awayTeam.name).toEqual("Fiji");
  });

  it("The new match should have a score of 0:0", () => {
    const newMatch = scoreboard
      .getMatches()
      .find((match) => match.homeTeam.name === "Cuba");
    expect(newMatch?.homeTeam.score).toEqual(0);
    expect(newMatch?.awayTeam.score).toEqual(0);
  });
});
