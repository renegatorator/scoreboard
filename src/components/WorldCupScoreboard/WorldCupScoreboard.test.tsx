import React from "react";
import { render, screen } from "@testing-library/react";
import WorldCupScoreboard from "./WorldCupScoreboard";
import Scoreboard from "../../features/Scoreboard/Scoreboard";

const scoreboard = new Scoreboard();

render(<WorldCupScoreboard scoreboard={scoreboard} />);

describe("Heading", () => {
  const headings = screen.getAllByRole("heading");

  it("Should display the main heading", () => {
    expect(headings[0]).toBeInTheDocument();
  });

  it("The main heading should say 'World Cup Scoreboard'", () => {
    expect(headings[0]).toHaveTextContent("World Cup Scoreboard");
  });
});

describe("Scoreboard", () => {
  const matches = screen.getAllByRole("row");

  it("Initially 3 matches should appear on the scoreboard", () => {
    expect(matches).toHaveLength(3);
  });
});
