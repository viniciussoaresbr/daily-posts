import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserRegister } from '../models';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  register(user: IUserRegister): Observable<any> {
    return this.http.post(this.API_URL, user);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/${id}`);
  }
}
