import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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
enteredTitle = '';
enteredContent = '';
@Output() blogCreated = new EventEmitter<Blog>();

  constructor() { }

  ngOnInit() {
  }
  onAddBlog(form: NgForm/* blogInput: HTMLTextAreaElement */) {
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
    const blog: Blog = {
      // title: this.enteredTitle,
      // content: this.enteredContent
      title: form.value.title,
      content: form.value.content
    };
    this.blogCreated.emit(blog);
  }
}
