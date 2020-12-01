import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.http.get<{message: string, blogs: any}>(
      'http://localhost:3000/api/blogs'
      ).pipe(map((blogData) => {
        return blogData.blogs.map(blog => {
          return {
            title: blog.title,
            content: blog.content,
            id: blog._id
          };
        });
      }))
    .subscribe(transformedBlogs => {
      this.blogs = transformedBlogs;
      this.blogsUpdated.next([...this.blogs]);
    });
  }

  getBlogUpdateListener() {
    return this.blogsUpdated.asObservable();
  }

  addBlog(title: string, content: string) {
    const blog: Blog = { id: null, title: title, content: content };
    this.http.post<{message: string, blogId: string}>('http://localhost:3000/api/blogs', blog)
    .subscribe((resData) => {
      //console.log(resData.message);
      const id = resData.blogId;
      blog.id = id;
      this.blogs.push(blog);
      this.blogsUpdated.next([...this.blogs]);
    });
  }
deleteBlog(blogId: string) {
  this.http.delete('http://localhost:3000/api/blogs/' + blogId)
  .subscribe(() => {
    //console.log('Deleted!');
    const updatedBlogs = this.blogs.filter(blog => {
      blog.id !== blogId
    });
    this.blogs = updatedBlogs;
    this.blogsUpdated.next([...this.blogs]);
  });
}
}
