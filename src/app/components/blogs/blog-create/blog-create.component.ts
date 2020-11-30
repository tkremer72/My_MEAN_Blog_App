import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  // Add some dummy content to create a blog
  newBlog = 'No Content Available';
  //Using two way data binding to extract input
enteredValue = '';

  constructor() { }

  ngOnInit(): void {
  }
  onAddBlog(/* blogInput: HTMLTextAreaElement */) {
    //console.dir(blogInput);
    //alert('Blog added!')
    //Dummy content
    //this.newBlog = "The user\'s Blog";
    //Getting the input from the textarea
    //this.newBlog = blogInput.value;
    //Using two way data binding
    this.newBlog = this.enteredValue;
  }
}
