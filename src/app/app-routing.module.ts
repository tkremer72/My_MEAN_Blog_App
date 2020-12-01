import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { BlogListComponent } from './components/blogs/blog-list/blog-list.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'create', component: BlogCreateComponent },
  { path: 'edit/:blogId', component: BlogCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
