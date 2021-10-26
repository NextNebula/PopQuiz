import { Question } from "./question";

export interface GameStateModel {
    question: Question;
    isQuestionAnswered: boolean;
}