import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { App } from '../../models/api.models';
import { ApiService } from '../../services/api.service';
import { AppFormDialogComponent } from '../../components/app-form-dialog.component';

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

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    await this.loadApps();
  }

  private async loadApps() {
    try {
      this.apps = await this.apiService.getApps();
      console.log('Loaded apps:', this.apps);
    } catch (error) {
      console.error('Failed to load apps:', error);
      // TODO: Show error message to user
    }
  }

  async createApp() {
    const dialogRef = this.dialog.open(AppFormDialogComponent);
    
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      try {
        console.log('Creating app:', result);
        await this.apiService.createApp(result);
        await this.loadApps();
      } catch (error) {
        console.error('Failed to create app:', error);
        // TODO: Show error message to user
      }
    }
  }

  async editApp(app: App) {
    const dialogRef = this.dialog.open(AppFormDialogComponent, {
      data: app
    });
    
    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      try {
        await this.apiService.updateApp(app.id, result);
        await this.loadApps();
      } catch (error) {
        console.error('Failed to update app:', error);
        // TODO: Show error message to user
      }
    }
  }

  async deleteApp(app: App) {
    const confirmDelete = await this.dialog.open(MatDialog, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${app.name}?`
      }
    }).afterClosed().toPromise();

    if (confirmDelete) {
      try {
        await this.apiService.deleteApp(app.id);
        await this.loadApps();
      } catch (error) {
        console.error('Failed to delete app:', error);
        // TODO: Show error message to user
      }
    }
  }
}
