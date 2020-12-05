import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
declarations: [
  BlogCreateComponent,
  BlogListComponent
],
imports: [
  CommonModule,
  ReactiveFormsModule,
  AngularMaterialModule,
  RouterModule
]
})

export class BlogsModule {}
