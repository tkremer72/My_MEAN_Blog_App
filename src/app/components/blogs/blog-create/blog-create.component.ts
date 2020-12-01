import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogsService } from '../../shared/services/blogs.service';

import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  // Add some dummy content to create a blog
  //newBlog = 'NO CONTENT AVAILABLE';
  //Using two way data binding to extract input
blog: Blog;
enteredTitle = '';
enteredContent = '';
isLoading = false;
private mode = 'create';
private blogId: string;



/* @Output() blogCreated = new EventEmitter<Blog>();
 */
  constructor(
    public blogsService: BlogsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('blogId')) {
        this.mode = 'edit';
        this.blogId = paramMap.get('blogId');
        //Show the progress spinner
        this.isLoading = true;
        this.blogsService.getBlog(this.blogId).subscribe(blogData => {
          //Stop showing the progress spinner
          this.isLoading = false;
          this.blog = { id: blogData._id, title: blogData.title, content: blogData.content }
        });
      } else {
        this.mode = 'create';
        this.blogId = null;
      }
    });
  }
  onSaveBlog(form: NgForm/* blogInput: HTMLTextAreaElement */) {
    //console.dir(blogInput);
    //alert('Blog added!')
    //Dummy content
    //this.newBlog = "The user\'s Blog";
    //Getting the input from the textarea
    //this.newBlog = blogInput.value;
    //Using two way data binding
    //this.newBlog = this.enteredValue;
    if(form.invalid) {
      return;
    }
    //Show the loading spinner
    this.isLoading = true;
    // const blog: Blog = {
    //   // title: this.enteredTitle,
    //   // content: this.enteredContent
    //   title: form.value.title,
    //   content: form.value.content
    // };
    //Check which mode we are in
    if(this.mode === 'create') {
          this.blogsService.addBlog(form.value.title, form.value.content);
    } else {
      this.blogsService.updateBlog(this.blogId, form.value.title, form.value.content);
    }
    //reset the form after clicking submit
    form.resetForm();
  }
}
