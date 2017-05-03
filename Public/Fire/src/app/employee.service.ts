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
                .then(response => {
                  //TODO:Check if redirect url is for auth and manually make redirect
                  console.log(response);
                  console.log(response.url);
                  if( response.status == 302){
                    console.info("302 recieved")
                  }
                  return response.json() as Employee[]
                })
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

  deleteEmployee( employee: Employee ){
    return this.http.delete(`employee/${employee._id}`).toPromise()
                      .then(res => res)
                      .catch(this.handleError);
  }

  /**
   * Sends a request to update an existing employee 
   */
  putEmployee(){}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred'); // for demo purposes only
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
