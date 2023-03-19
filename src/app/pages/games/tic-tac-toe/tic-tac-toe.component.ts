import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {

  constructor() { }

    // matrix = ['0','1','2','3','4','5','6','7','8'];
    matrix = ['','','','','','','','',''];
    rounds = 9;
    player = true;
    isVictory = '';
    modeOfVictory: number[] = [] as number[];

    text_game: string = '';

    ngOnInit(): void {
    }

    selectCard(index: number){
      // alert(index)
      this.matrix[index] = this.player ? 'X' : '0';
      this.player = !this.player;
      this.rounds--;

      this.rulesOfGame();

      if(this.isVictory || this.rounds <= 0){
          setTimeout(() => {
            if(this.isVictory) {
              this.text_game = 'O '+this.isVictory+' Ganhoou!' ;
              console.log(this.modeOfVictory)
            }
            else if(this.rounds <= 0){
              this.text_game = 'Empate!';
            }
            // this.reset();
          }, 1 * 1000);
      }
    }

    createLineVictory(index: number){
      if(this.isVictory){
        let check = this.modeOfVictory.filter(el => el == index)
        return check.length > 0 ? true : false;
      }
      return
    }

    rulesOfGame(){
      let victory = [[0, 1, 2],  [3, 4 ,5],  [6, 7, 8],
                     [0, 3, 6],  [1, 4, 7],  [2, 5, 8],
                     [0, 4, 8],  [2, 4, 6]
                    ];

      for (let col = 0; col < victory.length; col++) {
        let point_X = 0;
        let point_0 = 0;

        for (let row = 0; row < 3; row++) {
          let position = victory[col][row];
          if(this.matrix[position] == 'X') point_X++;
          if(this.matrix[position] == '0') point_0++;
        }
        // console.log('X: ',point_X, '0: ',point_0);

        if(point_0 == 3){ this.isVictory = '0'; this.modeOfVictory = victory[col] }
        if(point_X == 3){ this.isVictory = 'X'; this.modeOfVictory = victory[col] }

        // console.log('\n');
      }
    }

    reset(){
      this.matrix = ['','','','','','','','',''];
      this.rounds = 9;
      this.player = false;
      this.isVictory = '';
      this.modeOfVictory = [] as number[];
      this.text_game = '';
    }

  }
