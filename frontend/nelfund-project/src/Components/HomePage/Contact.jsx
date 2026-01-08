import React, { useState } from 'react';
import NavBar from '../NavBar';

const Contact = ({ isSection = false }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (Demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`${isSection ? 'py-16 ' : 'min-h-screen bg-gradient-to-br from-emerald-200/30 via-transparent to-green-300/20 dark:from-emerald-900/3'} bg-transparent text-foreground flex flex-col  `}>
      {!isSection && <NavBar />}
      <div className={`flex-1 container mx-auto px-4 ${isSection ? '' : 'py-8'} flex flex-col items-center`}>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Contact Us</h1>
        <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you today?"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary h-32"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-lg hover:shadow-emerald-500/30"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
