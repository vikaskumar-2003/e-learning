import React from 'react'
import {MdDashboard} from "react-icons/md"
import './account.css'
import { IoLogOut } from "react-icons/io5";
import { UserData } from '../../context/userContext';
import toast from 'react-hot-toast';

const Account = ({user}) => {

    const {setIsAuth,setUser}=UserData()

    const logoutHandler=()=>{
        localStorage.clear()
        setUser(null)
        setIsAuth(false)
        toast.success("logout sucess fully")
    }

  return (
    <div>

  {user &&( <div className="profile">
        <h2>
        My Profile 
        </h2>
        <div className="profile-info">
            <p>
                <strong>
                    Name-{user.name}
                </strong>

            </p>
    
     <p>
                <strong>
                    Email - {user.email}
                </strong>

            </p>

            <button className='common-btn'> <MdDashboard/>
DashBoard
            </button>

  
                 <button onClick={logoutHandler} style={{margin:"2px",backgroundColor:"red"}} className='common-btn'> <IoLogOut/>
Logout
            </button>

        </div>
    </div>
  )}
    </div>
  )
}

export default Account