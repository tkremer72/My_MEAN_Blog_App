const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: false}))
//Below is the automatic CORS policy set by express.
.use(cors())

//Below is manually setting the CORS Policy
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
 next();
}); */

.post('/api/blogs', (req, res, next) => {
  const blog = req.body;
  console.log(blog);
  res.status(201).json({
    message: 'Blog added successfully!'
  });
})

.get('/api/blogs', (req, res, next) => {
  const blogs = [
    { id: '1232121', title: "First server side blog", content: 'This is coming from the server' },
    { id: '1232122', title: "Second server side blog", content: 'This is coming from the server!' },
    { id: '1232123', title: "Third server side blog", content: 'This is coming from the server!!' }
  ];
  res.status(200).json({
    message: 'Blogs fetched successfully!',
    blogs: blogs
  });
})

module.exports = app;
