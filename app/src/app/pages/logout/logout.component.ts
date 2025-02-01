import { Component, OnInit } from '@angular/core';
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
  styles: [`
    .logout-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      gap: 1rem;
    }
  `]
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
