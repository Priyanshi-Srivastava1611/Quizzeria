import React from "react";
import { Button, Typography } from "@mui/material";
import "./ShowResults.css";
import results from "../../images/results.png";
import { Link } from "react-router-dom";
export const ShowResults = ({
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
}) => {
  let index = 0;
  return (
    <div className="result-container">
      <div className="result-parent">
        <img src={results}></img>
        <Typography style={{ fontSize: "30px" }}>Results</Typography>
      </div>
      <div className="result-head">
        <Typography className="result-text">{`Your Score is ${correctAnswers}`}</Typography>
      </div>
      <div className="result-body">
        {questionsAndAnswers.map((element, i) => {
          index += 1;
          return (
            <div className="parent-div">
              <div className="que-div">
                <div className="index">
                  {index}
                  {". "}
                </div>
                <div className="que-display">{element.question}</div>
              </div>
              <div className="ans-div">
                <div className="grid-item">{element.correct_answer}</div>
                <div
                  className={`grid-item ${
                    element.user_answer === element.correct_answer
                      ? "correct"
                      : "wrong"
                  }`}
                >
                  {element.user_answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="result-foot">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="back-btn-home">{"BACK HOME"}</div>
        </Link>
      </div>
    </div>
  );
};
