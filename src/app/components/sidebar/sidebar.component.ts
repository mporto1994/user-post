import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }
  isSidenavOpened() {
    return this.sidenavService.isSidenavOpened();
  }
  sidenavClose() {
    return this.sidenavService.toggle();
  }
}
