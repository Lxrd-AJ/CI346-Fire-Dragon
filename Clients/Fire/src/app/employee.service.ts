import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Employee } from './models/employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  constructor(private http:Http) { }

  getEmployees(){
    return this.http.get('employee').toPromise()
                .then(response => response.json() as Employee[])
                .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
