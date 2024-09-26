import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private cookieService = inject(CookieService);
  private platformId = inject(PLATFORM_ID);

  ThemeSubject = new Subject<void>();

  private userTheme: 'light' | 'dark' = 'light';

  get theme() {
    return this.userTheme;
  }

  watchTheme() {
    return this.ThemeSubject.asObservable();
  }

  toggleUserTheme() {
    if (this.userTheme === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  loadCurrentTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const inLocal = this.cookieService.get('theme') as 'light' | 'dark';
      if (inLocal) {
        this.userTheme = inLocal;
        this.setTheme(inLocal);
        return inLocal;
      }

      const deviceMode = window.matchMedia('(prefers-color-scheme: dark)');
      if (deviceMode.matches) {
        this.userTheme = 'dark';
        this.setTheme('dark');
        return 'dark';
      }
    }

    this.setTheme('light');
    return 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    if (isPlatformBrowser(this.platformId)) {
      this.userTheme = theme;
      this.cookieService.set('theme', theme);
      const html = document.querySelector('html');

      if(!html) return;

      if (theme === 'light') {
        html?.classList.remove('dark');
      } else {
        html?.classList.toggle('dark');
      }
    }
  }
}
