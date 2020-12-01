import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogsService } from '../../shared/services/blogs.service';

import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  //Create some dummy blogs
/*   blogs = [
    {
      id: 1,
      title: "Blog 1",
      content: "Blog one\'s content goes here.",
      author: "Thomas Kremer",
      userId: 1,
      date: new Date()
    },
    {
      id: 1,
      title: "Blog 2",
      content: "Blog two\'s content goes here.",
      author: "Thomas Kremer",
      userId: 1,
      date: new Date()
    },{
      id: 1,
      title: "Blog 3",
      content: "Blog three\'s content goes here.",
      author: "Thomas Kremer",
      userId: 1,
      date: new Date()
    }
  ]; */
  //Set the blogs to an empty array
/*   @Input()  */ blogs: Blog[] = [];
  isLoading = false;
  private blogsSub: Subscription;

  constructor(
    public blogsService: BlogsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.blogsService.getBlogs();
    this.blogsSub = this.blogsService.getBlogUpdateListener().subscribe((blogs: Blog[]) => {
      this.isLoading = false;
      this.blogs = blogs;
    });
  }
  onDelete(blogId: string) {
    this.blogsService.deleteBlog(blogId);
  }

  ngOnDestroy() {
    //Remove the subscription and prevent memory leaks
    this.blogsSub.unsubscribe();
  }

}
