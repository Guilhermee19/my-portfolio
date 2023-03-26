import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-portfolio';

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.positionMouse(event);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.positionMouse(event);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.positionMouse(event);
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.positionMouse(event);
  }



  circleX = 100;
  circleY = 100;

  positionMouse(event: any){
    console.log(event);

    const x = event.pageX-20;
    const y = event.pageY-20;
    this.circleX = x;
    this.circleY = y;
  }
}
