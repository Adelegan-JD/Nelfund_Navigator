import React from 'react';
import NavBar from '../NavBar';
import { ArrowRight, Clock, User } from 'lucide-react';

const Blog = ({ isSection = false }) => {
  const posts = [
    {
      title: "5 Tips for a Successful Loan Application",
      excerpt: "Discover the key documents and steps you need to approve your NELFUND loan instantly.",
      image: "/student.jfif",
      category: "Featured",
      author: "Admin",
      date: "Oct 24, 2023"
    }
  ];

  return (
    <div className={`relative isolate overflow-hidden ${isSection ? 'py-24' : 'min-h-screen'} bg-transparent text-foreground flex flex-col`}>
      {!isSection && <NavBar />}
      
      {/* Background Gradient/Orb - Matching HeroSection */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-glow">
            Our Latest <span className="text-emerald-600 dark:text-emerald-400">Insights</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Stay tuned for the latest updates, scholarship tips, and financial advice for students.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {posts.map((post, index) => (
            <div key={index} className="group relative bg-white dark:bg-slate-900/50 border border-emerald-100 dark:border-emerald-500/20 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
               <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                    <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 rounded-lg shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-500" /> {post.author}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-500" /> {post.date}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <button className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-3 transition-all duration-300">
                      Read Full Article <ArrowRight size={20} />
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
