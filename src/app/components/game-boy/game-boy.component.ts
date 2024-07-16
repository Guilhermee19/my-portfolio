import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-boy',
  standalone: true,
  imports: [],
  templateUrl: './game-boy.component.html',
  styleUrls: ['./game-boy.component.scss']
})
export class GameBoyComponent implements OnInit {

  constructor(
    private router: Router,
  ) {}

  @Input() list_games: any = [];
  @Input() index: any = 0;
  @Output() gameboy = new EventEmitter<string>();


  ngOnInit(): void {

  }

  nextOrBack(click: 'back' | 'next'){
    if(click == 'back' && this.index > 0 ){
      this.index--;
      this.gameboy.emit(this.index);
    }
    else  if(click == 'next' && this.index+1 < this.list_games.length ){
      this.index++;
      this.gameboy.emit(this.index);
    }
  }

  startGame(){
    this.router.navigate(['/gamer/'+this.list_games[this.index].link])
  }

}
