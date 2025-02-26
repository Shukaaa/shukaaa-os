import {Type} from '@angular/core';

export interface App {
  key: string;
  name: string;
  icon: string;
  type: 'component' | 'link';
  component?: Type<any>;
  link?: string;
}
