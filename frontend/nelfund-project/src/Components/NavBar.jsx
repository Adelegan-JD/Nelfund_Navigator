import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle"; // import your theme toggle

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check login state on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Handle navigation
  const handleNav = (route) => {
    navigate(route);
    setIsMenuOpen(false); // Close menu on navigation
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/"); // Redirect home
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center p-4 bg-emerald-600 text-white shadow-md">
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer flex items-center gap-2"
        onClick={() => handleNav("/")}
      >
        <GraduationCap size={32} />
        NelFund AI
      </div>

      {/* Desktop Nav items */}
      <nav className="hidden md:flex gap-6 items-center font-medium">
        <button onClick={() => handleNav("/")} className="hover:text-emerald-100 transition-colors">Home</button>

        {!isLoggedIn && (
          <>
            <button onClick={() => handleNav("/login")} className="hover:text-emerald-100 transition-colors">Login</button>
            <button onClick={() => handleNav("/signup")} className="hover:text-emerald-100 transition-colors">SignUp</button>
          </>
        )}

        {isLoggedIn && (
          <>
            <button onClick={() => handleNav("/chatbot")} className="hover:text-emerald-100 transition-colors">Chat</button>
            <button onClick={() => handleNav("/profile")} className="hover:text-emerald-100 transition-colors">Profile</button>
            <button onClick={handleLogout} className="hover:text-emerald-100 transition-colors">Logout</button>
          </>
        )}

        <button onClick={() => handleNav("/contact")} className="hover:text-emerald-100 transition-colors">Contact</button>
        <button onClick={() => handleNav("/blog")} className="hover:text-emerald-100 transition-colors">Blog</button>
        
        {/* Theme Toggle Desktop */}
        <div className="ml-2">
           <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden">
         <ThemeToggle />
         <button onClick={toggleMenu} className="focus:outline-none">
           {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
         </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-emerald-700 shadow-xl flex flex-col items-center py-6 gap-6 md:hidden z-50">
            <button onClick={() => handleNav("/")} className="text-lg font-medium hover:text-emerald-200">Home</button>
            
            {!isLoggedIn && (
              <>
                <button onClick={() => handleNav("/login")} className="text-lg font-medium hover:text-emerald-200">Login</button>
                 <button onClick={() => handleNav("/signup")} className="text-lg font-medium hover:text-emerald-200">SignUp</button>
              </>
            )}

            {isLoggedIn && (
              <>
                 <button onClick={() => handleNav("/chatbot")} className="text-lg font-medium hover:text-emerald-200">Chat</button>
                 <button onClick={() => handleNav("/profile")} className="text-lg font-medium hover:text-emerald-200">Profile</button>
                 <button onClick={handleLogout} className="text-lg font-medium hover:text-emerald-200">Logout</button>
              </>
            )}

            <button onClick={() => handleNav("/contact")} className="text-lg font-medium hover:text-emerald-200">Contact</button>
            <button onClick={() => handleNav("/blog")} className="text-lg font-medium hover:text-emerald-200">Blog</button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
