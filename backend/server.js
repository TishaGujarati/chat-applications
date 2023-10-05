const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const socketIO = require("./sockets");
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
const chatRoutes = require("./routes/chatRoute");
const { PORT, MONGO_URI } = require("./config/config");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

socketIO(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
