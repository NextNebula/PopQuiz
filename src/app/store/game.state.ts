import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { GameStateModel } from '../models/gameState';

import { QuestionService } from '../services/question.service';
import { GetNewQuestion, QuestionAnswered } from './game.actions';

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

  @Selector()
  static getIsQuestionAnswered(state: GameStateModel) {
    return state.isQuestionAnswered;
  }

  @Action(GetNewQuestion)
  getNewQuestion({getState, setState}: StateContext<GameStateModel>) {
    return this.questionService.getQuestion().pipe(tap((result) => {
        const state = getState();

        setState({
            ...state,
            question: result,
            isQuestionAnswered: false,
        });
    }));
  }

  @Action(QuestionAnswered)
  questionAnswered({getState, setState}: StateContext<GameStateModel>) {
    const state = getState();

    setState({
        ...state,
        isQuestionAnswered: true,
    });
  }
}
