import { AuthService } from '../shared/services/auth.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //Create a variable for an authenticated user
  userIsAuthenticated = false;
//Create a subscription to the authStatusListener
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }



  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
onLogout() {
  this.authService.logout();
}
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
