import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
export interface ChangeStatus {
  id: string,
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userSubject = new BehaviorSubject({})
  constructor(private http:HttpClient) { }

  getAllUsers(filter:any) {
    let params = new HttpParams();
    if(filter) {
      Object.entries(filter).forEach(([key, value]:any)=> {
        if(value) {
          params = params.append(key, value)
        }
      })
    }

    return this.http.get(environment.api + "/auth/users", {params})
  }

  getUsersData(model?:any) {
    this.getAllUsers(model).subscribe((res:any) => {
      this.userSubject.next({
        data: res.users,
        total: res.totalItems
      })
    })
  }

  deleteUser(id:string) {
    return this,this.http.delete(environment.api + "/auth/user/" + id)
  }

  changeStatus(model:ChangeStatus) {
    return this,this.http.put(environment.api + "/auth/user-status", model)
  }
}
