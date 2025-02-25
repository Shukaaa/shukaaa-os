import {Type} from '@angular/core';

export interface App {
  key: string;
  name: string;
  icon: string;
  component: Type<any>
}
