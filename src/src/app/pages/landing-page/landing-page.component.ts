import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PageLoadingComponent } from '../../components/shared/page-loading/page-loading.component';
import { InitialPresentationComponent } from '../../components/landing-page/initial-presentation/initial-presentation.component';
import { AboutMeComponent } from '../../components/landing-page/about-me/about-me.component';
import { CarouselProjectsComponent } from '../../components/landing-page/carousel-projects/carousel-projects.component';
import { SkillsComponent } from '../../components/landing-page/skills/skills.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    TranslateModule,
    PageLoadingComponent,
    InitialPresentationComponent,
    AboutMeComponent,
    CarouselProjectsComponent,
    SkillsComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  private el = inject(ElementRef);
  private router = inject(Router);

  year= new Date().getFullYear();

}
