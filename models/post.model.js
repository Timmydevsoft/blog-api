import mongoose, { Schema } from "mongoose";
import { customError } from "../middleware/error.middleware.js";
const postSchema = new mongoose.Schema({
    title:{type: String, require:true, unique: true},
    text_body:{type: String, require:true},
    comments:[{type: Schema.Types.ObjectId, ref: "user"}],
    likes:[{type: Schema.Types.ObjectId, ref: "user"}],
    userId:{type: Schema.Types.ObjectId, ref: "user", required:true},
},{timestamps: true})

postSchema.pre(
    "deleteOne",
    {document: true, query: false},
    async function(next){
        try{
            const userModel = mongoose.model("user")
            const user = await userModel.findById(this.userId)
            const{posts,...others} = user
            let postIndex = posts.findIndex((item)=>item.toString() === this.userId.toString())
            posts.splice(postIndex, 1)
            await this.userId.findByIdAndUpdate(
                rest._id,
                {
                    $set:{
                        rest,
                        posts: updatedPosts
                    }
                },
                {new: true}
            )
            next()
        }
        catch(err){
            next(err)
        }
    }
)

postSchema.post(
    "save",
    async function(doc){
        try{
            const userModel = mongoose.model("user")
            const user = await userModel.findById(doc.userId)
            const{posts, rest}=user
            let updatedPosts = [...posts, doc._id]

            await this.userId.findByIdAndUpdate(
                rest._id,
                {
                    $set:{
                        rest,
                        posts: updatedPosts
                    }
                },
                {new: true}
            )
        }
        catch(err){
            return customError(500, err.message)
        }
    }
)

const postModel = new mongoose.model("post", postSchema)
export default postModel

// {
//     "userName": "user",
//     "email": "user@gmail.com",
//     "password":"pass"
// }

// {
//     "title": "Post one",
//     "text_body": "This is the body of the first post"
// }