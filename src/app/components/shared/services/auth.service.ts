import { AuthData } from '../../shared/models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /* Create a new isAuthenticated property to set and store the true or false value of
  whether a user is authenticated or not after login.
   */
  private isAuthenticated = false;
  //Create a token variable to recieve the token from the backend
  private token: string;
  //Create a property to hold the expiration time
  private tokenTimer: any;

  /* Create a authorization status listener to push authentication information
  to the components that are interested in it.  */
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  //Get the authentication token
  getToken() {
    return this.token;
  }
  //Create a method to return the authentication status of a user after logging in
  getIsAuth() {
    return this.isAuthenticated;
  }
  //return the authentication status true or false as an observable
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }





  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post('http://localhost:3000/api/users/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }


  //Log a user in
  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{ token: string, expiresIn: number }>(
      'http://localhost:3000/api/users/login',
      authData
    ).subscribe(response => {
      //console.log(response);
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        // console.log(expirationDate)
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);
      }
    });
  }
   autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(authInformation, expiresIn)
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  //Log a user out and remove or clear all information
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

private setAuthTimer(duration: number) {
console.log("Setting timer: " + duration);
this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000)
}

private saveAuthData(token: string, expirationDate: Date) {
localStorage.setItem('token', token);
localStorage.setItem('expiration', expirationDate.toISOString());
}
private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
}
private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  if(!token || !expirationDate) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate)
  }
}
}
