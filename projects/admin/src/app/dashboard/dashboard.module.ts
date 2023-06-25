import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialsModule } from '../materials/materials.module';
import { TasksAdminModule } from './tasks-admin/tasks-admin.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ManageUsersModule } from './manage-users/manage-users.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialsModule,
    ManageUsersModule,
    TasksAdminModule,
    TranslateModule,
    SharedModule
  ]
})
export class DashboardModule { }
