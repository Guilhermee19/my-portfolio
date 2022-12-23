import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }

  isVideo: any;

  ngOnInit(): void {
    this.isVideo = document.querySelector('video');
    console.log(this.isVideo);
  }

  @HostListener('window:scroll', ['$event.target'])
  scroll(e: any) {
    let scroll = e.scrollingElement.scrollTop;
    // console.log(scroll);
  }
}
