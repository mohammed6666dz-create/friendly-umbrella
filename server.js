const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// نخلي مجلد public يتشاف
app.use(express.static(path.join(__dirname, "public")));

// route رئيسي
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// WebSocket
io.on("connection", (socket) => {
  console.log("🔌 واحد دخل");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ واحد خرج");
  });
});

// PORT يجي من Render ولا من 3000 محلي
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 السيرفر خدام على http://localhost:${PORT}`);
});

