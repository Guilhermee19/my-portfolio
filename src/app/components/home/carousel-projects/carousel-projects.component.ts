import { Component, ViewEncapsulation } from "@angular/core";
import { PROJECTS } from "src/app/constants/projects";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";

SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

@Component({
  selector: 'app-carousel-projects',
  templateUrl: './carousel-projects.component.html',
  styleUrls: ['./carousel-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CarouselProjectsComponent{
  listProjects = PROJECTS
}
