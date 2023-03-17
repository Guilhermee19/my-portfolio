import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { SwiperModule } from 'swiper/angular';
import { CarouselProjectsComponent } from './components/carousel-projects/carousel-projects.component';
import { GamesComponent } from './pages/games/games.component';
import { MemoryGameComponent } from './pages/games/memory-game/memory-game.component';
import { IconDirective } from './directives/icon.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconDirective,
    NavbarComponent,
    PresentationComponent,
    CarouselProjectsComponent,
    GamesComponent,
    MemoryGameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SwiperModule,
    MatMenuModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
