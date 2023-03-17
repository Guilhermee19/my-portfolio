import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    AppRoutingModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
