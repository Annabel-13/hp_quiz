import React, {useState} from 'react';
import {fetchQuizQuestions} from "./API";
import {QuestionState} from "./API";
//style
import {GlobalStyle, Wrapper} from "./App.styles";


import QuestionCard from "./components/QuestionCard";
export type AnswerObj = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;

}

const TOTAL_Q = 10;


function App() {

    const[loading, setLoading] = useState(false);
    const[questions, setQuestions] = useState<QuestionState[]>([]);
    const[number, setNumber] = useState(0);
    const[userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
    const[score, setScore] = useState(0);
    const[gameOver, setGameOver] = useState(true);

    console.log(questions);


    const  startQuiz = async() => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(TOTAL_Q, 'harry_potter');

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver)
        {
            const answer = event.currentTarget.value;
            //correct answer?
            const correct = questions[number].correctAnswer === answer;
            //add score
            if (correct) setScore(prevState => prevState + 1);
            //save answers
            // const AnswerObj = {
            //     questions: questions[number].question,
            //     answer,
            //     correct,
            //     correctAnswer: questions[number].correctAnswer,
            // };
            // setUserAnswers((prevState) => [...prevState, AnswerObj]);
            const AnswerObj: AnswerObj = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correctAnswer,
            };

            setUserAnswers((prevState) => [...prevState, AnswerObj]);
        }
    };

    const nextQuestion = () => {
        //move on if it's not last
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_Q)
        {
            setGameOver(true);
        } else {
            setNumber(nextQuestion);
        }
    }

  return (
      <>
        <GlobalStyle/>
      <Wrapper>
          {/*<h1>Harry Potter Quiz</h1>*/}
          <h1>Harry Potter Quiz</h1>
          {
              gameOver || userAnswers.length === TOTAL_Q ?
                  (<button className="start" onClick={startQuiz}>Start</button>)
                  : null
          }
          {!gameOver ? <p className="score">Score:{score}</p> : null}
          {loading ? <p className="">Loading questions...</p> : null }
          {!loading && !gameOver && (
          <QuestionCard
              number={number + 1}
              totalQuestions={TOTAL_Q}
              question={questions[number].question}
              answer={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
          />
          )}
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_Q - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
          ) : null}
      </Wrapper>
      </>
  );
}

export default App;
