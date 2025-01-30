import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  theme = signal<Theme>('auto');

  constructor() {
    this.updateTheme(this.getThemeFromLocalStorage());
  }

  isDark() {
    return this.document.documentElement.classList.contains('dark-mode');
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
    this.updateTheme(theme);
  }

  updateTheme(theme: Theme) {
    this.theme.set(theme);

    let activeTheme = theme;

    if (activeTheme == 'auto') {
      activeTheme = this.getBrowserPreferredTheme();
    }

    if (activeTheme == 'dark') {
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
    return (storedTheme as Theme) ?? 'auto';
  }

  getBrowserPreferredTheme() {
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
