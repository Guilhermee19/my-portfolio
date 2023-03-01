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

  listProjects = [
    {
      name: "Tour Virtual",
      image: "assets/pages/tour-virtual.png",
      technology: "Angular",
      hosted: "Vercel",
      link: 'https://tcctourvirtual.vercel.app/home',
      link_project: "https://github.com/Guilhermee19/TCC_Turismo_Virtual"
    },
    {
      name: "Filmes e Series Marvel",
      image: "assets/pages/movie-web.png",
      technology: "React",
      hosted: "Vercel",
      link: 'https://react-movie-web-zeta.vercel.app//',
      link_project: "https://github.com/Guilhermee19/react-movie-web"
    },
    {
      name: "Gerador de Conselhos",
      image: "assets/pages/advice-generator.png",
      technology: "React",
      hosted: "Vercel",
      link: 'https://advice-generator-web.vercel.app/',
      link_project: "https://github.com/Guilhermee19/advice-generator-web"
    },
    {
      name: "Contagem Regressiva para o Ano Novo",
      image: "assets/pages/countdown-timer.png",
      technology: "HTML, CSS e JS Puro",
      hosted: "Vercel",
      link: 'https://countdown-timer-rosy.vercel.app/',
      link_project: "https://github.com/Guilhermee19/countdown-timer"
    },
    {
      name: "Linktree personalizado",
      image: "assets/pages/bio-lm-web.png",
      technology: "Angular",
      hosted: "Vercel",
      link: 'https://los-mundissas.vercel.app/',
      link_project: "https://github.com/Guilhermee19/LM"
    },
    {
      name: "PokeDex",
      image: "assets/pages/pokedex-web.png",
      technology: "Angular",
      hosted: "Vercel",
      link: 'https://pokedex-web-mocha.vercel.app/',
      link_project: "https://github.com/Guilhermee19/pokedex-web"
    },
    {
      name: "Rastreador de endereço IP",
      image: "assets/pages/ip-address-tracker.png",
      technology: "Angular",
      hosted: "Vercel",
      link: 'https://my-ip-address-tracker.vercel.app/',
      link_project: "https://bitbucket.org/Guilhermee19/ip-address-tracker"
    },
  ]

  ngOnInit(): void {
  }
}
