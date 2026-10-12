import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Loader from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashboard from "./admin/dashboard/AdminDashboard";
import AdminCourses from "./admin/course/AdminCourses";
import AdminUsers from "./admin/users/AdminUsers";

const App = () => {
 
  const {isAuth,user,loading}=UserData()

    if (loading) {
    return <Loader />;
  }


  return (
  <>   
    <BrowserRouter>
      <Header isAuth={isAuth} />
     <Routes>
  <Route path="/" element={<Home />} />

  <Route
    path="/login"
    element={isAuth ? <Navigate to="/" /> : <Login />}
  />

  <Route
    path="/register"
    element={isAuth ? <Navigate to="/" /> : <Register />}
  />

  <Route
    path="/verify"
    element={isAuth ? <Navigate to="/" /> : <Verfify />}
  />

  <Route
    path="/account"
    element={isAuth ? <Account user={user} /> : <Navigate to="/login" />}
  />

  <Route path="/about" element={<About />} />

 < Route path="/courses" element={<Courses/>} />

   <Route path="/course/:id" element={isAuth?<CourseDescription user={user} />:<Login/>}/>

   <Route path='/payment-success/:id' element={isAuth?<PaymentSuccess/>:<Login/>}/>

   <Route path='/:id/dashboard' element={isAuth?<Dashboard/>:<Login/>}/>

   <Route path='/course/study/:id' element={isAuth?<CourseStudy/>:<Login/>}/>

    <Route path='/lectures/:id' element={isAuth?<Lecture user={user} />:<Login/>}/>

    <Route path="/admin/dashboard" element={isAuth?<AdminDashboard user={user}/>:<Login/>}/>

     <Route path="/admin/course" element={isAuth?<AdminCourses user={user}/>:<Login/>}/>

      <Route path="/admin/users" element={isAuth?<AdminUsers user={user}/>:<Login/>}/>


  <Route path="*" element={<ErrorPage />} />

</Routes>
      <Footer />
    </BrowserRouter>
    
    </>
  );
};

export default App;
