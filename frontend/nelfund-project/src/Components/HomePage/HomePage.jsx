import NavBar from "../NavBar";
import HeroSection from "./HeroSection";
import Blog from "./Blog";
import Contact from "./Contact";
import { Linkedin, LinkedinIcon, TwitterIcon, Facebook } from "lucide-react";
import { X } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 transition-colors duration-300 flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <HeroSection />
        <Blog isSection={true} />
        <Contact isSection={true} />
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-emerald-500 mb-4">NelFund AI</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Empowering Nigerian students with instant access to loan information and application guidance.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                   <a href="https://x.com/NELFUND" className="text-lg"><TwitterIcon /></a>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                   <a href="https://www.linkedin.com/company/nigerianeducationloanfund/?originalSubdomain=ng" className="text-lg"><LinkedinIcon /></a>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                   <a href="https://web.facebook.com/Nelfundstudentloan/?_rdc=1&_rdr#" className="text-lg"><Facebook /></a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Eligibility Checker</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Loan Calculator</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Application Guide</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Legal */}
            {/* <div>
              <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Disclaimer</a></li>
              </ul>
            </div> */}

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <p className="text-slate-400 mb-4">Get the latest updates on NELFUND policies and deadlines.</p>
              <div className="flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 text-white"
                />
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 text-center text-slate-500 text-sm">
             <p>&copy; {new Date().getFullYear()} NELFUND AI. Not affiliated with the official government body.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
