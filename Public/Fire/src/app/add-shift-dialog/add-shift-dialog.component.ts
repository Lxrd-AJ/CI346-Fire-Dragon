
import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Shift } from '../models/shift';
import { Employee } from '../models/employee'
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.css'],
  providers: [EmployeeService]
})
export class AddShiftDialogComponent implements OnInit {

    model: Shift
    allEmployees: Employee[] = []
    private _tempEmployees: Employee[] = []
    set tempEmployees(value){
        if (value instanceof Array){
            value.forEach((user) => this._tempEmployees.unshift(user))
        }else{
            this._tempEmployees.unshift(value as Employee)
            this.allEmployees = this.allEmployees.filter((emp) => emp._id != (value as Employee)._id)
        }
        this.model.employees = this._tempEmployees;
    }
    get tempEmployees(){ return this._tempEmployees; }
    submitted: boolean = false
    get diagnostic() { return JSON.stringify(this.model); }

    constructor(public dialogRef: MdDialogRef<AddShiftDialogComponent>, private employeeService:EmployeeService) {
        //this.model = dialogRef.config.data as Shift
        this.model = dialogRef.componentInstance.model;
        this.tempEmployees = this.model.employees;
    }

    ngOnInit() {
        this.employeeService.getEmployees().then((emp) => this.allEmployees = emp)
    }

    onSubmit(){
        this.model.employees = this.tempEmployees;
        this.dialogRef.close(this.model)
        this.submitted = true;
    }

}
