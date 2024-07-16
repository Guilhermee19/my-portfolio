import { VerticalScrollComponent } from './../../components/vertical-scroll/vertical-scroll.component';
import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AboutMeComponent } from 'src/app/components/home/about-me/about-me.component';
import { CarouselProjectsComponent } from 'src/app/components/home/carousel-projects/carousel-projects.component';
import { SkillsComponent } from 'src/app/components/home/skills/skills.component';
import { LoadingPageComponent } from 'src/app/components/loading-page/loading-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutMeComponent, SkillsComponent, CarouselProjectsComponent, VerticalScrollComponent, LoadingPageComponent, TranslateModule],
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

  private translate = inject(TranslateService);
  private el = inject(ElementRef);
  private router = inject(Router);


  year= new Date().getFullYear();
  loading = true

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1 * 1000);
  }

  startGame(){
    const main: any = document.querySelector('cuboMario');

    main.classList.toggle('effect-open');
    setTimeout(() => {
      this.router.navigate([`/gamer`]);
    }, 500);
  }

}
