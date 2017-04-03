import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: String;
    password: String; 
    private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  ngOnInit() {
  }

    onSubmit(){
        this.http.post('/login', JSON.stringify({
            username: this.username,
            password: this.password
        }), {headers: this.headers}).toPromise().then(response => {
            console.log(response);
        },(err) => console.error(err));
    }

}
