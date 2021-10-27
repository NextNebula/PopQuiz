import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Question } from '../models/question';
import { shuffleArray } from '../helpers/arrayHelpers';
import { Category } from '../models/enums/category';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient) { }

    getQuestion(category: Category) {
      return this.http.get<Question>(`https://api.trivia.willfry.co.uk/questions?categories=${category}&limit=1`).pipe(map(result => {
        const apiQuestion = result[0];
        const incorrectAnswers = shuffleArray(apiQuestion.incorrectAnswers).slice(0, 3);

        const question: Question = {
          question: apiQuestion.question,
          answers: shuffleArray([{ answer: apiQuestion.correctAnswer, isCorrent: true }, ...incorrectAnswers.map(_ => { return { answer: _, isCorrent: false} })]),
        };

        return question;
      }));
  }
}