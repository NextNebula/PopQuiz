import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AnswerComponent } from './components/answer/answer.component';
import { QuestionComponent } from './components/question/question.component';
import { environment } from 'src/environments/environment';
import { GameState } from './store/game.state';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([GameState], {
      developmentMode: !environment.production
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
