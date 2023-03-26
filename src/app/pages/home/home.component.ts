import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import VanillaTilt from "vanilla-tilt";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let divScroll: any = document.getElementById('scroll-wrapper');
    if (window.pageYOffset > window.innerHeight / 9) {
      divScroll.style.opacity = '0';
    } else {
      divScroll.style.opacity = '1';
    }
  }

  constructor(private el: ElementRef) { }

  year= new Date().getFullYear();

  ngOnInit(): void {
     // add vanilla-tilt effect on .<class-name> cards
     VanillaTilt.init(
      this.el.nativeElement.querySelectorAll(".effect_move"), { max: 10, speed: 500, scale: 1.05 }
    );
  }

}
