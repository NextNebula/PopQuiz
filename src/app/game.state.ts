
import { State, Selector } from '@ngxs/store';
import { Question } from './models/question';

export class GameStateModel {
    question: Question;
}

const testQuestion : Question = {
  question: "With how many players do you want to play?",
  answers: ["1", "2", "3", "4"]
}

@State<GameStateModel>({
    name: 'gamestate',
    defaults: {
      question: testQuestion,
    }
})
export class GameState {
    @Selector()
    static getQuestion(state: GameStateModel) {
        return state.question;
    }
}