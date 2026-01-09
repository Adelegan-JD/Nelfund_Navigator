import React, { useState, useEffect } from "react";

const groupChatsByDate = (chats) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  return chats.reduce((groups, chat) => {
    const chatDate = new Date(chat.createdAt);
    let label = "Older";
    if (chatDate.toDateString() === today.toDateString()) label = "Today";
    else if (chatDate.toDateString() === yesterday.toDateString()) label = "Yesterday";

    if (!groups[label]) groups[label] = [];
    groups[label].push(chat);
    return groups;
  }, {});
};

const ChatHistory = ({ activeChatId, onSelectChat, onNewChat, onDeleteChat, onLogout }) => {
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("chat_user_id");

  useEffect(() => {
    if (userId) {
      const fetchThreads = async () => {
        try {
          const res = await fetch(`http://localhost:8000/threads/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setChats(data);
          }
        } catch (err) {
          console.error("Error fetching threads:", err);
        }
      };
      fetchThreads();
      
      // Poll for updates every 10 seconds (basic sync)
      const interval = setInterval(fetchThreads, 10000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="flex flex-col h-full bg-blue-900 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Chats</span>
        <button
          onClick={onNewChat}
          className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:opacity-90 transition"
        >
          + New
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {Object.entries(groupedChats).length === 0 ? (
          <div className="text-center text-xs text-blue-200/50 mt-10 px-4">
            No history yet. Start a new chat!
          </div>
        ) : (
          Object.entries(groupedChats).map(([label, chats]) => (
            <div key={label}>
              <div className="px-2 mb-2 text-xs font-medium text-blue-200/30 uppercase tracking-wider">
                {label}
              </div>
              <div className="space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => onSelectChat?.(chat.id)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition
                      ${
                        chat.id === activeChatId
                          ? "bg-blue-600 text-white shadow-md"
                          : "hover:bg-white/10 text-blue-100/80"
                      }`}
                  >
                    <span className="truncate flex-1 pr-2">{chat.title || "New Chat"}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat?.(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition text-xs px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Logout button */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-sm font-medium rounded-md bg-white/10 text-white hover:bg-white/20 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
