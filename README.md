# World Cup Scoreboard

This is a React application that implements a scoreboard. It allows you to start matches, update scores, finish matches, and displays a summary of matches in progress.

## Features

- Start a new match with home and away teams.
- Update the scores of ongoing matches.
- Finish a match and remove it from the scoreboard.
- Get a summary of matches in progress ordered by total score and start time.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A statically-typed superset of JavaScript that compiles to plain JavaScript.
- Create React App (CRA): A tool for bootstrapping React applications with a predefined setup.
- Testing Library: A set of utilities for testing React components.
- Jest: A JavaScript testing framework.
- Sass: A preprocessor scripting language for CSS.

## How to Use

1. Clone the repository: `git clone https://github.com/renegatorator/scoreboard`
2. Install dependencies: `cd scoreboard && npm install`
3. Start the application: `npm start`
4. Open your browser and visit `http://localhost:3000` to view the app.

## Usage

1. Start a new match:

   - Enter the names of the home team and away team in the "Start New Match" section.
   - Click the "Start match" button to add the match to the scoreboard.

2. Update the score of a match:

   - Each match in progress has an "Update score" button next to it.
   - Click the Update score button to turn scores into input fields.
   - Enter the new home score and away score for a match in the input fields.
   - Click the "Save score" button to save the changes.

3. Finish a match:

   - Each match in progress has a "Finish" button next to it.
   - Click the "Finish" button to remove the match from the scoreboard.

4. Get the summary of matches in progress:

   - The matches are displayed in the "World Cup Scoreboard" section.
   - Matches are sorted by total score (descending).
   - If multiple matches have the same total score, the most recently started match is placed higher.

5. Notes:
   - This application stores matches in the local storage in order to preserve user changes.
   - This application has minimal styling. This intentional design choice aligns with the project requirements.

Feel free to explore the application and experiment with different scores and matches!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
