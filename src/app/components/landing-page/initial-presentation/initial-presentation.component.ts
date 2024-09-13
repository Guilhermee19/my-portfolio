import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { VerticalScrollComponent } from '../../vertical-scroll/vertical-scroll.component';

@Component({
  selector: 'app-initial-presentation',
  standalone: true,
  imports: [TranslateModule, VerticalScrollComponent],
  templateUrl: './initial-presentation.component.html',
  styleUrl: './initial-presentation.component.scss'
})
export class InitialPresentationComponent {

}
