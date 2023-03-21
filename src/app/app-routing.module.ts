import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gamer', component: GamesComponent },
  { path: 'gamer/:name_game', component: GamesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
