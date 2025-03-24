import userModel from "../models/user.model.js"
import kycModel from "../models/kyc.model.js"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const registerAnAdmin = async(req, res, next)=>{
    try{
        const{userName, email, password} = req.body
        if(!userName || !email || !password){
          return res.status(403).json({message: "All field are mandatory"})
        }
    
        const existingUser = await userModel.findOne({email})
        if(existingUser){
          return res.status(403).json({message: "Email has already been taken"})
        }
        
        let hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = new userModel({userName, email, password: hashedPassword, role: process.env.ADMINHASHEDCODE})
        await newUser.save()
        return res.status(201).json({message: "Account created successful"})
      }
      catch(err){
        next(err)
      }
}
const promoteToAdmin = async(req, res, next)=>{
    try{
        const {id} = req.params

        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).json({message: "User does not exist"})
        }
        const{role, userName, ...others}= user
        await userModel.findByIdAndUpdate(
            id,
            {
                $set:{role: process.env.ADMINHASHEDCODE, others}
            },
            {new: true}
        )
        return res.status(200).json({message: `${userName} is now an admin`})
    }
    catch(err){
        next(err)
    }
}

const updateUserKyc = async(req, res, next)=>{
    try{
        const{status}=req.body
        if(!status){
            return res.status(403).json({message: "Status must not be empty"})
        }
        const{id}=req.params
        const userWithKycRecord = await userModel.find({kyc: id})
        if(userWithKycRecord.length < 1){
            return res.status(404).json({mesage: "User does not have kyc record"})
        }
        const validStatus = process.env.KYCVALIDSTATUS.split(" ")
        if( !validStatus.includes(status)){
            return res.status(403).json({message: "Invalid status"})
        }
        await kycModel.findByIdAndUpdate(
            id,
            {
                $set:{
                    status: status
                }
            },
            {new: true}
        )
        res.status(200).json({message: `KYC status update for ${userWithKycRecord[0].userName} successful`})

    }
    catch(err){
        next(err)
    }
}

export{registerAnAdmin , promoteToAdmin, updateUserKyc}