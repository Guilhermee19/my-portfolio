import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import * as AOS from 'aos';
import { NavbarComponent } from './components/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private theme = inject(ThemeService);
  private cookieService = inject(CookieService);
  private translate = inject(TranslateService);

  ngOnInit() {
    // AOS.init();

    this.theme.loadCurrentTheme();

    this.translate.setDefaultLang("pt-br");

    const language = this.cookieService.get("language");

    let browserLang = this.translate.getBrowserLang();
    browserLang = browserLang === "pt" ? "pt-br" : browserLang;
    browserLang = browserLang?.match(/pt-br|en/) ? browserLang : "pt-br";
    this.translate.use(language || (browserLang === 'pt-br' ? 'pt-br' : 'en'));
  }
}
