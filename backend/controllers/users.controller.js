const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//Create a user
exports.registerUser = (req, res, next) => {
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
          message: 'Invalid authentication credentials!'
      });
    });
  });
}
//Log a user in
exports.loginUser = (req, res, next) => {
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
    process.env.JWT,
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
      message: 'Invalid authentication credentials!'
    });
  });
}
