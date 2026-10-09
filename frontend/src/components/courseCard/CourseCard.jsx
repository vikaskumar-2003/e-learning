import React from 'react'
import './courseCard.css'
import { server } from '../../main'
import { UserData } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CourseData } from '../../context/CourseContext'

const CourseCard = ({course}) => {
 
  const{user,isAuth}=UserData()
  const navigate=useNavigate()


   const {fetchCourses}=CourseData()

   const deleteHandler=async(id)=>{
    
    if(confirm("Are you sure you want to delete this course")){


      try {
        
        const {data}=await axios.delete(`${server}/api/course/${id}`,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
  

        console.log(data);
        

        toast.success(data.message)
        fetchCourses()

      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
      }}
    

   }


  return (
    <div className="course-card">
   <img src={`${server}/${course.image}`} className='course-image' alt="" />
<h3>{course.title}</h3>
<p>Instructor-{course.createdBy}</p>
<p>Duration-{course.duration}</p>
<p>Price-₹{course.price}</p>
{
  isAuth?(
<>
{user && user.role!=="admin"?<>

{
  user.subscription.includes(course._id)?(<button className='common-btn'
  onClick={()=>navigate(`/course/study/${course._id}`)}
>
Study
</button>):<button className='common-btn'
  onClick={()=>navigate(`/course/${course._id}`)}
>
Get started
</button>
}

</>:
<button className='common-btn' onClick={()=>navigate(`/course/study/${course._id}`)}>
Study
</button>}

</>
  ):(<button className='common-btn'
  onClick={()=>navigate(`/login/`)}
>
Get started
</button>)
}

<br/>

{

  user&&user.role==="admin" && <button style={{background:"red"}} onClick={()=>deleteHandler(course._id)} >
    Delete
  </button>
}

    </div>
  )
}

export default CourseCard