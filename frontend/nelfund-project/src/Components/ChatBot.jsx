import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import SideBarContainer from "./SideBarComponents/SideBarContainer";
import { useNavigate } from "react-router-dom";
import { User, Bot } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const ChatBot = () => {
  const [activeThreadId, setActiveThreadId] = useState(localStorage.getItem("active_thread_id") || uuidv4());
  const [userId, setUserId] = useState(localStorage.getItem("chat_user_id") || null);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Fetch messages for active thread
  useEffect(() => {
    if (userId && activeThreadId) {
      const fetchChatHistory = async () => {
        setLoading(true);
        try {
          const res = await fetch(`http://localhost:8000/messages/${userId}?thread_id=${activeThreadId}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
              setMessages(data.map(m => ({
                role: m.role,
                text: m.message
              })));
            } else {
              setMessages([{ role: "bot", text: "New conversation started! How can I help?" }]);
            }
          }
        } catch (err) {
          console.error("Error fetching chat history:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchChatHistory();
      localStorage.setItem("active_thread_id", activeThreadId);
    }
  }, [userId, activeThreadId]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          thread_id: activeThreadId, // Ensure thread_id is sent
          message: userMessage,
        }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (!userId && data.user_id) {
        setUserId(data.user_id);
        localStorage.setItem("chat_user_id", data.user_id);
      }

      setMessages(prev => [...prev, { role: "bot", text: data.answer }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    const newThreadId = uuidv4();
    setActiveThreadId(newThreadId);
    setMessages([{ role: "bot", text: "Hi 👋 How can I help you today?" }]);
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("chat_user_id");
      localStorage.removeItem("active_thread_id");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
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
            activeChatId={activeThreadId}
            onSelectChat={setActiveThreadId}
            onNewChat={handleNewChat}
            onDeleteChat={(id) => console.log("Delete chat:", id)}
            onLogout={handleLogout}
          />
        </div>

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setMobileSidebarOpen(false)}></div>
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border flex flex-col animate-slide-in">
              <SideBarContainer
                activeChatId={activeThreadId}
                onSelectChat={(id) => {
                  setActiveThreadId(id);
                  setMobileSidebarOpen(false);
                }}
                onNewChat={handleNewChat}
                onDeleteChat={(id) => console.log("Delete chat:", id)}
                onLogout={handleLogout}
              />
            </div>
          </>
        )}

        {/* Chat Section */}
        <div className="flex-1 flex flex-col bg-background/50 transition-colors duration-300">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`w-fit max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm shadow-sm break-words leading-relaxed ${
                  msg.role === "user" 
                    ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tr-none" 
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-none"
                }`}>
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
                className="flex-1 px-4 py-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
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
