import React from 'react'
import './paymentSuccess.css'
import { Link, useParams } from 'react-router-dom'

const PaymentSuccess = ({user}) => {

  const params=useParams()


  return (
    <div className='payment-success-page'>
      
        {user&&<div className='success-message'>
            <h2>pPayment successful</h2>
            <p>Yourcourse subscription has been activated </p>
            <p>Reference no-{params.id}</p>
            <Link to={`${user._id}/dashboard`} >
            Go to Dashboard
            </Link>
            </div>
            }
        </div>
  )
}

export default PaymentSuccess