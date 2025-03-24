import kycModel from "../models/kyc.model.js"

const createKyc = async (req, res, next) => {
    try {
        const { region, nickName} = req.body
        if(!region || !nickName){
            return res.status(403).json({message: "All field required"})
        }
        const exisTingKYC = await kycModel.find({ownerId: req.id})
        if(exisTingKYC.length >=1){
            return res.status(403).json({message: "You can only create kyc once"})
        }
        const newKyc = new kycModel({region, nickName,  ownerId: req.id})
        await newKyc.save()
        return res.status(201).json({message: "Kyc created successful, wait for Adm1n review"})
    }
    catch (err) {
        next(err)
    }
}

const getKyc = async(req, res, next)=>{
    try{
        const{id} =req.params
        const kyc = await  kycModel.findById(id).populate({path: "ownerId", select: "userName email"})
        if(!kyc){
            return res.status(404).json({message:"Kyc not found"})
        }
        if(kyc.ownerId._id.toString() === req.id.toString()){
            
            return res.status(200).json(kyc)
        }
        return res.status(401).json({message: "You can ony check your kyc"})
        
    }
    catch(err){
        next(err)
    }
}

const updateKyc = async(req, res, next)=>{
    try{
        const{id}= req.params
        const{ region, nickName}=req.body
        if(!region || !nickName){
            return res.status(403).json({message: "All field required"})
        }
        const kyc = await kycModel.findById(id)
        if(!kyc){
            return res.status(404).json({message:"Kyc not found"})
        }
        await kycModel.findByIdAndUpdate(
            id,
            {
                $set:{
                    nickName,
                    region
                }
            },
            {new: true}
        )
        return res.status(200).json({message: "kyc updated successfully"})

    }
    catch(err){
        next(err)
    }
}
export{createKyc, getKyc, updateKyc}