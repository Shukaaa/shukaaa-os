import {booleanAttribute, Component, Input} from '@angular/core';
import {App} from '../../interfaces/app.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [
    NgIf
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
   @Input() app: App | null = null;
   @Input({transform: booleanAttribute}) disableText = false;
   @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
