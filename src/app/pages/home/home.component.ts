import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Router } from '@angular/router';

SwiperCore.use([EffectCoverflow, Pagination]);

// import VanillaTilt from "vanilla-tilt";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  constructor(
    private el: ElementRef,
    private router: Router
  ) { }

  year= new Date().getFullYear();
  loading = true

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1 * 1000);
  }

  startGame(){
    const main: any = document.querySelector('cuboMario');
    // console.log(main);

    main.classList.toggle('effect-open');
    setTimeout(() => {
      this.router.navigate([`/gamer`]);
    }, 500);
  }

}
