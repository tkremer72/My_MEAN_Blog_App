import { Component } from '@angular/core';

import { Blog } from './components/blogs/blog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedBlogs: Blog[] = [];
  
  onBlogAdded(blog) {
    this.storedBlogs.push(blog);
  }

}
