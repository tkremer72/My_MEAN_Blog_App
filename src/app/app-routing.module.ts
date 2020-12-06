import { AuthGuard } from './components/shared/guards/auth.guard';
import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { BlogListComponent } from './components/blogs/blog-list/blog-list.component';
//import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  { path: 'edit/:blogId', component: BlogCreateComponent, canActivate: [ AuthGuard ] },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent }
  //{ path: 'auth', loadChildren: "./components/auth/auth.module#AuthModule"}
  //Alternative sentax below
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m =>  m.AuthModule)}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
