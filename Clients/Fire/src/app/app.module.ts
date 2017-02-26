import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule }   from '@angular/router';
import "hammerjs";

import { AppComponent } from './app.component';
import { appRoutes } from './router';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeDialogComponent } from './add-employee-dialog/add-employee-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    EmployeeComponent,
    AddEmployeeDialogComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash:true}),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  entryComponents: [AddEmployeeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
