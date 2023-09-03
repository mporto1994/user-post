import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PageTitleService } from 'src/app/services/page-title.service';
import { SidenavService } from '../../services/sidenav.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle = '';
  searchTerm: string = '';
  isSearchVisible = false;
  searchQuery = '';

  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private pageTitleService: PageTitleService,
    private sidenavService: SidenavService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageTitleService.pageTitle$.subscribe(title => {
      this.pageTitle = title;
    });
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  toggleSearch() {
    console.log('toggleSearch');
    // if (!this.isSearchVisible) {
    //   this.searchQuery = '';
    // }
    this.isSearchVisible = !this.isSearchVisible;
  }

  search(): void {
    // Determine a página atual com base na rota atual
    const currentPage = this.router.url.includes('/users') ? 'users' : 'posts';

    // Execute a pesquisa na página atual
    if (currentPage === 'users') {
      // Execute a pesquisa de usuários usando this.searchTerm
      // Exemplo: this.userService.searchUsers(this.searchTerm).subscribe(...);
    } else {
      // Execute a pesquisa de postagens usando this.searchTerm
      // Exemplo: this.postService.searchPosts(this.searchTerm).subscribe(...);
    }
  }
}
