import React from 'react';
import {AnswerObj} from "../App";
import {Wrapper, ButtonWrapper} from "../QuestionCard.styles";

type Question = {
    question:  any;
    answer: string[];
    userAnswer: AnswerObj | undefined;
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    number: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Question> = ({
    question,
    answer,
    userAnswer,
    callback,
    totalQuestions,
    number,
}) => (
    <Wrapper>
        <p className="number">
            Question: {number} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html: question.text}}></p>
        <div>
            {answer.map(
                answer => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        clicked={userAnswer?.answer === answer}
                    >
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </ButtonWrapper>
                ))}
        </div>
    </Wrapper>)


export default QuestionCard;

