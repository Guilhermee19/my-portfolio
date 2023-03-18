import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  constructor(private router: Router) {
  }

  code: string = '';
  open: boolean = true;

  ngOnInit(): void {
  }

  checkComand(){
    switch(this.code){
      case 'gamer':
        this.router.navigate(['/gamer'])
        break;
    }
  }
}
