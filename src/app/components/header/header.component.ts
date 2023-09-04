import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';
import { SidenavService } from '../../services/sidenav.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle = '';
  isSearchVisible = false;
  searchQuery = '';

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private pageTitleService: PageTitleService,
    private sidenavService: SidenavService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.pageTitleService.pageTitle$.subscribe(title => {
      this.pageTitle = title;
    });
  }

  updateSearchTerm(term: string) {
    this.searchService.setSearchTerm(term);
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }

  toggleSearch() {
    if (this.isSearchVisible) {
      this.search();
    }
    this.isSearchVisible = !this.isSearchVisible;
  }

  search() {
    this.searchService.setSearchTerm(this.searchQuery);
  }

}
