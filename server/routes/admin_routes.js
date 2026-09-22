import express from "express"
import { addLecture, createCourse } from "../controllers/admin_controllers.js"
import { isAdmin, isAuth } from "../middlewares/isAuth.js"
import { uploadFiles } from "../middlewares/multer.js"

const router=express.Router()

router.post('/course/new',isAuth,isAdmin,uploadFiles,createCourse)//run both these routes om postman leecture 6
router.post("/course/:id",isAuth,isAdmin,uploadFiles,addLecture)//lecture 7



export default router