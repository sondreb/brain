import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

interface ExternalCredential {
  provider: 'Telegram' | 'Nostr';
  connected: boolean;
  identifier?: string;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatListModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Settings</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group>
          <mat-tab label="General">
            <p>General settings will be displayed here.</p>
          </mat-tab>
          <mat-tab label="Credentials">
            <div class="credentials-container">
              <h3>User Information</h3>
              <p><strong>Username:</strong> {{username}}</p>
              <p><strong>User ID:</strong> {{userId}}</p>

              <h3>External Credentials</h3>
              <mat-list role="list">
                @for (cred of externalCredentials; track cred.provider) {
                  <mat-list-item role="listitem">
                    {{cred.provider}} - {{cred.connected ? 'Connected' : 'Not Connected'}}
                    @if (cred.identifier) {
                      <span>({{cred.identifier}})</span>
                    }
                  </mat-list-item>
                }
              </mat-list>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }

    mat-tab-group {
      margin-top: 20px;
    }

    .credentials-container {
      padding: 20px 0;
    }

    h3 {
      margin-top: 20px;
      margin-bottom: 10px;
    }
  `
})
export class SettingsComponent {
  username = 'johndoe';
  userId = 'usr_123456';
  externalCredentials: ExternalCredential[] = [
    { provider: 'Telegram', connected: true, identifier: '@johndoe' },
    { provider: 'Nostr', connected: false }
  ];
}
