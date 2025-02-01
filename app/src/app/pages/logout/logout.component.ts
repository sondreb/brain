import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="logout-container">
      <mat-spinner></mat-spinner>
      <p>Logging out...</p>
    </div>
  `,
  styles: [
    `
      .logout-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 1rem;
      }
    `,
  ],
})
export class LogoutComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  async ngOnInit() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
