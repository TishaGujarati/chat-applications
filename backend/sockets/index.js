const socketIO = require("socket.io");
const Message = require("../models/message");

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("chat message", async (data) => {
      try {
        console.log(`Received chat message from ${socket.id}:`, data);

        const newMessage = new Message({
          from: data.from,
          to: data.to,
          content: data.content,
        });

        await newMessage.save();

        io.to(data.to).emit("chat message", newMessage);
      } catch (error) {
        console.error(`Error handling chat message from ${socket.id}:`, error);
      }
    });

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`Socket ${socket.id} joined room: ${userId}`);
    });
  });
};
