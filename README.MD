# Open Force API

## User/Auth Endpoints

To create a new user:
* https://openforce.herokuapp.com/auth/signup
* Takes fields: username, password, email

To sign in:
* https://openforce.herokuapp.com/auth/signin

## Project Endpoints

* https://openforce.herokuapp.com/projects
* Takes fields: title, summary, projectUrl, imageUrl, users, and posts.
* Supports POST, GET, and GET/id.
* User must be signed in to create/add a new project only. 


## Post Endpoints

* https://openforce.herokuapp.com/posts
* Takes fields: user, project, and text.
* Supports POST GET and GET/projectId only.
* User must be signed in to create/add a new post. 

