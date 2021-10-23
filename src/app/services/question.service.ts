import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient) { }

    getQuestion() {
      return this.http.get('https://api.trivia.willfry.co.uk/questions?categories=movies&limit=1');
  }
}