import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { PROJECTS } from "src/app/constants/projects";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { SwiperModule } from "swiper/angular";

SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

@Component({
  selector: 'app-carousel-projects',
  standalone: true,
  imports: [CommonModule, SwiperModule, TranslateModule],
  templateUrl: './carousel-projects.component.html',
  styleUrls: ['./carousel-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CarouselProjectsComponent{
  listProjects = PROJECTS
}
