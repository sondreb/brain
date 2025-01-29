import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Settings</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Application settings will be displayed here.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }
  `
})
export class SettingsComponent {}
