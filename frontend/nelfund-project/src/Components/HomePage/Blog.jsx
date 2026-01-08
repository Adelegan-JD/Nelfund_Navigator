import React from 'react';
import NavBar from '../NavBar';

const Blog = ({ isSection = false }) => {
  return (
    <div className={`${isSection ? 'py-16 ' : 'min-h-screen bg-gradient-to-br from-emerald-200/30 via-transparent to-green-300/20 dark:from-emerald-900/3'} bg-transparent text-foreground flex flex-col`}>
      {!isSection && <NavBar />}
      <div className={`flex-1 container mx-auto px-4 ${isSection ? '' : 'py-8'} flex flex-col items-center justify-center text-center`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Our Blog</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          Stay tuned for the latest updates, scholarship tips, and financial advice for students.
        </p>
        
        <div className="md:flex items-center gap-8 w-full max-w-4xl bg-card border border-border rounded-xl p-6 shadow-sm text-left">
           <img 
              src="/student.jfif" 
              alt="Student studying" 
              className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0"
           />
           <div className="flex-1 space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full">
                Featured
              </span>
              <h3 className="text-2xl font-bold">5 Tips for a Successful Loan Application</h3>
              <p className="text-muted-foreground">
                 Discover the key documents and steps you need to approve your NELFUND loan instantly.
              </p>
              <button className="text-primary font-medium hover:underline">Read More →</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
