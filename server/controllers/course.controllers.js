import TryCatch from "../middlewares/tryCatch.js";
import { Course } from "../models/course_model.js";
import { Lecutre } from "../models/lecture.js";
import { User } from "../models/user_model.js";

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
            lectures
        })
     }


     if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({
            message:"You have not subscribed to this course"
        })
     }
 return res.json({lecture})


})