import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import { Shift } from './models/shift';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShiftService {
    private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getShifts(){
    return this.http.get('shift').toPromise()
                .then(response => response.json() as Shift[])
                .catch(this.handleError);
  }

    saveShift(shift: Shift){
        return this.http.post('shift', JSON.stringify({ shift: shift }), {headers: this.headers})
                    .toPromise()
                    .then(res => res)
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
