import commentModel from "../models/comment.model.js"
import postModel from "../models/post.model.js"

const AddComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { text } = req.body
        if (!text) {
            return res.status(400).json({ message: "Empty comment cann't be added" })
        }
        const post = await postModel.findById(id)
        if (!post) {
            return res.status(404).json({ message: "Such post does not exist" })
        }
        const { comments, userId, ...others } = post
        let commentIndex = comments.findIndex((item) => item.toString() === req.id.toString())

        // check if the user has not comented on the post before
        if (commentIndex < 0) {
            comments.push(req.id)
            const anotherCpomment = new commentModel({ post: id, author: req.id, text: text })
            await anotherCpomment.save()
            await postModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        comments,
                        userId,
                        ...others
                    }
                }
            )
            return res.status(201).json({ message: "Comment added successfully" })
        }

        const addNewComment = new commentModel({ post: id, author: req.id, text: text })
        await addNewComment.save()
        return res.status(200).json({ message: "Successful" })

    }
    catch (err) {
        next(err)
    }
}

const getPostComments = async (req, res, next) => {
    try {

        // This is the post id
        const{id}=req.params
        const post = await postModel.findById(id)
        if(!post){
            return res.status(404).json({message: "No such post, so it can't have a comment"})
        }
        const comments = await commentModel.find({post: id}).populate({path: "author", select: "userName"})
        return res.status(200).json(comments)
    }
    catch (err) {
        next(err)
    }
}

const editComment = async (req, res, next) => {
    try {
        // The id is the object _id of the comment
        const { id } = req.params
        
        if (!req.body.text) {
            return res.status(403).json({ message: "Comment text can't be empty" })
        }
        const comment = await commentModel.findById(id)
        if (!comment) {
        }

        const { text, author, ...rest } = comment
        console.log(req.id," author:", author)

        if(req.id.toString() !== author.toString()){
            return res.status(401).json({message: "You can only edit your own comment"})
        }

        await commentModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    text: req.body.text
                }
            }, { new: true }
        )

        return res.status(200).json({ message: "Comment edited successfully" })
    }
    catch (err) {
        next(err)
    }

}


const deleteComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await commentModel.findById(id)

        // first check if the comment exist
        if (!comment) {
            return res.status(404).json({ message: "No such comment" })
        }
        const { post, author, ...rest } = comment
        // check if the user has more than one comment

        const usersComments = await commentModel.find({ post, author })

        if (usersComments.length > 1) {
            await commentModel.findByIdAndDelete(id)
            return res.status(200).json({ message: "Comment deleted successful" })

        }

        const refrencedPost = await postModel.find({ _id: post })
        if (!refrencedPost) {
            return res.status(404).json({ message: "No post with such comment" })
        }

        const { _id, comments, ...others } = refrencedPost[0]
        const index = comments.findIndex((item) => item.toString() === author.toString())
        comments.splice(index, 1)
        await commentModel.findByIdAndDelete(id)
        await postModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    comments,
                    ...others
                }
            }
        )
        return res.status(200).json({ message: "Comment deleted successful" })
    }
    catch (err) {
        next(err)
    }
}

export { AddComment, editComment, deleteComment, getPostComments }