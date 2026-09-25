import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/userContext'


const Login = () => {
 
  const navigate=useNavigate()
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const {btnLoading,loginUser} =UserData()


  const submitHandler=async(e)=>{
   
    e.preventDefault()
    await loginUser(email,password,navigate)

  }


  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

                  <label htmlFor="password">Password</label>
                  <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}  required />

                  <button disabled={btnLoading} type='submit' className="common-btn">
                    {btnLoading?"Please wait...":"Login"}
                  </button>
            </form>

            <p>Do not have account? 
                <Link to="/register">
                Singup
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Login