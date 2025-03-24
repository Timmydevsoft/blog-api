import express from "express"
import { promoteToAdmin, registerAnAdmin, updateUserKyc} from "../controllers/admin.controller.js"
import { verifyRole, verifyToken} from "../middleware/auth.middleware.js"

const adminRouter = express.Router()
adminRouter.route("/admin/register").post(registerAnAdmin)
adminRouter.route("/admin/promote/:id").put(verifyToken, verifyRole, promoteToAdmin)
adminRouter.route("/admin/kyc/:id").put(verifyToken, verifyRole, updateUserKyc)
export default adminRouter