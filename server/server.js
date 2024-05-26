const express = require("express");
const connectDB = require("./config/connect.js");
const cors = require("cors");
const config = require("config");
const app = express();

app.use(
  cors({
    origin: config.get("frontendUrl"),
  })
);
app.use(express.json({ extended: false }));
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/auth", require("./config/routes/api/auth.js"));
app.use("/api/user", require("./config/routes/api/user.js"));
app.use("/api/post", require("./config/routes/api/post.js"));
app.use("/api/profile", require("./config/routes/api/profile.js"));
app.use("/api/chat", require("./config/routes/api/conversation.js"));

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log("Server started");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: config.get("frontendUrl"),
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("joinRoom", (roomID) => {
    console.log(socket.id, "joins", roomID);
    socket.join(roomID);
  });
  socket.on("changeMsg", (roomID, userId) => {
    io.to(roomID).emit("newMessage", roomID, userId);
    console.log("newMessage event send to", roomID);
  });

  socket.on("test", () => {
    io.emit("response");
  });
});

module.exports = io;
