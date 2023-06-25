import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from '../../materials/materials.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTasksComponent } from './components/add-tasks/add-tasks.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListTasksComponent,
    AddTasksComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    TasksAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
    NgxPaginationModule,
    TranslateModule,
    SharedModule
  ]
})
export class TasksAdminModule { }
