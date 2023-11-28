import { Component, HostListener, OnInit } from '@angular/core';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-portfolio';

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   this.positionMouse(event);
  // }

  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   this.positionMouse(event);
  // }

  // @HostListener('mouseup', ['$event'])
  // onMouseUp(event: MouseEvent) {
  //   this.positionMouse(event);
  // }

  // @HostListener('mouseover', ['$event'])
  // onMouseOver(event: MouseEvent) {
  //   this.positionMouse(event);
  // }

  // @HostListener('mouseenter', ['$event'])
  // mouseenter(event: MouseEvent) {
  //   const minhaDiv: any = document.querySelector('.circle_mouse');
  //   minhaDiv.style.opacity = 1;
  // }

  // @HostListener('mouseleave', ['$event'])
  // mouseleave(event: MouseEvent) {
  //   const minhaDiv: any = document.querySelector('.circle_mouse');
  //   minhaDiv.style.opacity = 0;
  // }


  circleX = 100;
  circleY = 100;

  ngOnInit() {
    AOS.init();
  }

  // positionMouse(event: any){
  //   const x = event.pageX-20;
  //   const y = event.pageY-20;
  //   this.circleX = x;
  //   this.circleY = y;
  // }
}
