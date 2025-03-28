# Blog API  

## Overview  
This is a RESTful API for a blogging platform built with Node.js, Express, and MongoDB. The API allows users to create, edit, and delete blog posts, as well as comment on posts. It also implements user roles with specific permissions.  

## Features  
- **User Authentication & Authorization**: Secure user registration and login system.  
- **Role-Based Access Control**: Users can have different roles, such as admin and regular users.  
- **CRUD Operations for Blog Posts**: Users can create, update, and delete their blog posts.  
- **Comment System**: Users can comment on blog posts.  
- **Cascade Delete**: When a user deletes their account, all their posts and comments are automatically deleted using Mongoose middleware.  

## Technologies Used  
- **Node.js**: JavaScript runtime for the backend.  
- **Express.js**: Web framework for building RESTful APIs.  
- **MongoDB**: NoSQL database for storing data.  
- **Mongoose**: ODM library for MongoDB.  
- **JWT**: For authentication and authorization.  

## Project Structure  
```bash
/blog-api
│
├── index.js
├── package.json
├── package-lock.json
│
├── models
│   ├── user.model.js
│   ├── post.model.js
│   ├── comment.model.js
│   ├── kyc.model.js
│
├── controllers
│   ├── auth.controller.js
│   ├── post.controller.js
│   ├── user.controller.js
│   ├── admin.controller.js
│   ├── kyc.controller.js
│   ├── like.controller.js
│   └── comment.controller.js
│
├── middleware
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── routes
│   ├── auth.route.js
│   ├── user.route.js
│   ├── admin.route.js
│   ├── post.route.js
│   ├── kyc.route.js
│   └── reaction.route.js
│
└── README.md
```
## Inatallation
1. clone the repo
   git clone https://github.com/YOUR_GITHUB_USERNAME/blog-api.git
   cd blog-api
2. Install the dependencies
    npm install
3. Set up environment variable
   ```
   PORT=YOUR_PREFERRED_PORT  
   MONGODB_URI=mongodb://your_mongo_db_uri  
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server
   npm start  
5. You should see;
    http://localhost:3000 (or your specified port)


## API Endpoints  

### Authentication  

| Method | Endpoint          | Description                                    | Authentication Required |
|--------|------------------|--------------------------------|------------------------|
| `POST` | `/api/auth/login` | Log in a user                 | No                     |
| `GET`  | `/api/auth/refresh` | Refresh access token | Yes (Requires Cookie) |

### Admin  

| Method | Endpoint                  | Description                      | Authentication Required |
|--------|--------------------------|--------------------------------|------------------------|
| `POST` | `/api/admin/register`     | Register an admin               | No                     |
| `PUT`  | `/api/admin/promote/:id`  | Promote a user to admin         | Yes (Admin only)       |
| `PUT`  | `/api/admin/kyc/:id`      | Update user KYC                 | Yes (Admin only)       |

### Users  

| Method | Endpoint        | Description               | Authentication Required |
|--------|--------------|-----------------|------------------------|
| `POST` | `/api/register` | Register a new user       | No                     |
| `GET`  | `/api/user`     | Get all users (admin only) | Yes (Admin only)       |
| `GET`  | `/api/user/:id` | Get user profile         | Yes                    |
| `PUT`  | `/api/user/:id` | Update user profile     | Yes                    |
| `DELETE` | `/api/user/:id` | Delete user account  | Yes (Owner only)       |

### Posts  

| Method | Endpoint             | Description             | Authentication Required |
|--------|---------------------|---------------------|------------------------|
| `POST` | `/api/post`          | Create a new post   | Yes                    |
| `GET`  | `/api/post`          | Get all posts       | No                     |
| `GET`  | `/api/post/:id`      | Get a post by ID    | No                     |
| `PUT`  | `/api/post/:id`      | Update a post       | Yes (Owner only)       |
| `DELETE` | `/api/post/:id`    | Delete a post       | Yes (Owner only)       |

### Post Reactions (Likes)  

| Method | Endpoint                | Description          | Authentication Required |
|--------|------------------------|------------------|------------------------|
| `PUT`  | `/api/post/react/:id`  | Like a post       | Yes                    |
| `GET`  | `/api/post/react/:id`  | Get post likes    | No                     |

### Comments  

| Method | Endpoint                     | Description                  | Authentication Required |
|--------|-----------------------------|--------------------------|------------------------|
| `POST` | `/api/post/comment/:id`     | Add a comment to a post  | Yes                    |
| `GET`  | `/api/post/comment/:id`     | Get comments on a post   | No                     |
| `PUT`  | `/api/post/comment/:id`     | Edit a comment           | Yes (Owner only)       |
| `DELETE` | `/api/post/comment/:id`   | Delete a comment         | Yes (Owner only)       |

### KYC  

| Method | Endpoint      | Description                        | Authentication Required |
|--------|------------|----------------------------|------------------------|
| `POST` | `/api/kyc` | Submit KYC verification    | Yes                    |
| `GET`  | `/api/kyc/:id` | Get KYC details       | Yes                    |
| `PUT`  | `/api/kyc/:id` | Update KYC details    | Yes                    |

## Contributing  

I welcome contributions/correction/critics to improve this project! Follow these steps to contribute:  

### 1. Fork the Repository  
Click the **Fork** button at the top right of this repository to create a copy in your GitHub account.  

### 2. Clone the Repository  
Clone the forked repository to your local machine:  
```sh
git clone https://github.com/your-username/blog-api.git
```
### 3. Create New Branch
git checkout -b feature-name

### 4. Make your changes
### 5. Commit your changes
   git add .
   git commit -m "Added feature-name"
### 6. Pus to github
   git push origin feature-name

### 7. Create a pull request
    
🎉 That's it! Thank you for contributing! 🎉








