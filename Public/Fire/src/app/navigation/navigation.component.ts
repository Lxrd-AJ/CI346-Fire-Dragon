import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth-service.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    get currentUser() {
        return this.authService.currentUser()
    }
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
