const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRoute = require('./routes/blogs.routes');
const usersRoute = require('./routes/users.routes');

const app = express()

mongoose.connect(
  "mongodb+srv://" + process.env.DBUSER + ":" + process.env.DBPW + "@cluster0.lebuw.mongodb.net/"+ process.env.DBNAME + "?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
).then(() => {
  console.log('Connected to the database!');
}).catch(() => {
  console.log('Connection failed!')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//Next line is when serving from the frontend angular folder
//app.use('/images', express.static(path.join('backend/images')));
/* this next line has to change from join backend/images to just
images when serving from within the backend folder*/
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

//Below is manually setting the CORS Policy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
 next();
});
//Below is the automatic CORS policy set by express.
app.use(cors())

//Use the express router to get to the routes
app.use('/api/blogs', blogsRoute);
app.use('/api/users', usersRoute);
app.use((req, res, next) =>{
  res.sendFile(path.join(__dirname, "angular", "index.html"));
} );


module.exports = app;
