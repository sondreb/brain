import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from './services/theme.service';
import { LayoutService } from './services/layout.service';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

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
    MatFormFieldModule,
    FormsModule,
    MatMenuModule,
  ],
  template: `
    <div class="example-container" [class.example-is-mobile]="isMobile()">
      <mat-toolbar class="example-toolbar">
        <button mat-icon-button (click)="snav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <h1 class="example-app-name">Brain App</h1>
        <!-- <div class="spacer"></div> -->

        <span class="spacer">
          @if (layout.search()) {
          <input
            type="search"
            class="search-input"
            [(ngModel)]="layout.searchInput"
            (input)="onSearchInput($event)"
          />
          } @else { }

          <!-- <mat-form-field class="small-search-input" subscriptSizing="dynamic">
          <input type="search" matInput placeholder="Search" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field> -->
        </span>

        <button mat-icon-button (click)="layout.toggleSearch()">
          @if (layout.search()) {
          <mat-icon>close</mat-icon>
          } @else {
          <mat-icon>search</mat-icon>
          }
        </button>

        <button mat-icon-button (click)="theme.toggle()">
          @if (theme.isDark()) {
          <mat-icon>dark_mode</mat-icon>
          } @else {
          <mat-icon>light_mode</mat-icon>
          }
        </button>

        <button mat-icon-button [matMenuTriggerFor]="profilemenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #profilemenu="matMenu">
          <!-- <button  (click)="theme.toggle()" mat-menu-item>
            @if (theme.isDark()) {
            <mat-icon>dark_mode</mat-icon>
            } @else {
            <mat-icon>light_mode</mat-icon>
            }
            <span>
            @if (theme.isDark()) {
            Dark Mode
            } @else {
            Light Mode
            }
            </span>
          </button> -->

          <button mat-menu-item [matMenuTriggerFor]="menuMode">
          @if (theme.isDark()) {
            <mat-icon>dark_mode</mat-icon>
            } @else {
            <mat-icon>light_mode</mat-icon>
            }
            <span>Theme</span>
          </button>

          <mat-divider></mat-divider>
          <button mat-menu-item [matMenuTriggerFor]="menuLanguages">
            <mat-icon>translate</mat-icon>
            <span>Language: English</span>
          </button>
          <mat-divider></mat-divider>

          <button
            class="notification-menu"
            [routerLink]="['/notifications']"
            mat-menu-item
          >
            <mat-icon>notifications</mat-icon>
            <span>Notifications</span>
          </button>

          <button [routerLink]="['/settings']" mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>

          <mat-divider></mat-divider>
          <a href="https://help.brain.no" target="_blank" mat-menu-item>
            <mat-icon>help</mat-icon>
            <span>Help</span>
          </a>
          <mat-divider></mat-divider>
          <a [routerLink]="['/logout']" mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </a>
        </mat-menu>

        <mat-menu #menuLanguages="matMenu">
          <button mat-menu-item>
            <span>English</span>
          </button>
          <button mat-menu-item [disabled]="true">
            <span>Norwegian</span>
          </button>
          <button mat-menu-item [disabled]="true">
            <span>Serbian</span>
          </button>
          <button mat-menu-item [disabled]="true">
            <span>Russian</span>
          </button>
          <button mat-menu-item [disabled]="true">
            <span>German</span>
          </button>
        </mat-menu>

        <mat-menu #menuMode="matMenu">
          <button mat-menu-item (click)="theme.setTheme('auto')" [disabled]="theme.theme() == 'auto'">
            <mat-icon>contrast</mat-icon>
            <span>Auto</span>
          </button>
          <button mat-menu-item (click)="theme.setTheme('dark')" [disabled]="theme.theme() == 'dark'">
          <mat-icon>dark_mode</mat-icon>
            <span>Dark</span>
          </button>
          <button mat-menu-item (click)="theme.setTheme('light')" [disabled]="theme.theme() == 'light'">
          <mat-icon>light_mode</mat-icon>
            <span>Light</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container
        class="example-sidenav-container"
        [style.marginTop.px]="isMobile() ? 56 : 0"
        autosize
      >
        <mat-sidenav
          #snav
          opened="true"
          [mode]="isMobile() ? 'over' : 'side'"
          [fixedInViewport]="isMobile()"
          fixedTopGap="56"
          [class.expanded]="isExpanded()"
          [class.collapsed]="!isExpanded()"
        >
          <mat-nav-list>
            <a mat-list-item routerLink="apps">
              <mat-icon matListItemIcon>apps</mat-icon>
              @if(isExpanded()) { Apps }
            </a>
            <a mat-list-item routerLink="users">
              <mat-icon matListItemIcon>manage_accounts</mat-icon>
              @if(isExpanded()) { Users }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
              @if(isExpanded()) { Apps }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
              @if(isExpanded()) { Apps }
            </a>
            <a mat-list-item>
              <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
              @if(isExpanded()) { Apps }
            </a>
            <a mat-list-item (click)="theme.toggle()">
              <mat-icon matListItemIcon>home</mat-icon>
              @if(isExpanded()) { Apps }
            </a>
            <a mat-list-item (click)="minimize()">
              @if(isExpanded()) {
              <mat-icon matListItemIcon>chevron_left</mat-icon>} @else {
              <mat-icon matListItemIcon>chevron_right</mat-icon>
              }
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
        <router-outlet />
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>

    <!-- <mat-sidenav-container>
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
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container> -->
  `,
  styles: `
    // :host {
    //   display: block;
    //   height: 100vh;
    // }
    
    // mat-sidenav-container {
    //   height: 100%;
    // }
    
    mat-toolbar {
      // position: fixed;
      // top: 0;
      // z-index: 1000;
    }
    
    // mat-sidenav {
    //   padding-top: 64px;
    //   width: 250px;
    // }
    
    // mat-sidenav-content {
    //   padding-top: 64px;
    //   padding: 80px 20px 20px;
    // }
    
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

    .example-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.example-is-mobile .example-toolbar {
  position: fixed;
  z-index: 2;
}

h1.example-app-name {
  margin-left: 8px;
}

.example-sidenav-container {
  flex: 1;
}

.example-is-mobile .example-sidenav-container {
  flex: 1 0 auto;
}

mat-sidenav.collapsed {
width: 54px;
}

mat-sidenav.expanded {
   width: 250px;
  //  min-width: 250px;
  //  max-width: 250px;
 }


//  .mat-sidenav {
//   scrollbar-width: thin;
//   scrollbar-color: yellow transparent;
// }

// .mat-drawer-inner-container {
//   overflow-y: auto;
//   scrollbar-width: thin; /* Firefox */
//   scrollbar-color: red transparent; /* Firefox */
// }

.mat-sidenav {

}

.mat-drawer-inner-container {

}

// .mat-drawer-inner-container {
//   /* Standard scrollbar properties */
//   scrollbar-width: thin;
//   scrollbar-color: rgba(128, 128, 128, 0.5) transparent;

//   /* Webkit scrollbar properties */
// }

// .mat-drawer-inner-container::-webkit-scrollbar {
//   width: 3px;
// }

// .mat-drawer-inner-container::-webkit-scrollbar-track {
//   background: transparent;
// }

// .mat-drawer-inner-container::-webkit-scrollbar-thumb {
//   background: rgba(128, 128, 128, 0.5);
//   border-radius: 3px;
// }


    
  `,
})
export class AppComponent {
  title = 'app';

  protected readonly isMobile = signal(true);

  theme = inject(ThemeService);
  layout = inject(LayoutService);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');

    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  onSearchInput(event: any) {
    // if (event.target.value === null) {
    //   clearTimeout(this.debounceTimer);
    //   return;
    // }
    // // Debounce logic to wait until user finishes typing
    // clearTimeout(this.debounceTimer);
    // this.debounceTimer = setTimeout(() => {
    //   console.log('Handle search called!');
    //   this.handleSearch(event.target.value);
    // }, 750);
  }

  // private handleSearch(value: string): void {
  //   if (!value) {
  //     return;
  //   }

  //   if (value.includes(':')) {
  //     this.router.navigate(['/profile', value]);
  //   } else {
  //     this.router.navigate(['/search'], { queryParams: { query: value } });
  //   }
  // }

  ngOnInit() {
    // const element: any = document.querySelector('mat-sidenav');
    // console.log(element);
    // const osInstance = OverlayScrollbars(element, {});
    // console.log(osInstance);
    // const element2: any = document.querySelector('mat-sidenav-content');
    // console.log(element2);
    // const osInstance2 = OverlayScrollbars(element2, {});
    // console.log(osInstance2);
    // const element2: any = document.querySelector('.mat-sidenav');
    // console.log(element2);
    // new SimpleBar(element2, { autoHide: false });
  }

  ngAfterViewInit() {
    // const element: any = document.querySelector('.scrollbar-container');
    // console.log(element);
    // new SimpleBar(element, { autoHide: false });
    // const elm: any = document.getElementById('scroll-container');
    // const osInstance = OverlayScrollbars(elm, {
    //   scrollbars: { autoHide: 'move' }
    // });
    // const elm2: any = document.querySelector('mat-sidenav-content');
    // console.log('Check this:', elm2);
    // const osInstance2 = OverlayScrollbars(elm2, {
    //   scrollbars: { autoHide: 'move' }
    // });
    // const elm3: any = document.querySelector('mat-sidenav');
    // console.log('Check this:', elm3);
    // const osInstance3 = OverlayScrollbars(elm3, {
    //   scrollbars: { autoHide: 'move' }
    // });
    // console.log(elm);
    // console.log(elm2);
    // console.log(elm3);
    // const elm: any = document.getElementById('scroll-container');
    // console.log(elm);
    // new SimpleBar(elm, { autoHide: false });
    // console.log(this.scrollContainer);
    // Access the native DOM element
    // const element2 = this.scrollContainer.nativeElement;
    // Apply your third party plugin here
    // example: new ThirdPartyPlugin(element);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  isExpanded = signal(true);

  minimize() {
    this.isExpanded.set(!this.isExpanded());
  }
}
