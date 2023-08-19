import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  constructor() { }

  skills = [
    {
      name: 'Html5',
      img: '/assets/icons/Html5 logo.png'
    },
    {
      name: 'Css',
      img: '/assets/icons/Css logo.png'
    },
    {
      name: 'Javascript',
      img: '/assets/icons/Javascript logo.png'
    },
    {
      name: 'Typescript',
      img: '/assets/icons/Typescript logo.png'
    },
    {
      name: 'Angular',
      img: '/assets/icons/Angular logo.png'
    },
    {
      name: 'Git',
      img: '/assets/icons/Git logo.png'
    },
    {
      name: 'Python',
      img: '/assets/icons/Python.png'
    },
    {
      name: 'Vercel',
      img: '/assets/icons/Vercel.png'
    },
    {
      name: 'React',
      img: '/assets/icons/React log.png'
    },
    {
      name: 'Sass',
      img: '/assets/icons/Sass.png'
    },
    {
      name: 'Django',
      img: '/assets/icons/Django logo.png'
    },
    {
      name: 'Netlify',
      img: '/assets/icons/netlify.png'
    },
  ]

  carousel: any = {
    slider1: [],
    slider2: [],
    slider3: [],
  }


  ngOnInit(): void {
    this.carousel.slider1 = this.shuffleArray(this.skills);
    this.carousel.slider1 = this.carousel.slider1.concat(this.carousel.slider1);

    this.carousel.slider2 = this.shuffleArray(this.skills);
    this.carousel.slider2 = this.carousel.slider2.concat(this.carousel.slider2);

    this.carousel.slider3 = this.shuffleArray(this.skills);
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
