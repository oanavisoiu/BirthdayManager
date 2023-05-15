import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { User } from '../models/user';
import { ResponseObject } from '../shared/interfaces/response-object.model';
import { UserFriends } from '../models/userFriends';

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
  public getFriends(id:string): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${this.usersListUrl}/${id}/friends`)
  }
  public addFriends(userFriends:UserFriends,id:string): Observable<ResponseObject> {
    return this.http.post<ResponseObject>(`${this.usersListUrl}/${id}`,userFriends);
 }
 public deleteFriends(id:string):Observable<ResponseObject>{
  return this.http.delete<ResponseObject>(`${this.usersListUrl}/deleteFriend/${id}`)
}

}
