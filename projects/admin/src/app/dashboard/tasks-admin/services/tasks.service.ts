import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks(filter:any) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value] : any) => {
      if(value) {
        params = params.append(key , value);
      }
    })

    return this.http.get(environment.api + '/tasks/all-tasks' , {params})
  }

  createTask(model:any) {
    return this.http.post(environment.api + '/tasks/add-task', model)
  }

  updateTask(model:any, id:any) {
    return this.http.put(environment.api + '/tasks/edit-task/'+id, model)
  }

  deleteTask(id:any) {
    return this.http.delete(environment.api + '/tasks/delete-task/'+id)
  }

}
