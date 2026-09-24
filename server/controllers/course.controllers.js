import { instance } from "../index.js";
import TryCatch from "../middlewares/tryCatch.js";
import { Course } from "../models/course_model.js";
import { Lecutre } from "../models/lecture.js";
import { Payment } from "../models/payment.js";
import { User } from "../models/user_model.js";
import crypto from "crypto"

export const gelAllCoures=TryCatch(async(req,res)=>{

const courses=await Course.find()

res.json({
    courses
})

 


})


export const getSingleCourse=TryCatch(async(req,res)=>{

const course=await Course.findById(req.params.id)
 
res.json({
    course
})


})


export const fetchLectures=TryCatch(async(req,res)=>{
    const lectures=await Lecutre.find({course:req.params.id})

    const user=await User.findById(req.user._id)

     if(user.role==="admin"){
        return res.json({
            lectures
        })
     }


     if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"You have not subscribed to this course"
        })
     }
 return res.json({lectures})


})




export const fetchLecture=TryCatch(async(req,res)=>{
    const lecture=await Lecutre.findById(req.params.id)

    const user=await User.findById(req.user._id)

     if(user.role==="admin"){
        return res.json({
            lecture
        })
     }


     if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"You have not subscribed to this course"
        })
     }
 return res.json({lecture})


})


export const getMyCourse=TryCatch(async (req,res) => {
    
  const courses=await Course.find({_id:req.user.subscription})

   res.json({
    courses
   })

})


export const checkOut=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)

    const course=await Course.findById(req.params.id)

    if(user.subscription.includes(course._id)){
        return res.status(400).json({
            message:"You already have this course"
        })
    }

    const options={
        amount:Number(course.price*10),
        currency:"INR"
    }

    const order=await instance.orders.create(options)

    res.status(201).json({
        order,
        course,

    })


})



export const paymentVerification=TryCatch(async(req,res)=>{

   const{razorpay_order_id,razorpay_payment_id,razorpay_signature} =req.body

     const body=razorpay_order_id + " " + razorpay_payment_id

     const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET).update(body).digest("hex")

     const isAuthentic=expectedSignature===razorpay_signature

     if(isAuthentic){
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      }) 
    
      const user=await User.findById(req.user._id)

      const course=await Course.findById(req.params.id)

   user.subscription.push(course._id)

   await user.save()

   res.status(200).json({
    message:"Course Purachsed Sucessfully"
   })

     }else{
        return res.status(400).json({
            message:"Payment failed"
        })
     }

})