import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { server } from "../main";
import toast, {Toaster} from "react-hot-toast"

const  UserContext=createContext()




export const UserContextProvider=({children})=>{

    const[user,setUser] = useState(null)
    const[isAuth,setIsAuth]=useState(false)
    const[btnLoading,setBtnLoading]=useState(false)
    const [loading, setLoading] = useState(true);

      async function fetchUser() {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get(`${server}/api/user/me`, {
                headers: { token }, // Or Authorization: `Bearer ${token}` depending on your backend
            });
            setUser(data.user);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
            localStorage.removeItem("token");
            setIsAuth(false);
            setUser(null);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

      



      async function loginUser(email,password,navigate){
      setBtnLoading(true)
   try {

    const{data}=await axios.post(`${server}/api/user/login`,{email,password})

    toast.success(data.message)
    localStorage.setItem("token",data.token)
    setUser(data.user)
    setIsAuth(true)
    setBtnLoading(false)
    navigate("/")
   } catch (error) {
    console.log(error);
    setBtnLoading(false)
    setIsAuth(false)
    toast.error(error.response.data.message)
   }

}


    return<UserContext.Provider value={{user,setUser,isAuth,setIsAuth,loginUser,btnLoading}} >
        {children}
        <Toaster/>
        </UserContext.Provider>
}



export const UserData=()=>useContext(UserContext)