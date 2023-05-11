import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { ResponseObject } from '../shared/interfaces/response-object.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accountsListUrl: string;

  constructor(private http: HttpClient) {
    this.accountsListUrl = 'http://localhost:8080';
  }

  public getUserAccounts(idUser: string): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${this.accountsListUrl}/users/${idUser}/accounts`);
  }

  public addUserAccount(idUser: string, idWebsite: string): Observable<any> {
    return this.http.post<any>(`${this.accountsListUrl}/users/${idUser}/accounts/add/${idWebsite}`, idWebsite);
  }

}
