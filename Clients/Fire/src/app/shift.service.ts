import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Shift } from './models/shift';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShiftService {

  constructor(private http: Http) { }

  getShifts(){
    return this.http.get('shift').toPromise()
                .then(response => response.json() as Shift[])
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
