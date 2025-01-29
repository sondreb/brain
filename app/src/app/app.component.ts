import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <mat-sidenav-container>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <span class="spacer"></span>
        
        <mat-form-field appearance="outline">
          <input matInput placeholder="Search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <span class="spacer"></span>
        
        <button mat-button>
          <mat-icon>login</mat-icon>
          Login
        </button>
      </mat-toolbar>

      <mat-sidenav #sidenav mode="side" [opened]="true">
        <mat-nav-list>
          <a mat-list-item routerLink="/apps" routerLinkActive="active-link">
            <mat-icon matListItemIcon>apps</mat-icon>
            <span matListItemTitle>Apps</span>
          </a>
          <a mat-list-item routerLink="/users" routerLinkActive="active-link">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Users</span>
          </a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Settings</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `
    :host {
      display: block;
      height: 100vh;
    }
    
    mat-sidenav-container {
      height: 100%;
    }
    
    mat-toolbar {
      position: fixed;
      top: 0;
      z-index: 1000;
    }
    
    mat-sidenav {
      padding-top: 64px;
      width: 250px;
    }
    
    mat-sidenav-content {
      padding-top: 64px;
      padding: 80px 20px 20px;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    mat-form-field {
      width: 300px;
      margin: 0 16px;
    }
    
    .active-link {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `
})
export class AppComponent {
  title = 'app';
}
