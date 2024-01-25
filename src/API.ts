// export enum difficulty {
//     EASY = "easy",
//     MEDIUM = "medium",
//     HARD = "hard",
// }
// export const fetchQuizQuestions = async (amount:number, difficulty) => {
//     const endpoint = `https://the-trivia-api.com/v2/questions`
// }
import {shuffleArray} from "./utils";

export type Question = {
    category: string;
    correctAnswer: string;
    difficulty: string;
    id: string;
    incorrectAnswers: string[];
    isNiche: boolean;
    question: string;
    region: string[];
    tags: string[];
    type: string;
}

export type QuestionState = Question & {
    answers: string[],
    // answer: string;//delete this after
};

export const fetchQuizQuestions = async (amount:number, tags: string) => {
    // const categoryID = 447; // Harry Potter category ID
    const endpoint = `https://the-trivia-api.com/v2/questions?amount=${amount}&tags=${tags}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            // Handle the fetched data
            return data.map((question: Question) => ({
                    ...question,
                    answers: shuffleArray([
                        ...question.incorrectAnswers,
                        question.correctAnswer,
                    ]),
                }));
            // return data;
    }else {
            // Handle errors
            throw new Error(data.message || 'Failed to fetch questions');
        }
    } catch (error) {
        // Handle fetch errors
        console.error(error);
        throw error;
    }
};
