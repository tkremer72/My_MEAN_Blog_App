import { AuthData } from '../../shared/models/auth-data.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

const BACKEND = environment.apiUrl + "/users";

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
//Create a property to store the user id when retrieved from the backend
private userId: string;

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

getUserId() {
  return this.userId;
}

//Register a user
  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post(BACKEND + '/signup', authData)
      .subscribe(() => {
        this.router.navigate(['/'])
      }, error => {
        this.authStatusListener.next(false);
      });
  }


  //Log a user in
  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    }
    this.http.post<{ token: string, expiresIn: number, userId: string }>(
      BACKEND + '/login',
      authData
    ).subscribe(response => {
      //console.log(response);
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        // console.log(expirationDate)
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
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
      this.userId = authInformation.userId;
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
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

private setAuthTimer(duration: number) {
console.log("Setting timer: " + duration);
this.tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000)
}

private saveAuthData(token: string, expirationDate: Date, userId: string) {
localStorage.setItem('token', token);
localStorage.setItem('expiration', expirationDate.toISOString());
localStorage.setItem('userId', userId);
}

private clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
}

private getAuthData() {
  const token = localStorage.getItem('token');
  const expirationDate = localStorage.getItem('expiration');
  const userId = localStorage.getItem('userId');
  if(!token || !expirationDate) {
    return;
  }
  return {
    token: token,
    expirationDate: new Date(expirationDate),
    userId: userId
  }
}
}
