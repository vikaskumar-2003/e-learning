import React, { useEffect, useState } from 'react'
import './coursedescription.css'
import { useNavigate, useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserData } from '../../context/userContext'
import Loader from '../../components/loading/Loading'

const CourseDescription = ({user}) => {
 
    const params=useParams()
    const{fetchCourse,course,fetchCourses,fetchMyCourse}=CourseData()

    const{fetchUser}=UserData()
    const navigate=useNavigate()
console.log("course",course);

   const[loading,setLoading]=useState(false)

    useEffect(()=>{
   
      fetchCourse(params.id)

    },[])
    
   
   const checkOutHandler=async()=>{

    const token=localStorage.getItem("token")
     setLoading(true)

     const {data:{order}}=await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
      headers:{
        token,
      }
     })

     console.log("order prices",order);
     

     const options={
      
        key: "rzp_test_TfSgNg1oXPjezR", // Enter the Key ID generated from the Dashboard
    amount: order.amount, // Amount is in currency subunits. 
    currency: "INR",
    name: "E learning", //your business name
    description: "Learn with us",
    
    order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
   
     handler:async function(response){

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;

    try {
      
     const{data}=await axios.post(`${server}/api/verfication/${params.id}`,{
      razorpay_order_id,razorpay_payment_id,razorpay_signature
     },{
      headers:{
        token,
      }
     })

     await fetchUser()
     await fetchCourses()
     await fetchMyCourse()
     toast.success(data.message)
     setLoading(false)
     navigate(`/payment-success/${razorpay_payment_id}`)
    

    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

     },

     theme:{
      color:"#8a4baf"
     }


     }

     const razorpay=new window.Razorpay(options)
    
    razorpay.open()
   }

    

  return (

  <>
{loading?<Loader/>:
    <>
    {
      course&&<div className='course-description'>

      <div className="course-header">

       <img  className='course-image' src={`${server}/${course.image}`} alt="" />

       <div className="course-info">
        <h2>{course.title}</h2>
        <p>Instructor:{course.createdBy}</p>
       </div>

      {/* <p>Let's get started with course At ₹{course.price}</p>


      {
        user&& user.subscription.includes(course._id)?<button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>
    
        Study

        </button>:<button className='common-btn'>
          Buy Now
        </button>
      } */}

      </div>

             <p>{course.description}</p>

      <p>Let's get started with course At ₹{course.price}</p>


      {
        user&& user.subscription.includes(course._id)?<button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>
    
        Study

        </button>:<button onClick={checkOutHandler} className='common-btn'>
          Buy Now
        </button>
      }

      </div>
    }
    
    </>
}
    </>

  )
}

export default CourseDescription