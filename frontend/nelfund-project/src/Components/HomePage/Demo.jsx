import { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "../NavBar"

const Demo = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi 👋 I’m NelFund AI. Ask me anything about student loans, funding, or education policies in Nigeria."
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };

    // Mock AI response
    const aiMessage = {
      role: "ai",
      content:
        "This is a demo response. Sign up to get accurate, real-time answers powered by NelFund AI."
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className=" min-h-screen bg-background flex flex-col items-center">
      <div className="w-full mb-12">
        <Navbar />
      </div>
      {/* Header */}
      <div className="max-w-2xl w-full text-center mb-6">
        <h1 className="text-3xl font-bold text-primary-foreground">
          Try NelFund AI
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask questions about student funding, loans, and education policies.
        </p>
      </div>

      {/* Chat Container */}
      <div className="max-w-2xl w-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden">

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[80%] px-4 py-2 rounded-lg text-sm break-words ${
                msg.role === "user"
                  ? "ml-auto bg-emerald-600 text-white"
                  : "mr-auto bg-gray-100 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent text-gray-900"
          />
          <button
          type="submit"
            onClick={handleSend}
            className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground mt-4">
        Demo responses are limited. Sign up for full access.
      </p>
    </div>
  );
};

export default Demo;
