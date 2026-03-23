import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IAuthResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3001';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken(),
  );

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: any): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.API_URL}/auth`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('userId', res.userId.toString());
          this.isAuthenticatedSubject.next(true);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }
}
