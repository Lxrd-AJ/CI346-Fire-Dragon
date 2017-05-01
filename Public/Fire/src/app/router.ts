import { RouterModule,Routes }   from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShiftComponent } from './shift/shift.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: 'employees/:id', component: EmployeeComponent },
    { path: 'shift', component: ShiftComponent },
    { path: 'login', component: LoginComponent },
    { path: '*', redirectTo: '/', pathMatch: 'full' }
];
