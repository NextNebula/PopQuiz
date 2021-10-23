import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameState } from '../../store/game.state';
import { Question } from '../../models/question';
import { GetNewQuestion } from 'src/app/store/game.actions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Select(GameState.getQuestion) question$: Observable<Question>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetNewQuestion());
  }
}
