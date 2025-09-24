const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("📡 مستخدم دخل:", socket.id);

  // 🟢 دخول الغرفة
  socket.on("joinRoom", (room, username) => {
    socket.join(room);
    console.log(`${username} دخل ${room} (ID: ${socket.id})`);

    // نخزن معلومات
    socket.data.username = username;
    socket.data.room = room;

    // نبعت الايدي للمستخدم نفسو
    socket.emit("yourId", socket.id);

    // إعلان لباقي الناس فالرووم
    socket.to(room).emit("message", { 
      user: "النظام", 
      text: `${username} دخل الغرفة 🚪` 
    });
  });

  // 🟢 استقبال رسالة
  socket.on("chatMessage", (data) => {
    if (!socket.data.room) return; // تأكد راه داخل لغرفة

    io.to(socket.data.room).emit("message", { 
      user: socket.data.username, 
      userId: socket.id,       // 🆔 نرجع ID تاعو
      text: data.msg, 
      avatar: data.avatar || null, 
      time: data.time || new Date().toLocaleTimeString()
    });
  });

  // 🟢 خروج
  socket.on("disconnect", () => {
    if (socket.data.username && socket.data.room) {
      io.to(socket.data.room).emit("message", {
        user: "النظام",
        text: `${socket.data.username} خرج 🚪`
      });
    }
    console.log("❌ مستخدم خرج:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
});
