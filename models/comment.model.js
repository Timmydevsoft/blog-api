import mongoose, {Schema} from "mongoose"

const commentSchema = new mongoose.Schema(
    {
        post:{type: Schema.Types.ObjectId, ref: "post", required:true},
        author:{type: Schema.Types.ObjectId, ref: "user", required:true},// this  is the person making the comment
        text:{type: String,  required:true},
        likes:[{type: Schema.Types.ObjectId, ref: "user"}]
    },{timestamps: true}
)

const commentModel = new mongoose.model("comment", commentSchema)
export default commentModel