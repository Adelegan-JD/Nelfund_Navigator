import React, { useState } from "react";
import NavBar from "./NavBar";
import SideBarContainer from "./SideBarComponents/SideBarContainer";
import { useNavigate } from "react-router-dom";
import { User, Bot } from "lucide-react";

const ChatBot = () => {
  const [activeChatId, setActiveChatId] = useState(1);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "I'm processing your question. Please wait a moment." }
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    // 2 second delay before logout
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">

      {/* Navbar */}
      <NavBar>
        <button
          className="md:hidden px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:opacity-90 transition"
          onClick={() => setMobileSidebarOpen(true)}
        >
          ☰
        </button>
      </NavBar>

      <div className="flex flex-1 overflow-hidden relative">

        {/* Desktop Sidebar */}
        <div className="hidden md:flex">
          <SideBarContainer
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
            onNewChat={() => {
              const newId = messages.length + 1;
              setActiveChatId(newId);
              setMessages(prev => [...prev, { role: "bot", text: "New chat started!" }]);
            }}
            onDeleteChat={(id) => console.log("Delete chat:", id)}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Sidebar Slide-in */}
        {isMobileSidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMobileSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col animate-slide-in">
              <SideBarContainer
                activeChatId={activeChatId}
                onSelectChat={(id) => {
                  setActiveChatId(id);
                  setMobileSidebarOpen(false);
                }}
                onNewChat={() => console.log("New chat")}
                onDeleteChat={(id) => console.log("Delete chat:", id)}
                onLogout={handleLogout}
              />
            </div>
          </>
        )}

        {/* Chat Section */}
        <div className="flex-1 flex flex-col bg-background/50 transition-colors duration-300">

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 animate-fade-in ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`w-fit max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm break-words leading-relaxed
                    ${
                      msg.role === "user"
                        ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tr-none"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                   <Bot size={20} />
                </div>
                <div className="w-fit px-4 py-3 rounded-2xl rounded-tl-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm animate-pulse text-foreground">
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-4 bg-background">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-6 py-3 text-sm font-medium rounded-lg bg-primary text-white hover:opacity-90 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatBot;
