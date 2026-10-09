import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      setIsAuth(false);
      setUser(null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function loginUser(email, password, navigate,fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse()
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }

   async function registerUser(name,email, password, navigate) {
    setBtnLoading(true);
    console.log(name,email,password);
    
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      console.log("hello",data);
      

      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
     
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
    
      setBtnLoading(false);
      
      console.log(error?.response?.data?.message);
      
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
    }
  }


  const verifyUser=async (otp,navigate) => {
    
setBtnLoading(true);

  try {
    
    const activationToken=localStorage.getItem("activationToken")
const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken
      });

       toast.success(data.message);
      
     setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/login");
    localStorage.clear();


  } catch (error) {
    
    setBtnLoading(false);
      
      console.log(error?.response?.data?.message);
      
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );


  }


  }
 



  return (
    <UserContext.Provider
      value={{ user, setUser, isAuth, setIsAuth, loginUser, btnLoading,registerUser,verifyUser,fetchUser }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
