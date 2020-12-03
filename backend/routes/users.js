const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const user = require('../models/user');

const router = express.Router();
//Signup route
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User has been created!',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });
});
//Login route
router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if(!user) {
      return res.status(404).json({
        message: 'Authorization failed!'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  })
  .then(result => {
    if(!result) {
      return res.status(404).json({
        message: 'Authorization failed!'
      });
    }
    const token = jwt.sign({
      email: fetchedUser.email, userId: fetchedUser._id
    },
    'this_is_the_secret_used_encrypt_the_password_this_should_be_long_and_should_never_be_exposed_to_anyone_especially_the_client_or_the_user',
    {
      expiresIn: '1h'
    });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  }).catch(err => {
    return res.status(404).json({
      message: 'Authorization failed!'
    });
  });
});

module.exports = router;
