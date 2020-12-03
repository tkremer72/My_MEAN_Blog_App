import { AuthService } from '../../shared/services/auth.service';
import { Blog } from '../../shared/models/blog.model';
import { BlogsService } from '../../shared/services/blogs.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

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
  //Create a property to store whether the user is authenticated or not
  userIsAuthenticated = false;
  //Create a property to store the user Id fetched from the backend
  userId: string;
  private blogsSub: Subscription;
  private authStatusSubs: Subscription;

  constructor(
    private authService: AuthService,
    public blogsService: BlogsService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.blogsService.getBlogs(this.blogsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.blogsSub = this.blogsService.getBlogUpdateListener().subscribe((blogData: { blogs: Blog[], blogCount: number }) => {
      this.isLoading = false;
      this.totalBlogs = blogData.blogCount;
      this.blogs = blogData.blogs;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
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
    this.authStatusSubs.unsubscribe();
    this.blogsSub.unsubscribe();
  }

}
