const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Blog = require('./models/blog');

const app = express()

mongoose.connect(
  'mongodb+srv://tbone7243:Daddykjune1!@cluster0.lebuw.mongodb.net/My_MERN_Blog?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => {
  console.log('Connected to the database!');
}).catch(() => {
  console.log('Connection failed!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//Below is the automatic CORS policy set by express.
app.use(cors())

//Below is manually setting the CORS Policy
/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
 next();
}); */

app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content
  });
  //console.log(blog);
  blog.save().then(createdBlog => {
    res.status(201).json({
      message: 'Blog added successfully!',
      blogId: createdBlog._id
    });
  });
});

app.get('/api/blogs', (req, res, next) => {
  Blog.find().then(documents => {
    //console.log(documents)
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs: documents
    });
  });
});

app.delete('/api/blogs/:id', (req, res, next) => {
  //console.log(req.params.id);
  Blog.deleteOne({
    _id: req.params.id
  })
  .then(result => {
    //console.log(result);
    res.status(200).json({
      message: 'Blog deleted'
    });
  });
});
module.exports = app;
