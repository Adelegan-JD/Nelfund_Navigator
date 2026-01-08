import React from "react";
import ChatHistory from "./ChatHistory";

const SideBarContainer = ({ activeChatId, onSelectChat, onNewChat, onDeleteChat, onLogout }) => {
  return (
    <div className="w-64 md:w-72 bg-blue-900 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <ChatHistory
        activeChatId={activeChatId}
        onSelectChat={onSelectChat}
        onNewChat={onNewChat}
        onDeleteChat={onDeleteChat}
        onLogout={onLogout}
      />
    </div>
  );
};

export default SideBarContainer;
