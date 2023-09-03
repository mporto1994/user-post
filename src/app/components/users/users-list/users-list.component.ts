import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/user.model';
import { PageTitleService } from 'src/app/services/page-title.service';
import { Subscription } from 'rxjs';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  pageTitle = 'Lista de Usuários';
  pageNumber = 1;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private pageTitleService: PageTitleService,
    private sidenavService: SidenavService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('Lista de Usuários');
    this.loadUsers(this.pageNumber);
  }

  loadUsers(page: number): void {
    this.userSubscription = this.userService.getUsers(page).subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isSidenavOpened() {
    return this.sidenavService.isSidenavOpened();
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.loadUsers(this.pageNumber);
        console.log('Usuário excluído com sucesso');
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      }
    );
  }

  openUserDeletionConfirmation(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza de que deseja excluir este usuário?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadUsers(page);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
