import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Login</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <input matInput placeholder="Username" formControlName="username">
          </mat-form-field>
          <mat-form-field>
            <input matInput type="password" placeholder="Password" formControlName="password">
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit">Login</button>
        </form>
        <div class="alternative-login">
          <button mat-button (click)="loginWithTelegram()">Login with Telegram</button>
          <button mat-button (click)="loginWithNostr()">Login with Nostr</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { max-width: 400px; margin: 2em auto; padding: 1em; }
    form { display: flex; flex-direction: column; }
    .alternative-login { margin-top: 1em; display: flex; justify-content: space-around; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.loginWithCredentials(username, password);
      this.router.navigate(['/apps']);
    }
  }

  loginWithTelegram() {
    this.authService.loginWithTelegram();
    this.router.navigate(['/apps']);
  }

  loginWithNostr() {
    this.authService.loginWithNostr();
    this.router.navigate(['/apps']);
  }
}
