import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogsService } from '../../shared/services/blogs.service';

import { Blog } from '../../shared/models/blog.model';
import { PageEvent } from '@angular/material/paginator';

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
//total number of pages
  totalBlogs = 0;
//total number of blogs per page
  blogsPerPage = 2;
//Options for how many blogs per page to display
  pageSizeOptions = [1, 2, 5, 10];
//create a variable for the current page
  currentPage = 1;

  private blogsSub: Subscription;

  constructor(
    public blogsService: BlogsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.blogsService.getBlogs(this.blogsPerPage, this.currentPage);
    this.blogsSub = this.blogsService.getBlogUpdateListener().subscribe((blogData: {blogs: Blog[], blogCount: number}) => {
      this.isLoading = false;
      this.totalBlogs = blogData.blogCount;
      this.blogs = blogData.blogs;
    });
  }

  onChangedPage(pageData: PageEvent) {
//console.log(pageData);
this.isLoading = true;
this.currentPage = pageData.pageIndex + 1;
this.blogsPerPage = pageData.pageSize;
this.blogsService.getBlogs(this.blogsPerPage, this.currentPage);
  }

  onDelete(blogId: string) {
    this.isLoading = true;
    this.blogsService.deleteBlog(blogId).subscribe(() => {
      this.blogsService.getBlogs(this.blogsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    //Remove the subscription and prevent memory leaks
    this.blogsSub.unsubscribe();
  }

}
