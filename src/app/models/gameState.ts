import { Category } from "./enums/category";
import { PlayingState } from "./enums/playingState";
import { Question } from "./question";

export interface GameStateModel {
    playingState: PlayingState;
    isQuestionAnswered: boolean;
    category: Category;
    question: Question;
}