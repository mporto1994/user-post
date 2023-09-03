import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private pageTitleSource = new BehaviorSubject<string>('');
  pageTitle$ = this.pageTitleSource.asObservable();

  setPageTitle(title: string) {
    this.pageTitleSource.next(title);
  }
}
