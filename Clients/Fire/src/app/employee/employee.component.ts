import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    employees = [
        { name: 'John AppleSeed', reason: 'Too much sauce'}
    ];
    notes = [
        { name: 'One Punch Man', date: new Date() }
    ];


  constructor( public employeeDialog:MdDialog ) { }

    launchDialog(){
        let dialogRef = this.employeeDialog.open(AddEmployeeDialogComponent, {
            width: '50%',
            height: '40%',
            disableClose: true,
            //position: {top: '-50', bottom: '50', left: '-50', right: '50' },
            data: this.employees //Replace with single employee if editing
        });
        dialogRef.afterClosed().subscribe(employee => {
            console.log(employee);
        })
    }

  ngOnInit() {
  }

}
