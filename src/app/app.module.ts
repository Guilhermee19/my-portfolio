import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VerticalScrollComponent } from './components/vertical-scroll/vertical-scroll.component';
import { GameBoyComponent } from './components/game-boy/game-boy.component';
import { SkillsComponent } from './components/home/skills/skills.component';
import { AboutMeComponent } from './components/home/about-me/about-me.component';
import { CarouselProjectsComponent } from './components/home/carousel-projects/carousel-projects.component';
import { BlockComponent } from './components/block/block.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { IconDirective } from './directives/icon.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconDirective,
    NavbarComponent,
    CarouselProjectsComponent,
    VerticalScrollComponent,
    GameBoyComponent,
    SkillsComponent,
    AboutMeComponent,
    BlockComponent,
    LoadingPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SwiperModule,
    MatMenuModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatInputModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
