import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit{
  newTaskForm!:FormGroup;
  imgName='';
  formValues:any;
  constructor ( @Inject(MAT_DIALOG_DATA) public data:any,
                private fb:FormBuilder ,
                private dialog: MatDialogRef<AddTasksComponent> ,
                private matDialog:MatDialog ,
                private service:TasksService,
                private toastr:ToastrService,
                private usersService:UsersService,
                private translate:TranslateService) {

                  this.getDataFromSubject()
                }
  ngOnInit(): void {
    this.data;
    this.createForm();
  }

  users:any = [];


  createForm() {
    this.newTaskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.minLength(5)]],
      userId: [this.data?.userId?._id || '', Validators.required],
      image: [this.data?.image || '', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [this.data? new Date(this.data?.deadline.split(" ").reverse().join('-')).toISOString() : '', Validators.required]
    });

    this.formValues = this.newTaskForm.value;
  }
  
  getDataFromSubject() {
    this.usersService.userSubject.subscribe((res:any) => {
      this.users = this.usersMapping(res.data)
   })
  }

  usersMapping(data:any) {
    let newArray = data.map((item:any) => {
      return {
        name: item.username,
        id: item._id
      }
    })
    return newArray
  }

  createTask() {
    let model = this.prepareFormData()
    this.service.createTask(model).subscribe(res =>{
      this.toastr.success(this.translate.instant('toastr.addedSuccess'), this.translate.instant('toastr.success'));
      this.dialog.close(true);
    })

  }

  update() {
    let model = this.prepareFormData();
    this.service.updateTask(model,this.data._id).subscribe(res =>{
      this.toastr.success(this.translate.instant('toastr.addedSuccess'), this.translate.instant('toastr.success'));
      this.dialog.close(true);})
  }

  prepareFormData() {
    let newDate = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData = new FormData();
    for (let key in this.newTaskForm.value) {
      let value = this.newTaskForm.value[key];
      if (key === 'deadline') {
        value = newDate;
      }
      formData.append(key, value);
    }
    return formData;
  }

  selectImage(event:any) {
    this.imgName = event.target.value;
    this.newTaskForm.get("image")!.setValue(event.target.files[0])
  }


  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if(this.formValues[item] !== this.newTaskForm.value[item]) {
        hasChanges = true;
      }
    });

    if(hasChanges) {
      this.matDialog.open(ConfirmationComponent, {
        width: '750px',
      });
    }else {
      this.dialog.close();
    }
  }

}
