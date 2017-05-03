import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { MdSnackBar } from '@angular/material';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService, MdSnackBar]
})
export class EmployeeComponent implements OnInit {

    employees: Employee[] = [];
    notes = [
        { name: 'One Punch Man', date: new Date() }
    ];
    isLoading: boolean = false;
    selectedEmployee: Employee;

    constructor( public employeeDialog:MdDialog, 
        private employeeService:EmployeeService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router ) { }

    launchDialog(){
        let dialogRef = this.employeeDialog.open(AddEmployeeDialogComponent, {
            width: '50%',
            height: '40%',
            disableClose: true,
            //position: {top: '-50', bottom: '50', left: '-50', right: '50' },
            data: new Employee("","",null) 
        });
        dialogRef.afterClosed().subscribe(emp => {
            console.info("`afterClosed` message from dialog ---")
            //NB: emp is always undefined, most likely due to a bug in angular that doen't return the passed data
            //so we shall take the object directly from the dialog
            let employee: Employee = dialogRef.componentInstance.model;
            if( this.isEmployeeValid(employee) ){
                this.employeeService.postEmployee(employee).then((response) => {
                    if( response.status == 200 ){
                        console.info("Successfully sent employee data to the server")
                        const json = response.json()
                        console.info(json);
                        employee = json;
                        console.info(`Recieved from Server -> ${JSON.stringify(employee)}`)
                        this.snackBar.open(`Successfully saved ${employee.name}`,"Close",{duration: 3000});
                    }else{
                        console.error(response)
                        this.snackBar.open(response.statusText,"Close",{duration: 2000});
                    }
                    this.employees.unshift(employee);
                });
            }
        }) 
    }

    isEmployeeValid(employee: Employee) : boolean {
        var isValid = true;
        if(employee.name.length === 0){
            isValid = false;
        }else if(employee.age <= 0 ){
            isValid = false;
        }
        return isValid;
    }


    ngOnInit() {
        this.isLoading = true;
        this.employeeService.getEmployees().then((employees) => { 
            this.employees = employees
            this.isLoading = false;

            this.route.params.subscribe(param => { 
                let employee = this.employees.find((emp) => emp._id === param["id"])
                if(employee){
                    this.selectEmployee(employee);
                }
                console.info(param['id'])
            });
        });
    }

    selectEmployee( employee ){
        this.selectedEmployee = employee;
        this.router.navigate(['/employees', employee._id]);
    }

    removeEmployee( employee:Employee ){
        console.info("Remove employee called");
        this.employees = this.employees.filter((emp) => emp._id !== employee._id)
        this.selectedEmployee = null;
    }

}
