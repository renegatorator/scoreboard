import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import classes from "./MatchStarter.module.scss";
import { NewMatch } from "../../Interfaces";

interface MatchStarterProps {
  startMatch: (newMatch: NewMatch) => void;
}

const MatchStarter: FC<MatchStarterProps> = ({ startMatch }) => {
  const [formData, setFormData] = useState<NewMatch>({ home: "", away: "" });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleStartMatch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: NewMatch = { ...formData };
    startMatch(values);
    (e.target as any).reset();
  };
  return (
    <div className={classes.Wrapper}>
      <h2>Start a new match</h2>
      <form onSubmit={handleStartMatch}>
        <label htmlFor="home">Home team name</label>
        <input type="text" id="home" name="home" onChange={handleChange} />
        <label htmlFor="away">Away team name</label>
        <input type="text" id="away" name="away" onChange={handleChange} />
        <input type="submit" value="Start" />
      </form>
    </div>
  );
};

export default MatchStarter;
