import postModel from "../models/post.model.js"

const likePost = async(req, res, next)=>{
    try{
        const{id}= req.params
        const post = await postModel.findById(id)
        if(!post){
            return res.status(404).json({message: "Post not found"})
        }
        const{likes, ...others} = post
        let index = likes.findIndex((item)=> item.toString() == req.id.toString())

        // check if the person has already liked the post, next attempt is to unlike the post
        if(index >=0){
            // remove the person from likes array
            likes.splice(index, 1)
            await postModel.findByIdAndUpdate(
                id,
                {
                    $set:{
                        likes,
                        ...others
                    }
                },{new: true}
            )

            return res.status(200).json({message: "You successfuly unliked the post"})
        }
        // add the user to likes array since its id is not in likes array
        likes.push(req.id)
        await postModel.findByIdAndUpdate(
            id,
            {
                $set:{
                    likes,
                    ...others
                }
            },{new: true}
        )
        return res.status(200).json({message: 'You successfuly liked the post'})
    }
    catch(err){
        next(err)
    }
}

const getPostLikes = async(req, res, next)=>{
    try{
        const{id}=req.params
        const post = await postModel.findById(id).populate({path: "likes", select:"userName" })
        if(!post){
            return res.status(404).json({message: "Post not found"})
        }

        const{likes, ...others}=post

        return res.status(200).json({likes: likes.length, users: likes})
    }
    catch(err){
        next(err)
    }
}

export{likePost, getPostLikes}