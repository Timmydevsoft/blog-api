import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const userSchema = new mongoose.Schema({
    userName:{type: String, required:true, unique: true},
    email:{type: String, required:true},
    kyc:{type: Schema.Types.ObjectId, ref:"kyc"},
    role:{type: String, enum:[process.env.USERHASHEDCODE, process.env.ADMINHASHEDCODE], default:process.env.USERHASHEDCODE  ,required:true},
    password:{type: String, require:true},
    posts:[{
        postId:{type: Schema.Types.ObjectId, ref: "post"}
    }],
    kyc:{type: Schema.Types.ObjectId, ref: "kyc"}
},{timestamps: true})

userSchema.pre(
    "deleteOne",
    {document: true, query: false},
    async function(next){
        try{
            // const kycModel = mongoose.model("kyc")
            const postModel = mongoose.model("post")
            const commentModel = mongoose.model("comment")
            await kycModel.deleteOne({ownerId: this._id})
            await commentModel.deleteMany({author: this._id})
            await postModel.deleteMany({userId: this._id})
            await postModel.updateMany(
                {comments: this._id},
                {
                    $pull:{
                        comments: this._id
                    }
                }
            )
            
            next()
        }
        catch(err){
            next(err)
        }
    }
)



const userModel = new mongoose.model("user", userSchema)
export default userModel