import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private headers = new Headers({'Content-Type': 'application/json'});
    

    constructor(private http: Http) { }

    login(username: String, password: String, signup?:boolean ){
        let route = (signup ? "/signup" : "/login");
        return this.http.post(route, JSON.stringify({
            username: username,
            password: password
        }), {headers: this.headers}).toPromise().then(response => {
            console.log(response.json());
            const json = response.json()
            if(!json.signup && json.user){
                sessionStorage.setItem("authenticated","true");
                sessionStorage.setItem("user", JSON.stringify(json.user));
                return {success:true, message:json.message} ;
            }else{
                return {success:false, message:json.message};
            }
        },(err) => {
            console.error(err);
            return {success:false, message:err}
          });
    }

    isAuthenticated(): boolean {
        return (sessionStorage.getItem("authenticated") == "true");
    }

    currentUser() {
        if( this.isAuthenticated() ){
            return JSON.parse(sessionStorage.getItem("user"))
        }else return null
    }

}
