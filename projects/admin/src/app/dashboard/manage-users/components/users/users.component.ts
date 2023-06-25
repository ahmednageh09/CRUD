import { Component, OnInit } from '@angular/core';
import { ChangeStatus, UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  page = 1;
  totalItems:any;
  filteration:any = {
    page: this.page,
    limit: 10
  };
  timeoutId:any;
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any = [];

  constructor(private service:UsersService,
              private toastr:ToastrService,
              private translate: TranslateService) {

                this.gerDataFromSubject()
              }

  ngOnInit(){
    this.getUsers();
  }

  getUsers() {
    const model = {
      page: this.page,
      limit:10,
      name: this.filteration.keyword
    }
    this.service.getUsersData(model)
  }

  gerDataFromSubject() {
    this.service.userSubject.subscribe((res:any) => {
      this.dataSource = res.data,
      this.totalItems = res.total
    })
  }

  deleteUser(id:string, index:number) {
    if(this.dataSource[index].assignedTasks > 0) {
      this.toastr.error(this.translate.instant("toastr.can'tDelete"))
    }else {
      this.service.deleteUser(id).subscribe(res => {
        this.toastr.success(this.translate.instant("toastr.Deleted"), this.translate.instant("toastr.success"));
        this.getUsers();
      })
    }
  }

  changeUserStatus(id:string, status:string, index:number) {
    const model:ChangeStatus = {
      id,
      status
    }

    if(this.dataSource[index].assignedTasks > 0) {
      this.toastr.error(this.translate.instant("toastr.can'tInactivate"))
    }else{
      this.service.changeStatus(model).subscribe(res => {
        this.toastr.success(this.translate.instant("toastr.updateStatus"), this.translate.instant("toastr.success"));
        this.getUsers();
      })
    }

  }

  changePage(event:any) {
    this.page = event
    this.getUsers();
  }

  search(event:any) {
    this.filteration['keyword'] = event.value;
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() =>{
      this.getUsers();
    },2000);

  }

}

