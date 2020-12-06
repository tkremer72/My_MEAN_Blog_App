import { AngularMaterialModule } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
//import { AuthModule } from './components/auth/auth.module';
import { BlogsModule } from './components/blogs/blogs.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Bring in the AuthInterceptor
import { AuthInterceptor } from './components/shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from './components/shared/interceptors/error.interceptor';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent
  ],
  imports: [
    AngularMaterialModule,
    //AuthModule,
    BlogsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
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
