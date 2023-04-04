import { Component, OnInit, HostListener, ElementRef, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { EffectCoverflow, Pagination } from "swiper";

SwiperCore.use([EffectCoverflow, Pagination]);

// import VanillaTilt from "vanilla-tilt";
@Component({
  selector: 'app-home',
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

  constructor(private el: ElementRef) { }

  year= new Date().getFullYear();

  time_line = [
    {
      year: 2014,
      description: 'O primeira contato com programação foi com HTML e CSS basico, mesmo nem sabiando exatamente o que estava fazendo, só que tinha adorado criar um site meu.'
    },
    {
      year: 2017,
      description: 'Iniciei a faculdade Ciência da Computação na UNIFESO, onde realmente conheci a programação, a logica e as boas praticas para desenvolver um site.'
    },
    {
      year: 2020,
      description: 'A faculdade me abriu portar e conhecimente e me deu a oportunidade do merdado de trabalho na area da programação. Onde iniciei como estagio na empresa Noclaf.'
    },
    {
      year: 2023,
      description: 'E hoje sou programador Desenvolvedor Front End, com 3 anos de experiencia em Angular, ja trabalhei com React.js, Scss, Vue, AWS e muitas outras tecnologias.'
    },
  ]

  ngOnInit(): void {
     // add vanilla-tilt effect on .<class-name> cards
    //  VanillaTilt.init(
    //   this.el.nativeElement.querySelectorAll(".effect_move"), { max: 10, speed: 500, scale: 1.05 }
    // );
  }

  calcularIdade(dataNascimento: string) {
    var dataAtual = new Date();
    var diaAtual = dataAtual.getDate();
    var mesAtual = dataAtual.getMonth() + 1;
    var anoAtual = dataAtual.getFullYear();

    var dataNasc = new Date(dataNascimento);
    var diaNasc = dataNasc.getDate();
    var mesNasc = dataNasc.getMonth() + 1;
    var anoNasc = dataNasc.getFullYear();

    var idade = anoAtual - anoNasc;

    if (mesAtual < mesNasc || (mesAtual == mesNasc && diaAtual < diaNasc)) {
      idade--;
    }

    return idade;
  }

}
