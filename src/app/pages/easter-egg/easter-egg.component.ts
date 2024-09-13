import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameBoyComponent } from '../../components/easter-egg/game-boy/game-boy.component';

@Component({
  selector: 'app-easter-egg',
  standalone: true,
  imports: [CommonModule,GameBoyComponent],
  templateUrl: './easter-egg.component.html',
  styleUrl: './easter-egg.component.scss'
})
export class EasterEggComponent {

}
