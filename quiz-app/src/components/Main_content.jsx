import React, { useState, useEffect, useRef } from "react";
import "./Main_content.css";
import data from "./data";

export default function Main_content() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const checkAnswer = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("inCorrect");
        const correctOption = optionArray[question.ans - 1];
        if (correctOption?.current) {
          correctOption.current.classList.add("correct");
        }
      }
      setLock(true);
    }
  };

  const handleNext = () => {
    if (index === data.length - 1) {
      setResult(true);
      return;
    }

    if (lock) {
      optionArray.forEach((option) => {
        if (option?.current) {
          option.current.classList.remove("correct", "inCorrect");
        }
      });

      setIndex((prevIndex) => prevIndex + 1);
      setLock(false);
    }
  };
 function handleReset(){
  setResult(false)
  setIndex(0)
  setQuestion(data[0])
  setScore(0)
  setLock(false)
 }
  return (
    <main className="main">
      {result ? (
        <>
        <h2>Your Score: {score} / {data.length}</h2>
        <button onClick={handleReset}>Reset</button>
        </>

      ) : (
        <>
          <p>
            {index + 1}. {question.question}
          </p>
          <ul>
            <li ref={option1} onClick={(e) => checkAnswer(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAnswer(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={handleNext}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </main>
  );
}
