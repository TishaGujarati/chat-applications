import axios from 'axios';

const BASE_URL = "http://localhost:8000";

export const getMessages = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/chat/messages/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/chat/messages`, message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
