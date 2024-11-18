import { Routes } from '@angular/router';
import LoginComponent  from './login/login.component'; // Importación directa
import { FormatoComponent } from './formato/formato.component'; // Importación directa
import  GeneralComponent  from './general/general.component'; // Importación directa

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, // Usamos 'component' en lugar de 'loadComponent'

    
    
  },
  {
    path: 'formato',
    title: 'formato',
    component: FormatoComponent // Usamos 'component' en lugar de 'loadComponent'
  },
  {
    path: 'general',
    title: 'general',
    component: GeneralComponent // Usamos 'component' en lugar de 'loadComponent'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
