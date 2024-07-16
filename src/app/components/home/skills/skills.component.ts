import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }

  skills = [
    {
      name: 'Html5',
      img: '/assets/icons/webp/Html5 logo.webp'
    },
    {
      name: 'Css',
      img: '/assets/icons/webp/css-logo.webp'
    },
    {
      name: 'Javascript',
      img: '/assets/icons/webp/Javascript logo.webp'
    },
    {
      name: 'Typescript',
      img: '/assets/icons/webp/Typescript-logo.webp'
    },
    {
      name: 'Angular',
      img: '/assets/icons/webp/angular-logo.webp'
    },
    {
      name: 'Git',
      img: '/assets/icons/webp/Git-logo.webp'
    },
    {
      name: 'Python',
      img: '/assets/icons/webp/Python.webp'
    },
    {
      name: 'Vercel',
      img: '/assets/icons/webp/Vercel.webp'
    },
    {
      name: 'React',
      img: '/assets/icons/webp/React log.webp'
    },
    {
      name: 'Sass',
      img: '/assets/icons/webp/Sass.webp'
    },
    {
      name: 'Django',
      img: '/assets/icons/webp/Django-logo.webp'
    },
    {
      name: 'Netlify',
      img: '/assets/icons/webp/netlify.webp'
    },
  ]

  carousel: any = {
    slider1: [],
    slider2: [],
    slider3: [],
  }


  ngOnInit(): void {
    this.carousel.slider1 = this.shuffleArray(this.skills.splice(0,3));
    this.carousel.slider1 = this.carousel.slider1.concat(this.carousel.slider1);
    this.carousel.slider1 = this.carousel.slider1.concat(this.carousel.slider1);
    this.carousel.slider1 = this.carousel.slider1.concat(this.carousel.slider1);

    this.carousel.slider2 = this.shuffleArray(this.skills.splice(0,3));
    this.carousel.slider2 = this.carousel.slider2.concat(this.carousel.slider2);
    this.carousel.slider2 = this.carousel.slider2.concat(this.carousel.slider2);
    this.carousel.slider2 = this.carousel.slider2.concat(this.carousel.slider2);

    this.carousel.slider3 = this.shuffleArray(this.skills.splice(0,3));
    this.carousel.slider3 = this.carousel.slider3.concat(this.carousel.slider3);
    this.carousel.slider3 = this.carousel.slider3.concat(this.carousel.slider3);
    this.carousel.slider3 = this.carousel.slider3.concat(this.carousel.slider3);

  }

  shuffleArray(array: any[]) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

}
