import React, { createContext, useContext, useState } from "react";

export type Score = {
  user: string | undefined;
  highscore: number;
  globalHighscore: number;
};

export type Scores = {
  topic: string;
  scores: Score[];
};

export type ScoreContextType = {
  scores: Scores[];
  setScores: (scores: Scores[]) => void;
};

const ScoreContext = createContext<ScoreContextType>({
  scores: [],
  setScores: (scores) => console.log(scores),
});

export const ScoreProvider: React.FC = ({ children }) => {
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem("score") || "[]")
  );

  return (
    <ScoreContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoreContext.Provider>
  );
};

export function useScore() {
  return useContext(ScoreContext);
}
