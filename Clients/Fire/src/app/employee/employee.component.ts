import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import { MdSnackBar } from '@angular/material';

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


    constructor( public employeeDialog:MdDialog, 
        private employeeService:EmployeeService,
        public snackBar: MdSnackBar ) { }

    launchDialog(){
        let dialogRef = this.employeeDialog.open(AddEmployeeDialogComponent, {
            width: '50%',
            height: '40%',
            disableClose: true,
            //position: {top: '-50', bottom: '50', left: '-50', right: '50' },
            data: new Employee("","",null) 
        });
        dialogRef.afterClosed().subscribe(emp=> {
            console.info("`afterClosed` message from dialog ---")
            //NB: emp is always undefined, most likely due to a bug in angular that doen't return the passed data
            //so we shall take the object directly from the dialog
            const employee: Employee = dialogRef.componentInstance.model;
            if( this.isEmployeeValid(employee) ){
                this.employeeService.postEmployee(employee).then((response) => {
                    if( response.status == 200 ){
                        console.info("Successfully sent employee data to the server")
                        const json = response.json()
                        employee.id = json.id;
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
            this.isLoading = false
        });
    }

}
