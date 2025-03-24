import express from "express"
import { createPost, getAllPost, getPostById, deletePost, updatePost } from "../controllers/post.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { getPostLikes, likePost } from "../controllers/like.controller.js"
import { AddComment, deleteComment, editComment, getPostComments } from "../controllers/comment.controller.js"


const postRouter = express.Router()
postRouter.route("/post").post(verifyToken, createPost)
postRouter.route("/post").get(verifyToken, getAllPost)

postRouter.route("/post/:id").get(verifyToken, getPostById)// id is the id of the post
postRouter.route("/post/:id").put(verifyToken,  updatePost)// id is the id of the post
postRouter.route("/post/:id").delete(verifyToken, deletePost)// id is the id of the post

// liking post route
postRouter.route("/post/react/:id").put(verifyToken, likePost) //id is the id of the post
postRouter.route("/post/react/:id").get(verifyToken, getPostLikes)

// comments routes
postRouter.route("/post/comment/:id").post(verifyToken, AddComment) // id is the id of the post
postRouter.route("/post/comment/:id").get(verifyToken, getPostComments) // id id the id of the post
postRouter.route("/post/comment/:id").put(verifyToken, editComment) // id is the object id of the comment
postRouter.route("/post/comment/:id").delete(verifyToken, deleteComment) //id is the object id of the comment



export default postRouter
