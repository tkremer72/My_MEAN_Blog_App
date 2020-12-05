import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// Bring in the FormsModule
//import { FormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Bring in the AuthInterceptor
import { AuthInterceptor } from './components/shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from './components/shared/interceptors/error.interceptor';


import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AngularMaterialModule } from './angular-material.module';
import { BlogsModule } from './components/blogs/blogs.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    AngularMaterialModule,
    BlogsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [{
    /* We must provide the AuthInterceptor to the app setting multi to true tells
    Angular not to override existing intercpetors but to add ours as an additional
    interceptor */
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  //Informs Angular to use this component even though Angular can't see it
  entryComponents: [ErrorComponent]
})
export class AppModule { }
