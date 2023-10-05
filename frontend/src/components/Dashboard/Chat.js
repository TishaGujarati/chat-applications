import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import PresenceIndicator from '../common/PresenceIndicator';

const Chat = ({ userId, recipientId }) => {
  const { messages, sendMessage } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      sendMessage({ from: userId, to: recipientId, content: messageInput });
      setMessageInput('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Chat with User {recipientId}</h2>
      <div
        ref={chatRef}
        style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}
        className="mb-3"
      >
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              <strong>{message.from}</strong> {message.content}
            </p>
          </div>
        ))}
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="form-control"
        />
        <div className="input-group-append">
          <button onClick={handleSendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
      <PresenceIndicator online={true} />
    </div>
  );
};

export default Chat;
