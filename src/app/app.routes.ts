import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';


export const routes: Routes = [
  { path: '', component: Login },
  // { path: 'inscription', component: Inscription },
  // { path: 'contact', component: Contact },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./pages/admin/admin-module').then(m => m.AdminModule),
  },
  {
    path: 'public',
    canActivate: [userGuard],
    loadChildren: () =>
      import('./pages/public/public-module').then(m => m.PublicModule),
  }
];
