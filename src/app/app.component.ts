import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlayingState } from './models/enums/playingState';
import { GameState } from './store/game.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'popquiz';
  
  @Select(GameState.getPlayingState) playingState$: Observable<PlayingState>;
  playingState = PlayingState;
}
