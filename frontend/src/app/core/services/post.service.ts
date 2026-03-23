import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost, IPostRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly API_URL = 'http://localhost:3001/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.API_URL);
  }

  getMyPosts(userId: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.API_URL}/users/${userId}`);
  }

  savePost(post: IPostRequest): Observable<any> {
    return this.http.post(this.API_URL, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
