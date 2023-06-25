import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http:HttpClient) { }
  
  login(model:Login) {
    return this.http.post(environment.api + '/auth/login', model)
  }

}
