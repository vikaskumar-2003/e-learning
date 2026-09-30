import React from 'react'
import './courseCard.css'
import { server } from '../../main'
import { UserData } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({course}) => {
 
  const{user,isAuth}=UserData()
  const navigate=useNavigate()

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

  user&&user.role==="admin" && <button style={{background:"red"}}>
    Delete
  </button>
}

    </div>
  )
}

export default CourseCard