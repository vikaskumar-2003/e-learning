import React, { useEffect } from 'react'
import "./coursestudy.css"
import {Link, useParams} from "react-router-dom"
import { CourseData } from '../../context/CourseContext'
import { useNavigate } from 'react-router-dom'
import { server } from '../../main'


const CourseStudy = ({user}) => {

 const param=useParams()
 const navigate=useNavigate()

 const {fetchCourse,course}=CourseData()

 if(user && user.role!=="admin" &&!user.subscription.includes(param.id)){
    return  navigate("/")
 }



 useEffect(()=>{
    fetchCourse(param.id)
 },[])

  return (
    <div>

      {
course&&<div className='course-study-page'>

   <img src={`${server}/${course.image}`} alt="" width={350}/>
    <h2>{course.title}</h2>
    <h4>{course.description}</h4>
    <h5>by-{course.createdBy}</h5>
    <h5>Duration - {course.duration} weeks </h5>
    <Link to={`/lectures/${course._id}`}>Lectures</Link>

</div>
      }

    </div>
  )
}

export default CourseStudy