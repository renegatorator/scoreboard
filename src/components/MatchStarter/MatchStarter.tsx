import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import classes from "./MatchStarter.module.scss";
import { NewMatch } from "../../Interfaces";

interface MatchStarterProps {
  startMatch: (newMatch: NewMatch) => void;
}

const MatchStarter: FC<MatchStarterProps> = ({ startMatch }) => {
  const [formData, setFormData] = useState<NewMatch>({ home: "", away: "" });
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStartMatch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values: NewMatch = { ...formData };
    startMatch(values);
    (e.target as any).reset();
    setFormData({ home: "", away: "" });
  };

  useEffect(() => {
    if (formData.home && formData.away && formData.home !== formData.away) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formData.home, formData.away]);

  return (
    <div className={classes.Wrapper}>
      <h2>Start a new match</h2>
      <form onSubmit={handleStartMatch}>
        <label htmlFor="home">Home team name</label>
        <input
          type="text"
          id="home"
          name="home"
          onChange={handleChange}
          autoComplete="off"
        />
        <label htmlFor="away">Away team name</label>
        <input
          type="text"
          id="away"
          name="away"
          onChange={handleChange}
          autoComplete="off"
        />
        <input disabled={submitDisabled} type="submit" value="Start match" />
      </form>
    </div>
  );
};

export default MatchStarter;
