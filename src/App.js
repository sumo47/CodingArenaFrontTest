import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import Signup from './components/signuplogin/Signup';
import Login from './components/signuplogin/Login'
import CourseList from './components/courselist/CourseList';
import Profile from './components/profile/Profile';
import { BrowserRouter, Route, Routes,Link} from 'react-router-dom';
import CourseContent from './components/coursecontent/CourseContent';
import Cart from './components/cart/Cart';
import VerifyOtp from './components/signuplogin/VerifyOtp';

import { ToastContainer } from 'react-toastify';
import Checkout from './components/cart/Checkout';
import Admin from './components/instructor/Admin';



function App() {
  
  return (
    
  <BrowserRouter>

  
<Header/>

<Routes>

  <Route path="header" element={<Header/>} />  

  <Route path="signup" element={<Signup/>} /> 
  
  <Route path="verifyotp" element={<VerifyOtp/>} /> 
   
  <Route path="login" element={<Login/>} />   

  <Route path="courselist" element={<CourseList/>} />

  <Route path="profile" element={<Profile/>} />  

  <Route path="coursecontent" element={<CourseContent/>} /> 

  <Route path="admin" element={<Admin/>} /> 
  

  

  
  <Route path="cart" element={<Cart/>} />  
  <Route path="checkout" element={<Checkout/>} />  

  

  <Route path="/" element={<Main/>} />   
  

   </Routes>
   
   
   </BrowserRouter>
  
    
  )
}

export default App
