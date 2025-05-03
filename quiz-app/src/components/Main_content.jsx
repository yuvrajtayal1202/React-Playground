import React, { useState, useEffect } from "react";
import "./Main_content.css";
import data from "./data";
export default function Main_content() {
  let [index, setIndex] = useState(1)
  let [question, setQuestion] = useState(data[index]);

  const checkAnswer = (e, ans) =>{
    if (question.ans === ans) {
      e.target.classList.add("correct")
    }
    if (question.ans !== ans) {
      e.target.classList.add("inCorrect")
    }
    console.log(question.ans)
  }
  return (
    <>
      <main className="main">
        <p>{index +1}. {question.question}</p>
        <ul>
          <li onClick={(e) => checkAnswer(e,1)}>{question.option1}</li>
          <li onClick={(e) => checkAnswer(e,2)}>{question.option2}</li>
          <li onClick={(e) => checkAnswer(e,3)}>{question.option3}</li>
          <li onClick={(e) => checkAnswer(e,4)}>{question.option4}</li>
        </ul>
        <button >Next</button>
        <div className="index">1 of 5 questions</div>
      </main>
    </>
  );
}
