import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/headers/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verfify from "./pages/auth/Verfify";
import Footer from "./components/footers/footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/userContext";
import ErrorPage from "./pages/error/ErrorPage";

const App = () => {
 
  const {isAuth,user}=UserData()

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuth?<Home/>:<Login />} />
        <Route path="/account" element={isAuth?<Account user={user} />:<Login/>} />
        <Route path="/register" element={isAuth?<Home/>:<Register />} />
        <Route path="/verfiy" element={isAuth?<Home/>:<Verfify />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
