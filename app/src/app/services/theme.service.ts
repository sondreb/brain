import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());
  }

  toggle() {
    this.setTheme(
      this.document.documentElement.classList.contains('dark-mode')
        ? 'light'
        : 'dark'
    );
  }

  setTheme(theme: Theme) {
    this.setThemeInLocalStorage(theme);

    console.log('Setting theme: ', theme);
    if (theme == 'dark') {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
  }

  setThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('preferred-theme', theme);
  }

  getThemeFromLocalStorage(): Theme {
    const storedTheme = localStorage.getItem('preferred-theme');

    console.log('storedTheme:', storedTheme);

    if (storedTheme && storedTheme !== 'auto') {
      return storedTheme as Theme;
    }

    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Check browser preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }
}
