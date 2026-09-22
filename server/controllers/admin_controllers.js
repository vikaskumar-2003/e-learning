import TryCatch from "../middlewares/tryCatch.js";
import { Course } from "../models/course_model.js";
import { Lecutre } from "../models/lecture.js";

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


