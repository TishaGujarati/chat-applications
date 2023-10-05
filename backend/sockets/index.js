const socketIO = require('socket.io');
const Message = require('../models/message');

module.exports = (server) => {
  const io = socketIO(server);
  
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    socket.on('chat message', async (data) => {
      try {
        const newMessage = new Message({
          from: data.from,
          to: data.to,
          content: data.content,
        });

        await newMessage.save();

        io.to(data.to).emit('chat message', newMessage);
      } catch (error) {
        console.error('Error handling chat message:', error);
      }
    });

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);
    });
  });

  console.log('Socket.IO server initialized');
};
