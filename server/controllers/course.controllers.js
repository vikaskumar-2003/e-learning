import TryCatch from "../middlewares/tryCatch";
import { Course } from "../models/course_model";

export const gelAllCoures=TryCatch(async(req,res)=>{

const courses=await Course.find()

res.json({
    courses
})

 


})


export const getSingleCourse=TryCatch(async(req,res)=>{

const course=await Course.findById(req.params.id)


})