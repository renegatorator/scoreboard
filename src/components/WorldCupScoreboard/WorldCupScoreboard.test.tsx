import React from "react";
import { render, screen } from "@testing-library/react";
import WorldCupScoreboard from "./WorldCupScoreboard";

it("Should display the correct title", () => {
  render(<WorldCupScoreboard />);
  const title = screen.getByText("World Cup Scoreboard");
  expect(title).toBeInTheDocument();
});
