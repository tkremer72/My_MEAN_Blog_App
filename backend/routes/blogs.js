const express = require('express');
const multer = require('multer');
const { createShorthandPropertyAssignment } = require('typescript');

const Blog = require('../models/blog');

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

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {
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

router.put('/:id', multer({ storage: storage }).single('image'),
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
