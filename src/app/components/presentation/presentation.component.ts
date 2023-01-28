import { Component, ElementRef } from '@angular/core';
import VanillaTilt from "vanilla-tilt";

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {
  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // add vanilla-tilt effect on .<class-name> cards
    VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".effect_move"), { max: 10, speed: 500, scale: 1.05 }
    );
  }
}
