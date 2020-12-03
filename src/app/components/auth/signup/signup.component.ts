import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
//Store the subscription to manage it
private authStatusSubs: Subscription;
  constructor(
    public authService: AuthService,
    ) { }

  ngOnInit() {
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }
onSignup(form: NgForm) {
//console.log(form.value);
//Check to see if the form is not valid
if(form.invalid) {
  return;
}
this.isLoading = true;
this.authService.createUser(form.value.email, form.value.password);
}
ngOnDestroy() {
this.authStatusSubs.unsubscribe();
}
}
