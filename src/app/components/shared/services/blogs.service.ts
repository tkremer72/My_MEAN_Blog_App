//Bring in the Blog model
import { Blog } from '../models/blog.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


const BACKEND = environment.apiUrl + "/blogs/";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private blogs: Blog[] = [];
  private blogsUpdated = new Subject<{ blogs: Blog[], blogCount: number }>()

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getBlogs(blogsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${blogsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, blogs: any, maxBlogs: number }>(
      BACKEND + queryParams
    ).pipe(map((blogData) => {
      return {
        blogs: blogData.blogs.map(blog => {
          return {
            title: blog.title,
            content: blog.content,
            id: blog._id,
            imagePath: blog.imagePath,
            creator: blog.creator
          };
        }), maxBlogs: blogData.maxBlogs
      };
    })
    )
      .subscribe(transformedBlogsData => {
        this.blogs = transformedBlogsData.blogs;
        this.blogsUpdated.next({
          blogs: [...this.blogs],
          blogCount: transformedBlogsData.maxBlogs
        });
      });
  }

  getBlogUpdateListener() {
    return this.blogsUpdated.asObservable();
  }

  getBlog(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      content: string,
      imagePath: string,
      creator: string
    }>(
      BACKEND + id
    );
    /* {...this.blogs.find(b => b.id === id)} */;
  }

  addBlog(title: string, content: string, image: File) {
    //const blog: Blog = { id: null, title: title, content: content };
    const blogData = new FormData();
    blogData.append('title', title);
    blogData.append('content', content);
    blogData.append('image', image, title);
    this.http.post<{
      message: string,
      blog: Blog
    }>(
      BACKEND,
      blogData
    )
      .subscribe((resData) => {
        //console.log(resData.message);
        // const blog: Blog = {
        //   id: resData.blog.id,
        //   title: title,
        //   content: content,
        //   imagePath: resData.blog.imagePath
        // }
        // /* const id = resData.blogId;
        // blog.id = id; */
        // this.blogs.push(blog);
        // this.blogsUpdated.next([...this.blogs]);
        this.router.navigate(['/'])
      });
  }

  updateBlog(id: string, title: string, content: string, image: File | string) {
    //const blog: Blog = { id: id, title: title, content: content, imagePath: null };
    //Check to see what type of  image is being sent, a file or a string
    let blogData: Blog | FormData; //initialize blogData as a variable
    if (typeof (image) === 'object') {
      blogData = new FormData();
      blogData.append('id', id);
      blogData.append('title', title);
      blogData.append('content', content);
      blogData.append('image', image, title);
    } else {
      blogData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      }
    }
    this.http.put(BACKEND + id, blogData)
      .subscribe(responseData => {
        /* const updatedBlogs = [...this.blogs];
        const oldBlogIndex = updatedBlogs.findIndex(b => b.id === id);
        const blog: Blog = {
          id: id,
          title: title,
          content: content,
          imagePath: ""
        }
        updatedBlogs[oldBlogIndex] = blog;
        this.blogs = updatedBlogs;
        this.blogsUpdated.next([...this.blogs]); */
        this.router.navigate(['/'])
      });
  }

  deleteBlog(blogId: string) {
    return this.http.delete(BACKEND + blogId);
    this.router.navigate(['/'])
    /*  .subscribe(() => {
       //console.log('Deleted!');
       const updatedBlogs = this.blogs.filter(blog => {
         blog.id !== blogId
       });
       this.blogs = updatedBlogs;
       this.blogsUpdated.next([...this.blogs]);
     }); */
  }
}
