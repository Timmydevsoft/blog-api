import mongoose, { Schema } from "mongoose"
import { customError } from "../middleware/error.middleware.js"
const kycSchema = new mongoose.Schema(
    {
        region: { type: String, require: true, required: true },
        nickName: { type: String, require: true, required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        status: { type: String, enum: ["Accepted", "Pending", "Rejected"], default: "Pending" }

    },
    { timestamps: true }
)

kycSchema.post(

    "save",
    async function (doc, req) {
        try {
            const userModel = mongoose.model("user")

            await userModel.findByIdAndUpdate(
                doc.ownerId,
                {
                    $set: {
                        kyc: doc._id
                    }
                },
                { new: true }

            )

        }
        catch (err) {
            return customError(500, err.message)
        }
    }
)

const kycModel = mongoose.model("kyc", kycSchema)
export default kycModel