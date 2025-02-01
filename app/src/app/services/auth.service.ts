import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  isAuthenticated() {
    return this.isAuthenticatedSubject.value;
  }

  loginWithCredentials(username: string, password: string) {
    // Implement actual authentication logic here
    this.isAuthenticatedSubject.next(true);
  }

  loginWithTelegram() {
    // Implement Telegram authentication
    this.isAuthenticatedSubject.next(true);
  }

  loginWithNostr() {
    // Implement Nostr authentication
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    return from(fetch('/api/authentication/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      })
    );
  }
}
