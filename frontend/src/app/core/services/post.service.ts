import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ILikeResponse, IPost, IPostRequest } from "../models";
import { environment } from "../../../environments/environment.dev";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private readonly API_URL = `${environment.apiUrl}/posts`;

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

  likePost(id: number): Observable<ILikeResponse> {
    return this.http.post<ILikeResponse>(`${this.API_URL}/${id}/like`, {});
  }

  unlikePost(id: number): Observable<ILikeResponse> {
    return this.http.delete<ILikeResponse>(`${this.API_URL}/${id}/like`);
  }
}
