import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { SwiperModule } from 'swiper/angular';
SwiperCore.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [SwiperModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AboutMeComponent {

  time_line = [
    {
      year: 2014,
      description: 'text_about_me_1'
    },
    {
      year: 2017,
      description: 'text_about_me_2'
    },
    {
      year: 2020,
      description: 'text_about_me_3'
    },
    {
      year: 2021,
      description: 'text_about_me_4'
    },
    {
      year: new Date().getFullYear(),
      description: 'text_about_me_5'
    },
  ]

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
