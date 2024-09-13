import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PageLoadingComponent } from '../../components/shared/page-loading/page-loading.component';
import { InitialPresentationComponent } from '../../components/landing-page/initial-presentation/initial-presentation.component';
import { AboutMeComponent } from '../../components/landing-page/about-me/about-me.component';
import { CarouselProjectsComponent } from '../../components/landing-page/carousel-projects/carousel-projects.component';
import { SkillsComponent } from '../../components/landing-page/skills/skills.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PageLoadingComponent,
    InitialPresentationComponent,
    AboutMeComponent,
    CarouselProjectsComponent,
    SkillsComponent,
    RouterModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  year= new Date().getFullYear();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let divScroll: any = document.getElementById('scroll-wrapper');
    if (window.pageYOffset > window.innerHeight / 9) {
      divScroll.style.opacity = '0';
    } else {
      divScroll.style.opacity = '1';
    }
  }
}
