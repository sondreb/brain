import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Apps</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>List of applications will be displayed here.</p>
        <p>
            <button mat-flat-button>Flat button</button>
          </p>
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
export class AppsComponent {}
