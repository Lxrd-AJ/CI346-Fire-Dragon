import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Employee } from '../models/employee';

@Component({
  selector: 'add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialogComponent implements OnInit {

    model: Employee;
    submitted = false;

    constructor(public dialogRef: MdDialogRef<AddEmployeeDialogComponent>) {
        this.model = dialogRef.config.data as Employee
    }

    ngOnInit() {
    }

    onSubmit(){
        this.submitted = true;
        this.dialogRef.close(this.model)
    }


    get diagnostic() { return JSON.stringify(this.model); }

}

