import handleError from "../middleware/error.middleware.js";
import postModel from "../models/post.model.js";
import bcrypt from "bcrypt"
const createPost = async (req, res, next) => {
  try {
    const { title, text_body } = req.body
    if (!title || !text_body) {
      return res.status(403).json({ message: "Title and text_body required" })
    }
    const newPost = new postModel({ title, text_body, userId: req.id })
    await newPost.save()
    return res.status(201).json({ message: "Posts created successful" })
  }
  catch (err) {
    next(err)
  }
}

const getAllPost = async (req, res, next) => {
  try {
    const posts = await postModel.find()
    if (posts.length === 0) {
      return res.status(404).message({ message: "No available post for now" })
    }
    return res.status(200).json(posts)
  }
  catch (err) {
    next(err)
  }
}

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    const uniquePost = await postModel.findById(id)
    if (!uniquePost) {
      return res.status(404).json({ message: "No such post" })
    }
    return res.status(200).json(uniquePost)

  }
  catch (err) {
    next(err)
  }
}


const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const{title, text_body} = req.body

    if(!title || !text_body){
      return res.status(403).json({message: "title and text_body required"})
    }

    const uniquePost = await postModel.findById(id)
    if (!uniquePost) {
      return res.status(404).json({ message: "No such post" })
    }

    if (uniquePost.userId.toString() !== req.id.toString()) {
      // Only the owner of the post can update it even the admin can't
      return res.status(401).json({ message: "You can't update post that's not yours" })
    }
    await postModel.findByIdAndUpdate(req.params.id, {
      $set: {
        title,
        text_body
      },
    }, { new: true })
    return res.status(200).json({ message: "successful" })
  }
  catch (err) {
    next(err)
  }
}
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params
    const availablePost = await postModel.findById(id)
    if (!availablePost){
      return res.status(400).json({ message: "No such post" })
    }
    const isAdmin = bcrypt.compareSync(req.role, req.process.ADMINCODE)
    
    // The role of user trying to delete a post is verified here
    if(!isAdmin){
      if(availablePost.userId.toString() !== req.id.toString()){
        return res.status(401).json({message: "You can only delete your post"})
      }
      // Only admin can delete anay post
      await postModel.findByIdAndDelete(id)
      return res.status(200).json({ message: "Deleted successfully" })
    }

    await postModel.findByIdAndDelete(id)
    return res.status(200).json({ message: "Deleted successfully" })

  }

  catch (err) {
    next(err)
  }
}
export { createPost, getAllPost, getPostById, deletePost, updatePost }