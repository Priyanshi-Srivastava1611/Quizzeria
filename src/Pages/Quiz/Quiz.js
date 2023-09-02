import React, { useState, useEffect } from "react";
import "./Quiz.css";
import InfoIcon from "@mui/icons-material/Info";
import he from "he";
import useShuffle from "../Utils/useShuffle";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";
import Countdown from "../../Components/CountDown";
import { Button, Dialog, Typography } from "@mui/material";
import Swal from "sweetalert2";

export const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [visitedQuestions, setVisitedQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const { shuffle, getLetter, timeConverter } = useShuffle();
  const [prev, setprev] = useState(false);
  const [next, setnext] = useState(false);
  const [submit, setsubmit] = useState(false);
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          title: `Your Time's Up`,
          icon: "info",
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, [timerTime]);
  useEffect(() => {
    handleQuestionVisited(questionIndex);
    if (questionIndex === 0) {
      if (questionsAndAnswers[questionIndex]) {
        setUserSlectedAns(questionsAndAnswers[questionIndex].user_answer);
      }
      setprev(false);
      return;
    } else setprev(true);

    if (questionsAndAnswers[questionIndex]) {
      setUserSlectedAns(questionsAndAnswers[questionIndex].user_answer);
      setnext(true);
    } else setnext(false);
  }, [questionIndex]);
  const handleItemClick = (e, name) => {
    setUserSlectedAns(name);
    setnext(true);
  };
  const handleQuestionVisited = (questionId) => {
    console.log("priyanshi", visitedQuestions);
    if (!visitedQuestions.includes(questionId)) {
      setVisitedQuestions([...visitedQuestions, questionId]);
    }
  };
  const handlejump = (param) => {
    setQuestionIndex(param);
  };
  const handleNext = () => {
    let point = 0;
    if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers;

    qna[questionIndex] = {
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),

      point,
    };

    if (questionIndex === data.length - 1) {
      setsubmit(true);
      // Swal.fire({
      //   title: "Are you sure you want to exit?",
      //   showDenyButton: true,
      //   confirmButtonText: "Yes",
      //   denyButtonText: "No",
      //   timer: 5000,
      //   willClose: () =>
      //     endQuiz({
      //       totalQuestions: data.length,
      //       correctAnswers: correctAnswers + point,
      //       timeTaken,
      //       questionsAndAnswers: qna,
      //     }),
      // });
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    if (qna[questionIndex]) {
      setUserSlectedAns(questionsAndAnswers[questionIndex]?.user_answer);
    } else {
      setUserSlectedAns(null);
    }
    setQuestionsAndAnswers(qna);
  };
  const handlePrev = () => {
    setUserSlectedAns(questionsAndAnswers[questionIndex - 1].user_answer);
    setnext(true);
    if (questionIndex == 0) setprev(false);
    else setprev(true);
    setQuestionIndex(questionIndex - 1);
    // const qna = questionsAndAnswers;
    // qna.push({
    //   question: he.decode(data[questionIndex].question),
    //   user_answer: userSlectedAns,
    //   correct_answer: he.decode(data[questionIndex].correct_answer),
    //   point,
    // });
  };
  const handlesubmit = () => {
    Swal.fire({
      title: "Are you sure you want to exit?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });
  };
  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <div className="question-container">
      <div className="question-panel">
        <div className="que-panel-parent">
          {data.map((question, index) => (
            <div
              className="each-que-panel"
              key={index}
              style={{
                color:
                  visitedQuestions.includes(index) && index !== questionIndex
                    ? "green"
                    : index === questionIndex
                    ? "blue"
                    : "black",
              }}
              onClick={() => handlejump(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="detail">
          <div className="detail-child">
            <div
              className="small-circle"
              style={{ backgroundColor: "green" }}
            ></div>
            <Typography>Answered</Typography>
          </div>
          <div className="detail-child">
            <div
              className="small-circle"
              style={{ backgroundColor: "blue" }}
            ></div>
            <Typography>Current</Typography>
          </div>
          <div className="detail-child">
            <div
              className="small-circle"
              style={{ backgroundColor: "black" }}
            ></div>
            <Typography>Unvisited</Typography>
          </div>
        </div>
        <div className="ui container">
          <div className="ui segment">
            <div className="ui divided items">
              <div className="item">
                <div className="content">
                  <div className="extra">
                    <h1 className="ui block left floated header">
                      <InfoIcon />
                      <div className="content" style={{ fontSize: "24px" }}>
                        {`Question No.${questionIndex + 1} of ${data?.length}`}
                      </div>
                    </h1>
                    <div className="ui massive basic right floated buttons">
                      <button className="ui active button">{hours}</button>
                      <button className="ui active button">{minutes}</button>
                      <button className="ui active button">{seconds}</button>
                    </div>
                  </div>
                  <div className="meta">
                    <div className="ui huge floating message">
                      <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
                    </div>
                    <div className="description">
                      <h3 style={{ display: "flex" }}>
                        Please choose one of the following answers:
                      </h3>
                    </div>
                    <div className="ui divider"></div>
                    <div className="ui massive fluid vertical menu">
                      {data[questionIndex].options.map((option, i) => {
                        const letter = getLetter(i);
                        const decodedOption = he.decode(option);
                        return (
                          <a
                            className={`item ${
                              userSlectedAns === decodedOption && "active"
                            }
                            }`}
                            onClick={(e) => handleItemClick(e, decodedOption)}
                          >
                            <b style={{ marginRight: "8px" }}>{letter}</b>
                            {decodedOption}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="ui divider"></div>
                  <div className="extra buttons-next-prev">
                    <button
                      className={`ui big icon primary disabled right floated right labeled button ${
                        prev ? "nextactive" : "next-inactive"
                      }`}
                      disabled=""
                      tabindex="-1"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                    {questionIndex !== data.length - 1 ? (
                      <button
                        className={`ui big icon primary disabled right floated right labeled button ${
                          next ? "nextactive" : "next-inactive"
                        }`}
                        disabled=""
                        tabindex="-1"
                        onClick={handleNext}
                      >
                        Save & Next
                      </button>
                    ) : (
                      <button
                        className={`ui big icon primary disabled right floated right labeled button ${
                          next ? "nextactive" : "next-inactive"
                        }`}
                        disabled=""
                        tabindex="-1"
                        onClick={() => {
                          handleNext();
                        }}
                      >
                        Save & Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
