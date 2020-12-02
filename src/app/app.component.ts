import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/shared/services/auth.service';

//import { Blog } from './components/blogs/blog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /* storedBlogs: Blog[] = [];
  onBlogAdded(blog) {
    this.storedBlogs.push(blog);
  } */
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
