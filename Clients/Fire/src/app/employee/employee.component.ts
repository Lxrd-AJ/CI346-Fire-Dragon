import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

    employees: Employee[] = [];
    notes = [
        { name: 'One Punch Man', date: new Date() }
    ];


    constructor( public employeeDialog:MdDialog, private employeeService:EmployeeService ) { }

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
            this.employees.unshift(employee);
        })
        
    }


    ngOnInit() {
        this.employeeService.getEmployees().then((employees) => this.employees = employees);
    }

}
