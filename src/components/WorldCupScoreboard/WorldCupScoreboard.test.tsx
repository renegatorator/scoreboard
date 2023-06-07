import React from "react";
import { render, screen } from "@testing-library/react";
import WorldCupScoreboard from "./WorldCupScoreboard";

render(<WorldCupScoreboard />);

describe("Title", () => {
  const title = screen.getByRole("heading");

  it("Should display the title", () => {
    expect(title).toBeInTheDocument();
  });

  it("The title should say World Cup Scoreboard", () => {
    expect(title.textContent).toBe("World Cup Scoreboard");
  });
});

describe("Scoreboard", () => {
  const matches = screen.getAllByRole("row");

  it("Initially 3 matches should appear on the scoreboard", () => {
    expect(matches).toHaveLength(3);
  });
});
