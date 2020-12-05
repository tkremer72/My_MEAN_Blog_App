# MeanBlog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Modifications I have made to this project.

1.  Starting with the app.component.html file, I removed all the original boiler plate code and replaced it with an h2 tag that says My First App.
2. Created new development branch to start out working on.
3. The first component to this application 
  a. ng g c components/blogs/blog-create

4. Installing Angular Material 
  a. ng add @angular/material

5. Create a new header component using the cli
  ng g c components/header

6. Create a new component, blog-list component 
  ng g c components/blogs/blog-list

7. Create a blog model 

8. Create a service to get posts 
ng g s components/shared/services/blogs

Create a server.js file in the root, create a folder called backend in the root of the Angular project, create a file called app.js that lives in the backend folder.

add a new start script to the package.json file

npm install --save-dev nodemon
npm install --save express
npm install --save cors
npm install --save body-parser

npm install --save mongoose

Add routing to the application, style the header toolbar and use custom classes provided by Angular Material.

Created the link and functionality to update posts and to load a single post to populate the form to update those posts.

Create a routes folder on the backend root to start organizing our code for our routes.

Add loading spinners on the frontend.

Creating a mime-type validator file to use with the image upload in the blog-create component. 

Create the file upload functionality on the backend starting with installing multer.
npm install --save multer

Next steps are to add pagination to the project on the front and backend. 

Time to start working on authentication and authorization, begin by creating a signup and login component that live within an auth folder in the components folder.
ng g c components/auth/signup
ng g c components/auth/login

Create the user model on the backend and the routes for creating users.  Install mongoose unique validator

npm install --save mongoose-unique-validator

Install bcrypt and create the signup route that hashes the password
npm install --save bcrypt

in the frontend create a new service for the users to connect to the backend.

ng g s components/shared/services/auth
Create a new model on the frontend for the user
ng g interface components/shared/models/auth-data

install jsonwebtoken on the backend
npm install --save jsonwebtoken

Create an interceptor for the token
ng g interceptor components/shared/interceptors/auth

Working on the UI Interface and messages.
starting out with creating a new branch called auth and switching into that branch.
added project to auth branch, staged everything, committed everything and pushed everything.

Time for some route guards to keep users from visiting routes that they aren't allowed to visit.

ng g guard components/shared/guards/auth

Set the token expiration time in the UI

Create an interceptor for error handling 

Changed the app.js and the file.js to serve from the backend, see comments there. 


