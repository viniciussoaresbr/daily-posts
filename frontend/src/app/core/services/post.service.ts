import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.dev";
import { IComment, ILikeResponse, IPost, IPostRequest } from "../models";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private readonly API_URL = `${environment.apiUrl}/posts`;
  private readonly COMMENT_API_URL = `${environment.apiUrl}/comments`;

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

  getCommentsByPost(postId: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.API_URL}/${postId}/comments`);
  }

  createComment(postId: number, text: string): Observable<IComment> {
    return this.http.post<IComment>(`${this.API_URL}/${postId}/comments`, {
      text,
    });
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.COMMENT_API_URL}/${commentId}`);
  }
}
