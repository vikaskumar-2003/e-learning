import React from 'react'
import './footer.css'
import {AiFillFacebook,AiFillTwitterSquare,AiFillInstagram} from "react-icons/ai"

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 your E-Learning Platform.All rights resrved.<br/>
          Made with 💌 <a href="">Vikas Kumar</a>
        </p>
        <div className="scoal-links">
          <a href="">
            <AiFillFacebook/>
          </a>
          <a href="">
          <AiFillTwitterSquare/>
          </a>
          <a href="">
           <AiFillInstagram/>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer