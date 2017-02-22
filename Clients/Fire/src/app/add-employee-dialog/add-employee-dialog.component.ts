import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.css']
})
export class AddEmployeeDialogComponent implements OnInit {


  constructor(public dialogRef: MdDialogRef<AddEmployeeDialogComponent>) { }

  ngOnInit() {
  }

}
