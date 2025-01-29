import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'apps', loadComponent: () => import('./pages/apps/apps.component').then(m => m.AppsComponent) },
  { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
  { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
  { path: '', redirectTo: 'apps', pathMatch: 'full' }
];
