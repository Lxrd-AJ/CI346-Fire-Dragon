import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from './../../models/employee';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  providers: [EmployeeService]
})
export class EmployeeDetailComponent implements OnInit {

    @Input() employee: Employee;
    @Output() onDeleteEmployee = new EventEmitter<Employee>();

    constructor( private employeeService:EmployeeService ) { }

    ngOnInit() {
    }

    delete( employee: Employee ){
        this.employeeService.deleteEmployee(employee).then((result) => {
            console.info(result);
            this.onDeleteEmployee.emit(employee);
        })
    }

}
