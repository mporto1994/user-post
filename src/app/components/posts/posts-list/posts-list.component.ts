import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service'; // Caminho relativo ao serviço
import { UserService } from '../../../services/user.service'; // Caminho relativo ao serviço
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PageTitleService } from 'src/app/services/page-title.service';
import { forkJoin } from 'rxjs';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  pageTitle = 'Lista de Postagens';
  pageNumber = 1;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private pageTitleService: PageTitleService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('Lista de Postagens');
    this.loadUsersAndPosts(this.pageNumber);
  }

  loadUsersAndPosts(page: number): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;

      this.postService.getPosts(page).subscribe((response: any) => {
        if (response.code === 200) {
          this.posts = response.data;
          this.posts.forEach((post: Post) => {
            const user = this.users.find((u) => u.id === post.user_id);
            post.user = user ? user.name : 'Não identificado';
          });
        } else {
          console.error('Erro ao obter posts:', response.message);
        }
      });
    });
  }

  loadPosts(): void {
    this.postService.getPosts(1).subscribe((response: any) => {
      if (response && response.data && Array.isArray(response.data)) {
        const posts: Post[] = response.data;
        const userObservables = posts.map((post: Post) =>
          this.userService.getUser(post.user_id)
        );

        forkJoin(userObservables).subscribe((users: User[]) => {
          posts.forEach((post: Post, index: number) => {
            post.user = users[index].name;
          });
          this.posts = posts;
          console.log(posts);
        });
      } else {
        console.error('A resposta do serviço não contém uma matriz de posts válida.');
      }
    });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.loadUsersAndPosts(this.pageNumber);
        console.log('Post excluído com sucesso');
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      }
    );
  }

  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : 'Usuário não encontrado';
  }

  openPostDeletionConfirmation(postId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza de que deseja excluir este Post?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost(postId);
      }
    });
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadUsersAndPosts(page);
  }
}
