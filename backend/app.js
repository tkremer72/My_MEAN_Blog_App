const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRoute = require('./routes/blogs');

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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
 next();
});

//Use the express router to get to the routes
app.use('/api/blogs', blogsRoute);


module.exports = app;
