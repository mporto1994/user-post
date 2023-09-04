import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserResponse } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://gorest.co.in/public-api/';

  constructor(private http: HttpClient) { }

  getUsers(page?: number, search?: string): Observable<User[]> {
    const pageSize = 15;
    const url = `${this.baseUrl}/users?page=${page}&per_page=${pageSize}`;

    return this.http.get<UserResponse>(url).pipe(
      map((response: UserResponse) => {
        if (response.code === 200) {
          return response.data || [];
        } else {
          throw new Error('Erro desconhecido ao obter os usuários');
        }
      }),
      catchError((error) => {
        console.error(error);
        throw new Error('Erro de rede ao obter os usuários');
      })
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/users/${id}`;

    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<User>(url, user);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `${this.baseUrl}/users/${userId}`;
    return this.http.delete<void>(url);
  }

}
