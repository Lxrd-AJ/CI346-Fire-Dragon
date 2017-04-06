import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth-service.service';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: String;
    password: String; 
    shouldCreateAccount: boolean = false

  constructor(private authService:AuthService, private router: Router, public snackBar: MdSnackBar) {
   }

  ngOnInit() {
  }

    onSubmit(){
        if(!this.shouldCreateAccount){
            this.authService.login(this.username,this.password).then((res) => {
                console.log(res)
                if(res.success){
                    this.router.navigate(['/']);
                }else{
                    this.snackBar.open(res.message);
                }
            });
        }
    }

    toggleCreateAccount(param){
        console.log(param)
    }

}
