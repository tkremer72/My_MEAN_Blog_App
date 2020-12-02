import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>, next: HttpHandler)/* : Observable<HttpEvent<unknown>> */ {
      const authToken = this.authService.getToken();
      //Clone the request before adding the token to the header
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + authToken)
      });
    return next.handle(authRequest);
  }
}
