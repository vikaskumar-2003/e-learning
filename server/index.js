import dotenv from "dotenv"
dotenv.config({
    quiet:true
})

import express, { json } from "express"
import userRoutes from "./routes/user_routes.js"
import courseRoutes from "./routes/course_routes.js"
import adminRoutes from "./routes/admin_routes.js"
import { connectDB } from "./database/db.js"
import Razorpay from "razorpay"
import cors from "cors"


const app=express()


export const instance=new Razorpay({
    key_id:process.env.VISA_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})

app.use(express.json())
app.use(cors())


app.use("/api",userRoutes)
app.use("/api",courseRoutes)
app.use("/api",adminRoutes)

const port=5000




 app.listen(port,()=>{
        connectDB()
    console.log("servr is running",port);

 })