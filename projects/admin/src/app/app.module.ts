import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule} from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardModule } from './dashboard/dashboard.module';
import { TasksAdminModule } from './dashboard/tasks-admin/tasks-admin.module';
import { ManageUsersModule } from './dashboard/manage-users/manage-users.module';
import { CoreModule } from './core/core.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    TasksAdminModule,
    CoreModule,
    HttpClientModule,
    ManageUsersModule,
    MaterialsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'ball-grid-beat' }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);}
