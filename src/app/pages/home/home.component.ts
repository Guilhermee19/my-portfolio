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
