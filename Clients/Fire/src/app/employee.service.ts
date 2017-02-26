import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Employee } from './models/employee';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getEmployees(){
    return this.http.get('employee').toPromise()
                .then(response => response.json() as Employee[])
                .catch(this.handleError)
  }

  /**
   * Sends a Request to add a new employee 
   */
  postEmployee( employee: Employee ){
    return this.http.post('employee', JSON.stringify({ employee: employee }), {headers: this.headers})
                  .toPromise()
                  .then(res => res)
  }

  /**
   * Sends a request to update an existing employee 
   */
  putEmployee(){}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
