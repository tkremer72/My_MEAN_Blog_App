const express = require('express');

const auth = require('../middleware/check-auth');
const upload = require('../middleware/file');

const blogControl = require('../controllers/blogs.controller');

const router = express.Router();



//Create a new blog
router.post('', auth, upload, blogControl.createBlog);

//Update a blog
router.put('/:id', auth, upload, blogControl.updateBlog);

//Get all of the blogs in the database
router.get('', blogControl.getBlogs);

//Get a single blog to populate the edit blog form
router.get('/:id', blogControl.getBlog);

//Delete a blog
router.delete('/:id', auth, blogControl.deleteBlog);

module.exports = router;
