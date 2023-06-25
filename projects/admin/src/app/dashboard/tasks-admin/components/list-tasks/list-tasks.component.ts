import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';

export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup;
  page:any = 1;
  total:any;
  filteration:any = {
    page: this.page,
    limit: 4
  };
  timeoutId:any;
  users:any = [];
  status:any = [
    {name:this.translate.instant("tasks.complete") },
    {name:this.translate.instant("tasks.in-progress") }
  ]
  
  constructor(private fb: FormBuilder,
              private tasksService: TasksService,
              private dialog: MatDialog,
              private translate: TranslateService,
              private usersService: UsersService) {

                this.getDataFromSubject()
              }

  ngOnInit(): void {
    this.createform();
    this.getUsers();
    this.getAllTasks();
  }


  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }


  getUsers() {
    this.usersService.getUsersData()
  }

  getDataFromSubject() {
    this.usersService.userSubject.subscribe((res:any) => {
      this.users = this.usersMapping(res.data)
   })
  }

  usersMapping(data:any) {
    let newArray = data?.map((item:any) => {
      return {
        name: item.username,
        id: item._id
      }
    })
    return newArray
  }

  getAllTasks() {
    this.tasksService.getAllTasks(this.filteration).subscribe((res:any) =>{
      this.dataSource = this.mappingTasks(res.tasks);
      this.total = res.totalItems;
    })
  }

  mappingTasks(data:any[]) {
    let newTasks = data.map(item =>{
      return {
        ...item,
        user:item.userId.username
      }
    });
    return newTasks
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      width: '750px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllTasks()
      }
    })
}

  deleteTask(id:any) {
    this.tasksService.deleteTask(id).subscribe(res => {
      this.getAllTasks();
    })
  }

  updateTask(element:any) {
    const dialogRef = this.dialog.open(AddTasksComponent, {
      width: '750px',
      data: element,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getAllTasks()
      }
    })
  }


  search(event:any) {
    this.filteration['keyword'] = event.value;
    this.page = 1;
    this.filteration['page'] = 1;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() =>{
      this.getAllTasks();
    },2000);
  }

  selectedUser(event:any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['userId'] = event.value;
    this.getAllTasks();
  }


  selectedStatus(event:any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration['status'] = event.value.trim();
      this.getAllTasks();
  }

  

  selectedDate(event:any, type:any) {
    this.page = 1;
    this.filteration['page'] = 1;
    this.filteration[type] = moment(event.value).format('DD-MM-YYYY');

    if(type == 'toDate' && this.filteration['toDate'] !== 'Invalid date') {
      this.getAllTasks()
    }
  }

  changePage(event:any) {
    this.page = event;
    this.filteration['page'] = event;
    this.getAllTasks();
  }

}
