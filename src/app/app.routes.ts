import { Routes } from '@angular/router';
import { PicoPlacaPage } from './features/pico-placa/pages/pico-placa-page/pico-placa-page';

export const routes: Routes = [
  {
    path: '',
    component: PicoPlacaPage
  },
  {
    path: '**',
    redirectTo: ''
  }
];