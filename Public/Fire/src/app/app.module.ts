import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import "hammerjs";

import { AppComponent } from './app.component';
import { appRoutes } from './router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';
import { ShiftComponent } from './shift/shift.component';
import { AddShiftDialogComponent } from './add-shift-dialog/add-shift-dialog.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth-service.service';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    EmployeeComponent,
    AddEmployeeDialogComponent,
    ShiftComponent,
    AddShiftDialogComponent,
    LoginComponent,
    EmployeeDetailComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  entryComponents: [AddEmployeeDialogComponent, AddShiftDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
