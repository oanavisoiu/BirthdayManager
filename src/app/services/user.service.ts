import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { User } from '../models/user';
import { ResponseObject } from '../shared/interfaces/response-object.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersListUrl: string;

  constructor(private http: HttpClient) {
    this.usersListUrl = 'http://localhost:8080/users';
  }

  public getUsers(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.usersListUrl);
  }


}
