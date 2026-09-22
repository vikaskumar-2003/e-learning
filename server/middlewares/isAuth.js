import { User } from "../models/user_model.js"
import jwt from "jsonwebtoken"


export const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.token

        if(!token){return res.status(403).json({
            message:"Please login"
        })}

        const deocdedData=jwt.verify(token,process.env.JWT_KEY)

        req.user=await User.findById(deocdedData._id)

        next()

    } catch (error) {
        
        res.status(500).json({
            message:"Login First"
        })

    }
}




export const isAdmin=async (req,res,next) => {
    
   try {
    if(req.user.role!=="admin"){
        return  res.status(500).json({
        message:error.message
    })
    }

    next()

   } catch (error) {
    res.status(500).json({
        message:error.message
    })
   }


}