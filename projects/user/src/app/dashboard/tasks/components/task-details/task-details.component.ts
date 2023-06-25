import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId:any;
  details:any;
  constructor(private route: ActivatedRoute,
              private service:TasksService,
              private router:Router,
              private toastr:ToastrService,
              private translate:TranslateService) {

    this.route.paramMap.subscribe((res:any) => {
      this.taskId = res.params['id']
    })
   }

  ngOnInit(): void {
    this.taskDetails()
  }

  taskDetails() {
    this.service.taskDetails(this.taskId).subscribe((res:any) => {
      this.details = res.tasks
    })
  }

  complete() {
    const model = {
      id:this.taskId
    }
    this.service.completeTask(model).subscribe(res => {
      this.router.navigate(["/tasks"])
      this.toastr.success(this.translate.instant("toastr.completed"), this.translate.instant("toastr.success"))
    })
  }

}
