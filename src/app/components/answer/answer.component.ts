import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { GetNewQuestion, SetQuestionAnswered } from 'src/app/store/game.actions';
import { GameState } from 'src/app/store/game.state';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  private isQuestionAnsweredSubscription: Subscription;

  @Input() answer!: Answer;
  @Select(GameState.getIsQuestionAnswered) isQuestionAnswered$: Observable<boolean>;
  
  isAnsweredCorrect: boolean = false;
  isAnsweredWrong: boolean = false;
  isQuestionAnswered: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.isQuestionAnsweredSubscription = this.isQuestionAnswered$.subscribe(_ => this.isQuestionAnswered = _)
  }

  ngOnDestroy(): void {
    this.isQuestionAnsweredSubscription.unsubscribe();
  }

  onClick(isCorrent: boolean) {
    //If already answered do nothing
    if (this.isQuestionAnswered)
      return;

    //Set game state answered
    this.store.dispatch(new SetQuestionAnswered());

    //Handle button styling state
    if (isCorrent) {
      this.isAnsweredCorrect = true;      
    }
    else {
      this.isAnsweredWrong = true;
    }

    //Wait and get a new question
    setTimeout(() => {
      this.store.dispatch(new GetNewQuestion());
    }, 2000);
  }
}
