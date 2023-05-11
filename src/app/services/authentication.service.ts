import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { User } from '../models/user';
import { ResponseObject } from '../shared/interfaces/response-object.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authUrl: string

  constructor(private http: HttpClient) {
    this.authUrl = 'http://localhost:8080/auth'
  }

  public addUser(user: User): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(`${this.authUrl}/signup`, user);
  }

  tryLogin(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, loginRequest);
  }
}
