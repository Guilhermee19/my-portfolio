import { Component } from '@angular/core';

@Component({
  selector: 'app-page-loading',
  standalone: true,
  imports: [],
  templateUrl: './page-loading.component.html',
  styleUrl: './page-loading.component.scss'
})
export class PageLoadingComponent {
  public chars: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
  public word: string = 'LOADING...';
  public displayWord: string = '';

}
