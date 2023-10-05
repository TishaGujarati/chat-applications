const Message = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [{ from: userId }, { to: userId }],
    })
      .sort({ timestamp: "asc" })
      .exec();

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { from, to, content } = req.body;

    const newMessage = new Message({
      from,
      to,
      content,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Eror" });
  }
};
