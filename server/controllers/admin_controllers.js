import TryCatch from "../middlewares/tryCatch.js";
import { Course } from "../models/course_model.js";
import { Lecutre } from "../models/lecture.js";
import {rm, unlinkSync} from "node:fs"
import {promisify} from "util"
import fs from "node:fs"
import { User } from "../models/user_model.js";

export const createCourse=TryCatch(async(req,res)=>{

  const {title,description,category,createdBy,duration,price} =req.body;
  
  const image=req.file

  await Course({
    title,
    description,
    category,
    image:image?.path,
    duration,
    price,createdBy
  })

  res.status(201).json({
    message:"Cours Created Successfully"
  })


})



export const addLecture=TryCatch(async(req,res)=>{

 const course=await Course.findById(req.params.id)

 if(!course) return res.status(404).json({
  message:"No course with this id"
 })

 const {title,description}=req.body

 const lecture=await Lecutre.create({
   title,
   description,
   video:file?.path,
   course:course._id,

 })

 res.status(201).json({
  message:"lecture created",
  lecture
 })

})



export const deleteLecture=TryCatch(async(req,res)=>{


const lecture=await Lecutre.findById(req.params.id)

rm(lecture.video,()=>{
  console.log("video deleted");
  
})


await lecture.deleteOne()

res.json({
  message:"Lecture Deleted"
})

})



export const deleteCourse=TryCatch(async(req,res)=>{
  const course=await Course.findById(req.params.id)
  
    const lectures=await Lecutre.find({course:course._id})


    await Promise.all(lectures.map(async(lecture)=>{
      await unlinkSync(lecture.video)
      console.log("video deleted");
      
    }))
  

    rm(course.image,()=>{
  console.log("video deleted");
  
})


await Lecutre.find({course:req.params.id}).deleteMany()


await course.deleteOne()


await User.updateMany({},{$pull:{subscription:req.params.id}})

res.json({
  message:"course delted"
})

})



export const getAllStats=TryCatch(async(req,res)=>{
  const totalCourse=(await Course.find()).length

  const totalLectures=(await Lecutre.find()).length
 
  const totalUser=(await User.find()).length

  const stats={
    totalCourse,
    totalLectures,
    totalUser
  }

  res.json({
    stats
  })

})
