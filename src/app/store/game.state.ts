import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { SetCategoryPayload } from '../models/actions/SetCategoryPayload';
import { Category } from '../models/enums/category';
import { PlayingState } from '../models/enums/playingState';
import { GameStateModel } from '../models/gameState';

import { QuestionService } from '../services/question.service';
import { GetNewQuestion, SetCategory, SetQuestionAnswered } from './game.actions';

@State<GameStateModel>({
    name: 'gamestate',
    defaults: {
      playingState: PlayingState.NewGame,
      isQuestionAnswered: false,
      category: null,
      question: null,
    }
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

  @Selector()
  static getPlayingState(state: GameStateModel) {
    return state.playingState;
  }

  @Action(GetNewQuestion)
  getNewQuestion({getState, setState}: StateContext<GameStateModel>) {
    const state = getState();
    
    return this.questionService.getQuestion(state.category).pipe(tap((result) => {
        setState({
            ...state,
            question: result,
            isQuestionAnswered: false,
        });
    }));
  }

  @Action(SetQuestionAnswered)
  setQuestionAnswered({getState, setState}: StateContext<GameStateModel>) {
    const state = getState();

    setState({
        ...state,
        isQuestionAnswered: true,
    });
  }

  @Action(SetCategory)
  setCategory({getState, setState}: StateContext<GameStateModel>, payload: SetCategoryPayload) {
    const state = getState();

    setState({
        ...state,
        category: payload.category,
        playingState: PlayingState.Playing
    });
  }
}
