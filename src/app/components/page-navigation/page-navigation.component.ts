import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.css'],
})
export class PageNavigationComponent {
  @Input() currentPage: number = 1;
  @Output() navigate = new EventEmitter<number>();

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.navigate.emit(this.currentPage);
    }
  }

  nextPage() {
    this.currentPage++;
    this.navigate.emit(this.currentPage);
  }
}
