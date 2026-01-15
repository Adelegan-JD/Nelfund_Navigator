import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  Users, 
  Clock, 
  Building2, 
  Calculator, 
  FileText, 
  CheckCircle,
  MessageSquare
} from "lucide-react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const HeroSection = () => {
  const [demoLoading, setDemoLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "profiles", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().name) {
            setUserName(docSnap.data().name);
          } else {
             setUserName(user.displayName || user.email?.split('@')[0] || "");
          }
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  function handleDemo() {
    setDemoLoading(true);
    setTimeout(() => {
      navigate("/demo-loading");
    }, 1200);
  }

  return (
    <div className="relative isolate overflow-hidden">
        {/* Background Gradient/Orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 pt-12 pb-24 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Content */}
            <div className="space-y-8 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/30 bg-gray-100 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-300 text-sm font-medium animate-fade-in shadow-sm">
                <Sparkles size={16} />
                <span>{userName ? `Welcome back, ${userName}!` : "Trusted by 10,000+ Students"}</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
                  Your Path to <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent text-glow">
                    University Funding
                  </span> <br />
                  Starts Here
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Get instant, accurate answers about NELFUND student loans. Know if you qualify, what documents you need, and how to apply. All in one place.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleDemo}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transform hover:-translate-y-1"
                >
                  {demoLoading ? "Loading..." : "Check Your Eligibility"}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-gray-300 dark:border-slate-700 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-slate-800 dark:hover:text-white text-foreground font-medium transition-all"
                >
                   <PlayCircle size={20} />
                   Watch How It Works
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200 dark:border-slate-800">
                 <div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                       <Building2 size={24} />
                       <span className="text-2xl font-bold">170+</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Universities Covered</p>
                 </div>
                 <div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                       <Users size={24} />
                       <span className="text-2xl font-bold">10K+</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Students Helped</p>
                 </div>
                 <div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                       <Clock size={24} />
                       <span className="text-2xl font-bold">24/7</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Instant Support</p>
                 </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Visual Demo */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none perspective-1000">
               
               {/* Background Image Layer */}
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/30 to-slate-900/30 rounded-3xl -z-20 transform rotate-3 scale-105 opacity-50" />
               
               <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float group bg-white dark:bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                  
                  {/* Image Background - Clearly Visible */}
                  <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('/nelfund.jpg')" }} />
                  <div className="absolute inset-0 z-0 bg-white/10 dark:bg-slate-900/70" /> {/* Overlay adaptation */}

                  {/* Chat Interface Preview */}
                  <div className="relative z-10 m-4 sm:m-8 bg-black dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
                     {/* Chat Header */}
                     <div className="bg-emerald-600 px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                           <span className="text-white font-medium text-sm">NELFUND Assistant</span>
                        </div>
                        <MessageSquare size={16} className="text-white/80" />
                     </div>

                     {/* Chat Body */}
                     <div className="p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
                        {/* User Msg */}
                        <div className="flex justify-end">
                           <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[85%] shadow-sm">
                              Am I eligible for NELFUND if my parents earn ₦80,000/month?
                           </div>
                        </div>
                         {/* Bot Msg */}
                        <div className="flex justify-start">
                           <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm max-w-[90%] shadow-sm border border-gray-200 dark:border-slate-700">
                              <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                                 <CheckCircle size={14} /> Eligible!
                              </p>
                              Yes, you qualify! The income threshold is ₦1,500,000 per annum. Your family income (₦960k/year) is within the range.
                           </div>
                        </div>
                     </div>

                     {/* Chat Input Placeholder */}
                     <div className="px-4 py-3 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
                        <div className="h-10 bg-white dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-700 w-full flex items-center px-4 text-gray-400 dark:text-slate-500 text-sm select-none">
                           Ask a question...
                        </div>
                     </div>
                  </div>

                  {/* Floating Feature Cards */}
                  {/* Card 1: Calculator */}
                  <div className="hidden md:flex absolute -right-8 top-12 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-slate-700 items-center gap-3 animate-fade-in-delay-1 w-48">
                     <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Calculator size={20} />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Repayment</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Plan your finances</p>
                     </div>
                  </div>

                   {/* Card 2: Checklist */}
                  <div className="hidden md:flex absolute -left-8 bottom-24 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-slate-700 items-center gap-3 animate-fade-in-delay-2 w-52">
                     <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                        <FileText size={20} />
                     </div>
                     <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Documents</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Know what you need</p>
                     </div>
                  </div>

                  {/* Success Story Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-full py-2 px-4 shadow-xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-3 whitespace-nowrap animate-fade-in-delay-3">
                     <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        BO
                     </div>
                     <div className="text-left">
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1">
                           <CheckCircle size={10} className="text-emerald-500" /> Funded
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400">Medicine @ UNILAG</p>
                     </div>
                  </div>

               </div>
            </div>

          </div>
        </div>

        {/* Premium Trust Bar */}
        <div className="border-t border-gray-200 dbg-white/40 backdrop-blur-md">
           <div className="container mx-auto px-4 py-8">
              <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">Trusted by students from top institutions</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Simulate Logos with Text for now */}
                 <span className="text-2xl font-serif font-yellow text-slate-700">UNILAG</span>
                 <span className="text-2xl font-serif font-black text-slate-700">OAU</span>
                 <span className="text-2xl font-serif font-black text-slate-700">UNIBEN</span>
                 <span className="text-2xl font-serif font-black text-slate-700 ">ABU ZARIA</span>
                 <span className="text-2xl font-serif font-black text-slate-700 ">UI</span>
                 <span className="text-2xl font-serif font-black text-slate-700">UNN</span>
              </div>
           </div>
        </div>

      </div>
  );
};

export default HeroSection;
