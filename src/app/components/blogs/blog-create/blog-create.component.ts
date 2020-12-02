import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogsService } from '../../shared/services/blogs.service';

import { Blog } from '../../shared/models/blog.model';

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
  imagePreview: string;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private blogId: string;



  /* @Output() blogCreated = new EventEmitter<Blog>();
   */
  constructor(
    public blogsService: BlogsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(3) ]
      }),
      'content': new FormControl(null, { validators: [ Validators.required ] }),
      'image': new FormControl(null, { validators: [ Validators.required ] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('blogId')) {
        this.mode = 'edit';
        this.blogId = paramMap.get('blogId');
        //Show the progress spinner
        this.isLoading = true;
        this.blogsService.getBlog(this.blogId).subscribe(blogData => {
          //Stop showing the progress spinner
          this.isLoading = false;
          this.blog = {
            id: blogData._id,
            title: blogData.title,
            content: blogData.content
          };
          this.form.setValue({
            'title': this.blog.title,
            'content': this.blog.content
          })
        });
      } else {
        this.mode = 'create';
        this.blogId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBlog( /* blogInput: HTMLTextAreaElement */) {
    //console.dir(blogInput);
    //alert('Blog added!')
    //Dummy content
    //this.newBlog = "The user\'s Blog";
    //Getting the input from the textarea
    //this.newBlog = blogInput.value;
    //Using two way data binding
    //this.newBlog = this.enteredValue;
    if (this.form.invalid) {
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
    if (this.mode === 'create') {
      this.blogsService.addBlog(this.form.value.title, this.form.value.content);
    } else {
      this.blogsService.updateBlog(this.blogId, this.form.value.title, this.form.value.content);
    }
    //reset the form after clicking submit
    this.form.reset();
  }
}
