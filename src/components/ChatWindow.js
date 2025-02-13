import React, { useState, useEffect, useRef } from 'react';
import '../style/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: '포워더',
      name: '이준현',
      company: '(주)윤선무역',
      text: '안녕하세요, 이번에 미국 화물 담당자 입니다. 화물이 지연될 예정이라 연락드립니다.',
      time: '13:45',
      type: 'text',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim() === '' && !file) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessage = {
      id: messages.length + 1,
      sender: '나',
      text: file ? `📎 파일: ${file.name}` : inputText,
      time: currentTime,
      type: file ? 'file' : 'text',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>화물 번호 KHN3039855</h3>
        <p>
          <strong>(주)메타스타</strong> 담당자 이준현
        </p>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === '나' ? 'sent' : 'received'}`}
          >
            {msg.sender !== '나' && (
              <div className="message-info">
                <img
                  src="https://via.placeholder.com/40"
                  alt="프로필"
                  className="profile-img"
                />
                <div className="message-sender">
                  <strong>{msg.name}</strong> <span>{msg.company}</span>
                </div>
              </div>
            )}
            <div className="message-box">
              <p>{msg.text}</p>
            </div>
            <span className="timestamp">{msg.time}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        <label htmlFor="file-upload" className="file-upload">
          📎
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <input
          type="text"
          placeholder="메시지를 입력해주세요."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
