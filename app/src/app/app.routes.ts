import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'logout', loadComponent: () => import('./pages/logout/logout.component').then(m => m.LogoutComponent) },
  { 
    path: 'apps', 
    loadComponent: () => import('./pages/apps/apps.component').then(m => m.AppsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'users', 
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'apps', pathMatch: 'full' }
];
