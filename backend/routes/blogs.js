const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Blog.updateOne({ _id: req.params.id }, blog)
  .then(result => {
    // console.log(result);
    res.status(200).json({ message: 'Update successful!' });
  });
});

router.get('', (req, res, next) => {
  Blog.find().then(documents => {
    //console.log(documents)
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs: documents
    });
  });
});
router.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id).then(blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found!'})
    }
  });
});

router.delete('/:id', (req, res, next) => {
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

module.exports = router;
