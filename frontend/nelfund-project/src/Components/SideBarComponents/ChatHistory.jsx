import React from "react";

const chats = [
  { id: 1, title: "Scholarship eligibility", createdAt: "2025-01-08T10:30:00" },
  { id: 2, title: "Student loan repayment", createdAt: "2025-01-08T08:10:00" },
  { id: 3, title: "Federal grants info", createdAt: "2025-01-07T14:20:00" },
  { id: 4, title: "Tuition support options", createdAt: "2025-01-05T09:00:00" },
];

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
  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="flex flex-col h-full">

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
        {Object.entries(groupedChats).map(([label, chats]) => (
          <div key={label}>
            <div className="px-2 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
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
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                >
                  <span className="truncate">{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat?.(chat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition text-xs px-2 py-1 rounded hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-600 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout button */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
