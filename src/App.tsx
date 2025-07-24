import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import QuestionCard from './components/QuestionCard';
import Modal from './components/Modal';
import cauldron from '../src/images/cauldron.gif'

export type AnswerObj = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const TOTAL_Q = 10;

function App() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const startQuiz = async () => {
        setLoading(true);
        setGameOver(false);
        setShowModal(false);

        const newQuestions = await fetchQuizQuestions(TOTAL_Q, 'harry_potter');

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = event.currentTarget.value;
            const correct = questions[number].correctAnswer === answer;
            if (correct) setScore((prevState) => prevState + 1);
            const answerObj: AnswerObj = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correctAnswer,
            };
            setUserAnswers((prevState) => [...prevState, answerObj]);
        }
    };

    const nextQuestion = () => {
        const nextQ = number + 1;
        if (nextQ === TOTAL_Q) {
            setShowModal(true);
            setGameOver(true);

        } else {
            setNumber(nextQ);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    //  useEffect, gameOver и userAnswers
    // useEffect(() => {
    //     if (gameOver && nextQ === TOTAL_Q) {
    //         setShowModal(true);
    //     }
    // }, [gameOver, userAnswers]);

    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <h1>Harry Potter Quiz</h1>

                {/* start button */}
                {gameOver ? (
                    <button className="start" onClick={startQuiz}>
                        Start Quiz
                    </button>
                ) : null}

                {loading ? <p>Loading questions...</p> : null}

                 {/*next question button and card*/}
                {!gameOver && !loading && (
                    <QuestionCard
                        number={number + 1}
                        totalQuestions={TOTAL_Q}
                        question={questions[number].question}
                        answer={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        callback={checkAnswer}
                    />
                )}

                {!gameOver && userAnswers.length === number + 1 ? (
                    <button className="next" onClick={nextQuestion}>
                        {number === TOTAL_Q - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                ) : null}


                {/* show modal window */}
                <Modal show={showModal} onClose={closeModal}>
                    <h2>Results</h2>
                    <p>
                        Your cauldron cooks for {score} from {TOTAL_Q} points.
                    </p>
                    <img src={cauldron} alt="Funny animation of cauldron" />
                    <button onClick={closeModal}>Close</button>
                </Modal>
            </Wrapper>
        </>
    );
}

export default App;



