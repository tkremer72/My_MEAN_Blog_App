import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSubs: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }
onLogin(form: NgForm) {
//console.log(form.value);
//Check to see if the form is invalid and if so return to the form
if(form.invalid) {
  return;
}
this.isLoading = true;
this.authService.login(form.value.email, form.value.password);
}
ngOnDestroy() {
  this.authStatusSubs.unsubscribe();
}
}
