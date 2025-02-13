import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import '../styles/ChatPage.css';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="chat-page">
      <Sidebar />
      <ChatList onSelectChat={setSelectedChat} />
      <div className="chat-container">
        <button className="close-button" onClick={() => window.history.back()}>
          ✕
        </button>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="chat-placeholder">채팅을 선택하세요.</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
