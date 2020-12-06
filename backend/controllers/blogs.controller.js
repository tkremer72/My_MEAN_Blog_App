const Blog = require('../models/blog');

//Create a blog
exports.createBlog = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator: req.userData.userId
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
  }).catch(error => {
    res.status(500).json({
      message: 'Creating a blog failed!  Please try again later.'
    });
  });
}

exports.updateBlog = (req, res, next) => {
  //console.log(req.file);
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/images/' + req.file.filename;
  }
  const blog = new Blog({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    /* attach the user id to an updated blog here in the backend
    and not on the frontend to avoid user manipulation */
    creator: req.userData.userId
  })
  //console.log(blog);
  Blog.updateOne({ _id: req.params.id, creator: req.userData.userId }, blog)
    .then(result => {
      // console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Update unsuccessful! You are not authorized!' });
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Could not update blog!  Please try again later.'
      });
    });
}

exports.getBlogs = (req, res, next) => {
  //console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const blogQuery = Blog.find();
  let fetchedBlogs;
  if (pageSize && currentPage) {
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
    }).catch(error => {
      res.status(500).json({
        message: 'Fetching blogs failed! Please try again later.'
      });
    });
}

exports.getBlog = (req, res, next) => {
  Blog.findById(req.params.id).then(blog => {
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found!' })
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Could not fetch this blog.  Please try again later.'
    });
  });
}

exports.deleteBlog = (req, res, next) => {
  //console.log(req.params.id);
  Blog.deleteOne({
    _id: req.params.id,
    creator: req.userData.userId
  })
    .then(result => {
      //console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Deletion successful!' });
      } else {
        res.status(401).json({ message: 'Delete blog unsuccessful! You are not authorized!' });
      }
    }).catch(error => {
      res.status(500).json({
        message: 'Could not delete blog, please try again later.'
      });
    });
}
