import React, { useState } from "react";
import "../style/ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "포워더",
      name: "이준현",
      company: "(주)윤선무역",
      text: "안녕하세요, 이번에 미국 화물 담당자 입니다. 화물이 지연될 예정이라 연락드립니다.",
      time: "13:45",
      type: "text",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState(null);

  const sendMessage = () => {
    if (inputText.trim() === "" && !file) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "나",
      text: file ? `📎 파일: ${file.name}` : inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: file ? "file" : "text",
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="chat-window">
      {/* 채팅창 상단 (제목) */}
      <div className="chat-header">
        <h3>화물 번호 KHN3039855</h3>
        <p>(주)메타스타 담당자 이준현</p>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === "나" ? "sent" : "received"}`}>
            {msg.sender !== "나" && (
              <div className="message-info">
                <img src="https://via.placeholder.com/40" alt="프로필" className="profile-img" />
                <div className="message-sender">
                  <strong>{msg.name}</strong> <span>{msg.company}</span>
                </div>
              </div>
            )}
            <div className="message-box">
              <p>{msg.text}</p>
              <span className="timestamp">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 */}
      <div className="chat-footer">
        <label htmlFor="file-upload" className="file-upload">
          📎
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} style={{ display: "none" }} />
        <input
          type="text"
          placeholder="메시지를 입력해주세요."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
