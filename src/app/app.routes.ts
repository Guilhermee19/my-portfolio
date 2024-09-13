import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/navbar/navbar.component').then((m) => m.NavbarComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page.component').then(
          (m) => m.LandingPageComponent)
      },
      {
        path: 'easter-egg', loadComponent: () => import('./pages/easter-egg/easter-egg.component').then(
          (m) => m.EasterEggComponent)
      },
    ]
  },
  { path: '**', redirectTo: '' }
];
