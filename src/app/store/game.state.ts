import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { shuffleArray } from '../helpers/arrayHelpers';

import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { GetNewQuestion } from './game.actions';

export class GameStateModel {
    question: Question;
}

@State<GameStateModel>({
    name: 'gamestate'
})
@Injectable()
export class GameState {

  constructor(private questionService: QuestionService) { }

  @Selector()
  static getQuestion(state: GameStateModel) {
      return state.question;
  }

  @Action(GetNewQuestion)
  getNewQuestion({getState, setState}: StateContext<GameStateModel>) {
      return this.questionService.getQuestion().pipe(tap((result) => {
          const state = getState();

          const incorrectAnswers = shuffleArray(result[0].incorrectAnswers).slice(0, 3);

          const question: Question = {
            question: result[0].question,
            answers: shuffleArray([result[0].correctAnswer, ...incorrectAnswers])
          }

          setState({
              ...state,
              question
          });
      }));
  }
}
