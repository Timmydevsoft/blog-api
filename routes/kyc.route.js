import express from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { createKyc, getKyc, updateKyc } from "../controllers/kyc.controller.js"
const kycRouter = express.Router()
kycRouter.route("/kyc").post(verifyToken, createKyc)
kycRouter.route("/kyc/:id").get(verifyToken, getKyc)
kycRouter.route("/kyc/:id").put(verifyToken,updateKyc)

export default kycRouter