import sendMail from "../middlewares/sendMail.js"
import { User } from "../models/user_model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import TryCatch from "../middlewares/tryCatch.js"

export const register=TryCatch(async(req,res)=>{
    
    const{name,email,password}=req.body

    console.log(req.body);
    

    if(!name||!email||!password){
        return res.status(400).json({
            message:"all field are require"        })
    }


    let user=await User.findOne({email})
 
    if(user){
 return res.status(400).json({
    message:"User Already Exist"
 })
    }

    const hashPassword=await bcrypt.hash(password,10)
    console.log(hashPassword);
    

    user={
        name,
        email,
        password:hashPassword
    }


    const otp= Math.floor(100000+Math.random()*900000)
    const activationToken = jwt.sign(
    {
        name,
        email,
        password: hashPassword,
        otp
    },
    process.env.JWT_KEY,
    { expiresIn: "10m" }
);

   const data={name,otp}

   await sendMail(email,"E learning",data)

   res.status(200).json({
    message:"Otp send to your mail",
    activationToken
   })

})


export const verifyUser=TryCatch(async(req,res)=>{

     console.log("hiiiiiiii my verfiy");
     

    const{otp,activationToken}=req.body
   console.log(activationToken);
   
    const verify=jwt.verify(activationToken,process.env.JWT_KEY)
    console.log(verify.name,verify.password,verify.email);

   if(!verify){
    return res.status(400).json({
        message:"Otp Expired"
    })
   }

  if(verify.otp!==Number(otp)){
    return res.status(400).json({
        message:"wrong otp"
    })
  }


  

  await User.create({
    name:verify.name,
    email:verify.email,
    password:verify.password
  })

  return res.status(201).json({
    message:"user created"
  })


})



export const loginUser=TryCatch(async(req,res)=>{

   
    
     const {email,password}=req.body

     const user=await User.findOne({email})

     if(!user){
  return res.status(400).json({
    message:"User not found"
    })
     }

     const matchPassword=await bcrypt.compare(password,user.password)

     if(!matchPassword){
        return res.status(400).json({
            message:"wrong password"
        })
     }
  
     const _id=user._id

    const token= jwt.sign({_id},process.env.JWT_KEY,{expiresIn:"15d"})

    res.status(200).json({
        message:`welcome  back ${user.name}`,
        token,user
    })
   

})



export const myProfile=TryCatch(async(req,res)=>{
    
    const user=await User.findById(req.user._id)
 
    res.json({
        user
    })
        

})