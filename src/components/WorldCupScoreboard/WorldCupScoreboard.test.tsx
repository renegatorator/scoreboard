import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import WorldCupScoreboard from "./WorldCupScoreboard";
import Scoreboard from "../../features/Scoreboard/Scoreboard";
import { defaultMatches } from "../../globalConstants";

const scoreboard = new Scoreboard(defaultMatches);

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

  const finishButton = screen.getAllByText("Finish")[0];
  fireEvent.click(finishButton);
  const updatedMatches = screen.getAllByRole("row");

  it("Finishing a match should remove it from the scoreboard", () => {
    expect(updatedMatches).toHaveLength(2);
  });

  const updateScoreButton = screen.getAllByText("Update score")[0];
  fireEvent.click(updateScoreButton);
  const inputField: HTMLInputElement = screen.getByDisplayValue(3);
  const allInputs = screen.getAllByRole("spinbutton");
  it("When update button is clicked, input fields for score updates should appear", () => {
    expect(allInputs).toHaveLength(2);
  });

  fireEvent.change(inputField, { target: { value: 46 } });
  it("Input should have changed value", () => {
    expect(inputField).toHaveValue(46);
  });

  const saveButton = screen.getByText("Save score");
  fireEvent.click(saveButton);
  const elementWithNewScore = screen.getByText("46 : 2");
  it("Saving a new value should display it in the scoreboard", () => {
    if (!elementWithNewScore) {
      throw Error();
    }
  });
});
