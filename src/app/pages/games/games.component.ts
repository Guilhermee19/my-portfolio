import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  list_games = [
    {name: 'Jogo da velha', link: 'tic-tac-toe'},
    {name: 'Uno', link: 'uno'},
    {name: 'Jogo da memória', link: 'memory-game'},
  ]
  index: number = 0;

  name_game: any = '';

  ngOnInit(): void {
    this.name_game = this.route.snapshot.paramMap.get('name_game') || 'null';

    console.log(this.name_game);
  }

  nextOrBack(event: any){
    console.log(event);
  }
}
