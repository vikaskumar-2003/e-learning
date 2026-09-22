import express from "express"
import { gelAllCoures, getSingleCourse } from "../controllers/course.controllers.js"

const router=express.Router()

router.get("/course/all",gelAllCoures)
router.get("/course/:id",getSingleCourse)

export default router