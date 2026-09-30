import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/userContext'

const Verfify = () => {

 const {verifyUser,btnLoading}=UserData()
const navigate=useNavigate()
 const [otp,setOtp]=useState("")

 async function verifyHandler(e){
    e.preventDefault()
   await verifyUser(otp,navigate)
 }


  return (
   <div className="auth-page">
    <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={verifyHandler} action="">
            <label htmlFor="otp">Otp</label>
            <input value={otp}  onChange={(e)=>setOtp(e.target.value)} type="number" required />
            <button disabled={btnLoading} type='submit' className='common-btn' >{btnLoading?"Please wait":"Verify"}</button>
        </form>
        <p>
            Go to <Link to={"/login"}>Login</Link>  Page
        </p>
    </div>
   </div>
  )
}

export default Verfify