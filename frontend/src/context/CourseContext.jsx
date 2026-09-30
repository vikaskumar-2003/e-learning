import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext=createContext()



export const CourseContextProvide=({children})=>{
  
    const[courses,setCourse]=useState([])
     const[course,setCors]=useState([])
    const [mycourse,setMyCourse]=useState([])


    async function fetchCourses(){

     try {
        const{data}=await axios.get(`${server}/api/course/all`)
        console.log(data);
        
        setCourse(data.courses)
     } catch (error) {
        console.log(error);
        
     }

    }
    
    async function fetchCourse(id){

    try {
       const {data} =await axios.get(`${server}/api/course/${id}`)
        console.log("dtaa",data);
        
       setCors(data.course)
    } catch (error) {
        console.log(error);
        
    }


    }

    async function fetchMyCourse(){

     try {
        const {data}=await axios.get(`${server}/api/mycourse`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
console.log("my course data",data);

       setMyCourse(data.courses)

     } catch (error) {
        console.log(error);
        
     }

    }

    useEffect(()=>{
        fetchCourses()
        fetchMyCourse()
    },[])

    return(
    <CourseContext.Provider value={{courses,fetchCourses,fetchCourse,course,fetchMyCourse,mycourse}} >
        {children}
    </CourseContext.Provider>)
}

export const CourseData = () => {
  return useContext(CourseContext);
};