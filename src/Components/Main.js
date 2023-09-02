import React, { useState } from "react";
import useShuffle from "../Pages/Utils/useShuffle";
import { Loader } from "../Pages/Loader/Loader";
import { Instruction } from "../Pages/Instruction/instructions";
import { Quiz } from "../Pages/Quiz/Quiz";
import { ShowResults } from "../Pages/Result/ShowResults";
import { Link } from "react-router-dom";
const Main = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const startQuiz = (data, countdownTime) => {
    setLoading(true);
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && !isQuizStarted && !isQuizCompleted && (
        <Instruction startQuiz={startQuiz} />
      )}
      {!loading && isQuizStarted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />
      )}
      {!loading && isQuizCompleted && <ShowResults {...resultData} />}
    </>
  );
};

export default Main;
