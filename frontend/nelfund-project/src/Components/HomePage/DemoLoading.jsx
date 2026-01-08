import React from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DemoLoading = () => {
    const navigate = useNavigate()
    useEffect(()=>{
       const timer= setTimeout(()=>{
            navigate('/demo')
        },4000)
        
       return ()=> clearTimeout(timer)
    }, [navigate])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <div className="flex-1 flex justify-center items-center">
        <div className="h-20 w-20 animate-pulse bg-emerald-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default DemoLoading;
