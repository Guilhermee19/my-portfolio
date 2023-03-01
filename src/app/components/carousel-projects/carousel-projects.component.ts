import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { EffectCoverflow } from "swiper";

SwiperCore.use([EffectCoverflow]);

@Component({
  selector: 'app-carousel-projects',
  templateUrl: './carousel-projects.component.html',
  styleUrls: ['./carousel-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CarouselProjectsComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
  }
}
