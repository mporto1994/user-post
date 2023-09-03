import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private baseUrl = 'https://gorest.co.in/public-api/';

  constructor(
    private http: HttpClient

  ) { }

  getPosts(page: number): Observable<Post[]> {
    const pageSize = 15;
    const url = `${this.baseUrl}/posts?page=${page}&per_page=${pageSize}`;
    return this.http.get<Post[]>(url);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  };

  updatePost(post: Post): Observable<Post> {
    const url = `${this.baseUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  };

  deletePost(postId: number): Observable<void> {
    const url = `${this.baseUrl}/posts/${postId}`;
    return this.http.delete<void>(url);
  }

}
