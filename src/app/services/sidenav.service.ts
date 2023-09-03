import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenavOpened = false;

  toggle() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  isSidenavOpened() {
    return this.sidenavOpened;
  }
}
