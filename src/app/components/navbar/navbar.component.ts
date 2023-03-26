import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'pt-br']);
    translate.setDefaultLang('pt-br');

    let language = localStorage.getItem('language')
    this.selected_country = this.countries.find((el: any) => el.language == language)

    if (this.selected_country == null) {
      let browserLang: any = translate.getBrowserLang();
      browserLang = browserLang == 'pt' ? 'pt-br' : browserLang
      browserLang = browserLang.match(/pt-br|en/) ? browserLang : 'pt-br'
      translate.use(browserLang);
      this.selected_country = this.countries.find((el: any) => el.language == browserLang)
    }
    else {
      translate.use(this.selected_country.language.match(/pt-br|en/) ? this.selected_country.language : 'pt-br');
    }
  }

  countries: any = [
    {
      language: 'pt-br',
      title: 'Português',
      img: '/assets/imagens/flag-pt.png'
    },
    {
      language: 'en',
      title: 'Ingles',
      img: '/assets/imagens/flag-en.png'
    }
  ];

  selected_country: any;

  ngOnInit(): void {
  }

   // ALTERAÇÃO DE IDIOMA
   changeLanguage(country: any) {
    this.selected_country = country
    localStorage.setItem('language', country.language)

    this.translate.use(country.language.match(/pt-br|en/) ? country.language : 'pt-br');
  }

}
