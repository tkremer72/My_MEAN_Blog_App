import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//Bring in the Blog model
import { Blog } from '../../../components/blogs/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogs: Blog[] = [];
  private blogsUpdated = new Subject<Blog[]>()

  constructor(
    private http: HttpClient
  ) { }

  getBlogs() {
    this.http.get<{message: string, blogs: Blog[]}>('http://localhost:3000/api/blogs')
    .subscribe((blogData) => {
      this.blogs = blogData.blogs;
      this.blogsUpdated.next([...this.blogs]);
    });
  }

  getBlogUpdateListener() {
    return this.blogsUpdated.asObservable();
  }

  addBlog(title: string, content: string) {
    const blog: Blog = { id: null, title: title, content: content };
    this.http.post<{message: string, }>('http://localhost:3000/api/blogs', blog)
    .subscribe((resData) => {
      console.log(resData.message);
      this.blogs.push(blog);
    this.blogsUpdated.next([...this.blogs]);
    });
  }
  
}
