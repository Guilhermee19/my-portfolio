import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-boy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-boy.component.html',
  styleUrl: './game-boy.component.scss'
})
export class GameBoyComponent {

  gameboy_on = false;
  audio = new Audio('assets/sounds/gameboy-advance-turnon.mp3');

  nextOrBack(click: 'back' | 'next'){
    if(click == 'back' ){
    }
    else  if(click == 'next' ){
    }
  }

  startGame(){
    // this.router.navigate(['/gamer/'+this.list_games[this.index].link])
  }

  gameBoyOnAndOff(){
    this.gameboy_on = !this.gameboy_on;
    this.playSound();
  }

  playSound() {
    if(!this.gameboy_on) {
      this.audio.pause();
    }
    else{
      this.audio.volume = 0.01;
      this.audio.currentTime = 4.2;
      this.audio.play();
    }

  }
}
