const express = require('express');
const multer = require('multer');

const Blog = require('../models/blog');
const auth = require('../middleware/check-auth');

const router = express.Router();
//Create a helper for multer to determine the type of file to allow
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};
//Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//Create a new blog
router.post('', auth, multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  //console.log(blog);
  blog.save().then(createdBlog => {
    res.status(201).json({
      message: 'Blog added successfully!',
      blog: {
        ...createdBlog,
        id: createdBlog._id,
        /* title: createdBlog.title,
        content: createdBlog.content,
        imagePath: createdBlog.imagePath */
      }
    });
  });
});
//Update a blog
router.put('/:id', auth, multer({ storage: storage }).single('image'),
(req, res, next) => {
  //console.log(req.file);
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/images/' + req.file.filename;
  }
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  })
  console.log(blog);
  Blog.updateOne({ _id: req.params.id }, blog)
  .then(result => {
    // console.log(result);
    res.status(200).json({ message: 'Update successful!' });
  });
});
//Get all of the blogs in the database
router.get('', (req, res, next) => {
  //console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const blogQuery = Blog.find();
  let fetchedBlogs;
  if(pageSize && currentPage) {
    blogQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  blogQuery
  .then(documents => {
    fetchedBlogs = documents;
    //console.log(documents)
   return Blog.countDocuments();
  }).then(count => {
    res.status(200).json({
      message: 'Blogs fetched successfully!',
      blogs: fetchedBlogs,
      maxBlogs: count
    });
  })
});
//Get a single blog to populate the edit blog form
router.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id).then(blog => {
    if(blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found!'})
    }
  });
});
//Delete a blog
router.delete('/:id', auth, (req, res, next) => {
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
