import { RouterModule,Routes }   from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShiftComponent } from './shift/shift.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: 'shift', component: ShiftComponent },
    { path: '*', redirectTo: '/', pathMatch: 'full' }
];
