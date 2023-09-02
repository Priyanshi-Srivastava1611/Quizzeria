import React, { useState } from "react";
import "./Instructions.css";
import { Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import que from "../../images/que.svg";
import timer from "../../images/timer.svg";
import { Link } from "react-router-dom";
import useShuffle from "../Utils/useShuffle";
export const Instruction = ({ startQuiz }) => {
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 900,
    seconds: 0,
  });

  const { shuffle } = useShuffle();
  const fetchData = () => {
    const API = `https://opentdb.com/api.php?amount=${15}`;

    fetch(API)
      .then((respone) => respone.json())
      .then((data) =>
        setTimeout(() => {
          const { response_code, results } = data;
          results.forEach((element) => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch();
  };

  return (
    <div className="quiz-container">
      <div className="quiz-head">
        <Link
          className="btn-redirect-inst"
          to="/Quizzeria"
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="back-btn">
            <ArrowBackIcon />
          </div>
        </Link>
        <div className="quiz-text">
          <Typography>DETAILS</Typography>
        </div>
      </div>
      <div className="quiz-body">
        <div className="quiz-explanation">
          <Typography className="quiz-explain-text">
            Brief explanation about this quiz
          </Typography>
        </div>
        <div className="quiz-instructions">
          <div className="quiz-inst-1">
            <div className="img-cover">
              <img src={que} style={{ padding: "8px" }}></img>
            </div>
            <div className="quiz-1-text">
              <Typography className="text-big">15 questions</Typography>
              <Typography className="text-small">
                1 point for a correct answer
              </Typography>
            </div>
          </div>
          <div className="quiz-inst-1">
            <div className="img-cover">
              <img src={timer} style={{ padding: "8px" }}></img>
            </div>
            <div className="quiz-1-text">
              <Typography className="text-big">30 mins time</Typography>
              <Typography className="text-small">
                Total duration of the quiz
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="quiz-foot">
        <Typography className="foot-text">
          Please read the text below carefully so you can understand it
        </Typography>
        <ul className="foot-instruction">
          <li className="foot-inner-text">
            1 point is awarded for a correct answer and no marks for a incorrect
            answer.
          </li>
          <li className="foot-inner-text">
            Tap on options to select the correct answer.
          </li>
          <li className="foot-inner-text">
            Click submit if you are sure you want to complete all the quizzes.
          </li>
        </ul>
        <Link to="/Quizzeria/main" style={{ textDecoration: "none" }}>
          <div
            className="quiz-start-btn"
            onClick={() => {
              fetchData();
            }}
          >
            <Button className="start-btn">Start Quiz</Button>
          </div>
        </Link>
      </div>
    </div>
  );
};
