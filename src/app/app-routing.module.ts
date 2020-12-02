import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { BlogListComponent } from './components/blogs/blog-list/blog-list.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'edit/:blogId', component: BlogCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
