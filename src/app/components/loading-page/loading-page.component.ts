import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.scss']
})
export class LoadingPageComponent implements OnInit {
  public chars: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
  public word: string = 'LOADING...';
  public displayWord: string = '';

  ngOnInit(): void {
  }

}
