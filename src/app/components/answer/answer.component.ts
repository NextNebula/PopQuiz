import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Answer } from 'src/app/models/answer';
import { GetNewQuestion } from 'src/app/store/game.actions';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answer!: Answer;
  
  isAnsweredCorrect: boolean = false;
  isAnsweredWrong: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void { }

  onClick(isCorrent: boolean) {
    if (isCorrent) {
      this.isAnsweredCorrect = true;
      setTimeout(() => {
        this.store.dispatch(new GetNewQuestion());
      }, 2000);
      
    }
    else {
      this.isAnsweredWrong = true;
    }
  }
}
