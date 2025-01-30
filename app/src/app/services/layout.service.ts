import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  search = signal<boolean>(false);

  searchInput: string = '';

  toggleSearch() {
    this.search.set(!this.search());
    this.searchInput = '';
  }
}
