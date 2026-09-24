import express from "express"
import { checkOut, fetchLecture, fetchLectures, gelAllCoures, getMyCourse, getSingleCourse } from "../controllers/course.controllers.js"
import { isAuth } from "../middlewares/isAuth.js"

const router=express.Router()

router.get("/course/all",gelAllCoures)
router.get("/mycourse",isAuth,getMyCourse)

router.post('/course/checkout/:id',isAuth,checkOut)

router.get("/course/:id",getSingleCourse)
router.get("/lectures/:id",fetchLectures)
router.get("/lecture/:id",fetchLecture)

export default router