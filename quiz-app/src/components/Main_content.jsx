import React, { useState, useEffect, useRef } from "react";
import "./Main_content.css";

export default function Main_content() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const [amount, setAmount] = useState();
  const [difficulty, setDifficulty] = useState();
  const [startGame, setStartGame] = useState(true);
   
  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];
 function handleStart(){
   if(!amount){
     alert("Please Enter the Number of Questions")
     return;
    }
    if(!difficulty){
    alert("Please Select Difficulty Level")
    return;
  }
  setStartGame(false)
  fetch(`https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`)
      .then(res => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => {
          const allAnswers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          allAnswers.splice(randomIndex, 0, q.correct_answer);

          return {
            question: q.question,
            options: allAnswers,
            correctIndex: randomIndex
          };
        });
        setQuestions(formatted);
        setQuestion(formatted[0]);
      });
 }
  useEffect(() => {
    if (questions.length > 0) {
      setQuestion(questions[index]);
    }
  }, [index, questions]);

  const checkAnswer = (e, selectedIndex) => {
    if (!lock) {
      if (selectedIndex === question.correctIndex) {
        e.target.classList.add("correct");
        setScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add("inCorrect");
        const correctOption = optionArray[question.correctIndex];
        if (correctOption?.current) {
          correctOption.current.classList.add("correct");
        }
      }
      setLock(true);
    }
  };

  const handleNext = () => {
    if (index === questions.length - 1) {
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

  const handleReset = () => {
    setResult(false);
    setIndex(0);
    setScore(0);
    setLock(false);
    setQuestion(questions[0]);
    setAmount()
    setDifficulty()
    setStartGame(true)
    
  };
  return (
    <main className="main">
      {startGame? (
   <>
   <p>Select No. of Questions</p>
   <input 
   type="Number" 
   value={amount || ''}  
   onChange={(e) => setAmount(Number(e.target.value))}
   id="input-number"
/>
   <p>Select Difficulty level </p>
   <ul>
  <li onClick={() => setDifficulty('easy')} style={{ backgroundColor: difficulty === 'easy' ? 'lightgreen' : 'white' }}>Easy</li>
  <li onClick={() => setDifficulty('medium')} style={{ backgroundColor: difficulty === 'medium' ? 'lightgreen' : 'white' }}>Medium</li>
  <li onClick={() => setDifficulty('hard')} style={{ backgroundColor: difficulty === 'hard' ? 'lightgreen' : 'white' }}>Hard</li>
</ul>
   <button onClick={handleStart}>Start Quiz</button>

   </>
      ): result ? ( 
        <>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={handleReset}>Reset</button>
        </>
      ) : question ? (
        <>
          <p>{index + 1}. {question.question}</p>
          <ul>
            {question.options.map((option, i) => (
              <li key={i} ref={optionArray[i]} onClick={(e) => checkAnswer(e, i)}>
                {option}
              </li>
            ))}
          </ul>
          <button onClick={handleNext}>Next</button>
          <div className="index">{index + 1} of {questions.length} questions</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
