import { Component, Input, OnInit } from '@angular/core';

import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
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
  @Input() blogs: Blog[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
