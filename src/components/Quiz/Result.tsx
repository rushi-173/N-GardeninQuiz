import React from "react";
import { QuestionsState } from "./Quiz";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import "./Result.css";
type ResultProps = {
  questions: QuestionsState[];
  responses: string[];
  score: number;
  startQuiz: () => void;
};

function Result({ questions, responses, score, startQuiz }: ResultProps) {

  return (
    <div className="result--container">
      <h1>You scored {(score * 100).toFixed(2)}%</h1>
      
      <hr style={{ width: "80vw", marginBottom: "2rem" }} />
      {questions.map((que, index) => (
        <div className="question--body">
          <h1 className="question">
            {index + 1}. {que.question}
          </h1>
          <ol>
            {que.answers.map((opt: string) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <li
                  style={{
                    color:
                      opt === que.correct_answer
                        ? "green"
                        : opt === responses[index]
                        ? "red"
                        : "#000",
                        fontWeight:
                      opt === que.correct_answer
                        ? "bold"
                        : opt === responses[index]
                        ? "bold"
                        : "initial",
                        backgroundColor:
                      opt === que.correct_answer
                        ? "#CCFF90"
                        : opt === responses[index]
                        ? "#FFCDD2"
                        : "#fff"


                  }}
                >
                  {opt}
                </li>
                {opt === responses[index] && opt !== que.correct_answer && (
                  <ImCross className="icon" color="red" size={24} />
                )}
                {opt === responses[index] && opt === que.correct_answer && (
                  <FaCheck className="icon" color="green" size={24} />
                )}
              </div>
            ))}
          </ol>
        </div>
      ))}
      <button className="btn btn-primary" onClick={startQuiz}>Try Again</button>
    </div>
  );
}

export default Result;
