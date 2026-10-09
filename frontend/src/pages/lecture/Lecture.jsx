import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loader from "../../components/loading/Loading";
import toast, { ToastBar } from "react-hot-toast";


const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(true);
  const [show,setShow]=useState(false)
const navigate=useNavigate()
  const[title,setTitle]=useState("")
  const [description,setDescription]=useState("")

  const[video,setVideo]=useState("")
  const[videoPreview,setVideoPreview]=useState("")
  const[btnLoading,setBtnLoading]=useState(false)

  

  const params = useParams();

  if(user && user.role !=="admin" && user.subscription.includes(params.id) ){
    return navigate("/")
  }
 
  async function fetchLectures(){
    try {
         
        console.log("token",localStorage.getItem("token"));
        

      const {data}=await axios.get(`${server}/api/lectures/${params.id}`,{
        headers:{
            token:localStorage.getItem("token")
        }
      })

      setLectures(data.lectures)
      setLoading(false)

    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }
  

  async function fetchLecture(id){
  
    try {
      setLecLoading(true)

         const {data}=await axios.get(`${server}/api/lecture/${id}`,{
        headers:{
            token:localStorage.getItem("token")
        }
      })
   
      setLecture(data.lecture)
      setLecLoading(false)


    } catch (error) {
         console.log(error);
        setLecLoading(false)
    }

  }

  


const changeVideoHandler=async(e)=>{

  const file=e.target.files[0]
  const reader=new FileReader()
 
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setVideoPreview(reader.result)
    setVideo(file)
  }

}

  
const submitHandler = async (e) => {
  e.preventDefault();

  if (!video) {
    return toast.error("Please select a video");
  }

  setBtnLoading(true);

  const myForm = new FormData();

  myForm.append("title", title);
  myForm.append("description", description);
  myForm.append("file", video);


  console.log("Selected video:", video);
console.log("FormData fields:");

for (const [key, value] of myForm.entries()) {
  console.log(key, value);
}

  try {
    const { data } = await axios.post(
      `${server}/api/course/${params.id}`,
      myForm,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    toast.success(data.message || "Lecture added successfully");

    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPreview("");
    setShow(false);

    await fetchLectures();
  } catch (error) {
    console.error(error.response?.data || error.message);

    toast.error(
      error.response?.data?.message ||
        "Failed to add lecture"
    );
  } finally {
    setBtnLoading(false);
  }
};




  const deleteHandler=async(id)=>{

     if(confirm("Are you sure you want to delete this lecture")){
      try {
        const {data}=await axios.delete(`${server}/api/lecture/${id}`,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
   
        toast.success(data.message)
        fetchLectures()

      } catch (error) {
        
      }
     }

  }

  useEffect(()=>{
   fetchLectures()
  },[])

  return <div>
  
  {loading?<Loader/>:<>
     <div className="lecture-page">

       <div className="left">

        {
          lecLoading?<Loader/>:<>
           {
            lecture.video?<>
            <video src={`${server}/${lecture.video}` } width={"50%"} controls controlsList="nodownload noremoteplayback" autoPlay >
  
            </video>

               <h1>{lecture.title}</h1>
              <h3>{lecture.description}</h3>
            </>:<h1>Please select lecture</h1>
           }
          </>
        }


       </div>
       <div className="rigth">

       {user && user.role==="admin" &&(<button onClick={()=>setShow(!show)} >
         {show?"close":`Add Lecture +`}
        </button>)}


        {

           show &&<div className="lecture-form">

            <h2>Add Lecture</h2>
            <form action="" onSubmit={submitHandler}>
              <label htmlFor="text">Title</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" required />

               <label htmlFor="text">Description</label>
              <input  value={description} onChange={(e)=>setDescription(e.target.value)}  type="text" required />

              <input onChange={changeVideoHandler} type="file" placeholder="choose file"/>
           
                {
                  videoPreview && <video src={videoPreview} alt="" width={300} controls></video>
                }

               <button disabled={btnLoading} type="submit" className="common-btn">
                {btnLoading?"Please wait...":"Add"}
                Add
               </button>

            </form>
            </div>

        }

        {
          lectures && lectures.length>0?lectures.map((e,i)=>(
            <div key={i} >
              <div onClick={()=>fetchLecture(e._id)} className={`lecture-number ${lecture._id===e._id && "active"}  `}>
                {i+1}.{e.title}
              </div>
              {
                user && user.role==="admin" && <button onClick={()=>deleteHandler(e._id)} className="common-btn"  style={{background:"red"}} >Delete {e.title}</button>
              }
            </div>
          )):<p>No Lectures Yet!</p>
        }

       </div>

     </div>
  </>}
  
  
  </div>;
};

export default Lecture;
