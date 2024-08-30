import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { SwiperModule } from "swiper/angular";
import { PROJECTS } from '../../../constants/projects';
import { SharedModule } from '../../shared/shared.module';

SwiperCore.use([Autoplay, EffectCoverflow, Pagination]);

@Component({
  selector: 'app-carousel-projects',
  standalone: true,
  imports: [SharedModule ,TranslateModule, SwiperModule],
  templateUrl: './carousel-projects.component.html',
  styleUrl: './carousel-projects.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CarouselProjectsComponent {
  listProjects = PROJECTS;
}
