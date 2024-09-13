import { Component, HostListener, inject, PLATFORM_ID, OnInit, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { ICountries } from '../../models/utils';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  currentPosition: number = 0;
  openMenu: boolean = false;
  selected_country: ICountries =   {
    language: 'pt-br',
    title: 'Português',
    img: '/assets/imagens/webp/flag-pt.webp'
  };

  countries: ICountries[] = [
    {
      language: 'pt-br',
      title: 'Português',
      img: '/assets/imagens/webp/flag-pt.webp'
    },
    {
      language: 'en',
      title: 'Inglês',
      img: '/assets/imagens/webp/flag-en.webp'
    }
  ];

  ngOnInit() {
    this.translate.addLangs(['en', 'pt-br']);
    this.translate.setDefaultLang('pt-br');

    if (isPlatformBrowser(this.platformId)) {
      const language = localStorage.getItem('language');
      this.selected_country = this.countries.find(el => el.language === language) || this.countries[0];

      if (!this.selected_country) {
        let browserLang = this.translate.getBrowserLang();
        browserLang = browserLang === 'pt' ? 'pt-br' : browserLang;
        if(!browserLang) return;

        browserLang = browserLang.match(/pt-br|en/) ? browserLang : 'pt-br';
        this.translate.use(browserLang);
        this.selected_country = this.countries.find(el => el.language === (browserLang || 'en')) || this.countries[0];
      } else {
        this.translate.use(this.selected_country.language.match(/pt-br|en/) ? this.selected_country.language : 'pt-br');
      }

      this.currentPosition = window.pageYOffset;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const navbar = document.getElementById('navbar');
      const scroll = (e.target as Document).documentElement.scrollTop;

      if (navbar) {
        if (scroll > this.currentPosition) {
          navbar.classList.add("scroll_down");
          navbar.classList.remove("scroll_up");
          this.openMenu = false;
        } else {
          navbar.classList.add("scroll_up");
          navbar.classList.remove("scroll_down");
        }
      }

      this.currentPosition = scroll;
    }
  }

  changeLanguage(country: any) {
    this.selected_country = country;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', country.language);
    }
    this.translate.use(country.language.match(/pt-br|en/) ? country.language : 'pt-br');
  }
}
