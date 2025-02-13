import React, { useState } from 'react';
import '../style/ChatList.css';

const ChatList = ({ onSelectChat }) => {
  const chatHistory = [
    {
      id: 1,
      name: '포워더 업체 1',
      lastMessage: '운송이 3일 지연될 예정입니다.',
      time: '2025-02-12 14:30',
    },
    {
      id: 2,
      name: '포워더 업체 2',
      lastMessage: 'ETD는 2025.02.04 입니다.',
      time: '2025-02-12 13:10',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <h2 className="chat-list-title">연락 내역</h2>
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="chat-items">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <li
              key={chat.id}
              className="chat-item"
              onClick={() => onSelectChat(chat)}
            >
              <div className="chat-info">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
              <span className="chat-preview">{chat.lastMessage}</span>
            </li>
          ))
        ) : (
          <li className="no-results">검색 결과가 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default ChatList;
