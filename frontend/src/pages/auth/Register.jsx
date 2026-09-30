import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/userContext'


const Register = () => {

  const[name,setName]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")

const navigate=useNavigate()

const{registerUser,btnLoading}=UserData()

async function registerHandler(e){

e.preventDefault()
await registerUser(name,email,password,navigate)

}

  return (
    <div className="auth-page">
        <div className="auth-form">
            <h2>Regsiter</h2>
            <form onSubmit={registerHandler} action="">
                <label htmlFor="email">Email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

                   <label htmlFor="name">Name</label>
                  <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />

                  <label htmlFor="password">Password</label>
                  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

                  <button type='submit' disabled={btnLoading} className="common-btn">
                    {btnLoading?"please wait":"Regsiter"}
                  </button>
            </form>

            <p>Already have an account?
                <Link to="/login">
                Login
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Register