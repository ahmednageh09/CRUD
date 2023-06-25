import { Injectable } from '@angular/core';
import { Login, createAccount } from '../context/DTOs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  createUser(model:createAccount) {
    return this.http.post(environment.api + '/auth/createAccount',model)
  }

  login(model:Login) {
    return this.http.post(environment.api + '/auth/login',model)
  }
}
