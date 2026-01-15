import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import HomePage from "./Components/HomePage/HomePage";
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import DemoLoading from './Components/HomePage/DemoLoading';
import Demo from './Components/HomePage/Demo';
import ChatBot from './Components/ChatBot';
import Blog from './Components/HomePage/Blog';
import Contact from './Components/HomePage/Contact';
import Profile from './Components/Profile';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/demo-loading' element={<DemoLoading />} />
            <Route path='/demo' element={<Demo />} />
            <Route path='/chatbot' element={<ChatBot />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile />} />
            </Routes>
    </BrowserRouter>
  )
}

export default App