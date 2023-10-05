import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import socket from '../utils/WebSocket'; 

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback((message) => {
    socket.emit('chat message', message);

    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    const handleChatMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('chat message', handleChatMessage);

    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
