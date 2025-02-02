import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { App } from '../../models/api.models';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Apps</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="createApp()">
            <mat-icon>add</mat-icon> New App
          </button>
        </div>

        <table mat-table [dataSource]="apps">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let app">{{app.name}}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let app">{{app.description}}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let app">
              <button mat-icon-button (click)="editApp(app)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteApp(app)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      max-width: 1200px;
      margin: 2rem auto;
    }
    .actions {
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
    }
  `
})
export class AppsComponent implements OnInit {
  apps: App[] = [];
  displayedColumns = ['name', 'description', 'actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    // TODO: Load apps from service
  }

  createApp() {
    // TODO: Open dialog with AppFormComponent
  }

  editApp(app: App) {
    // TODO: Open dialog with AppFormComponent
  }

  deleteApp(app: App) {
    // TODO: Show confirmation dialog and delete
  }
}
