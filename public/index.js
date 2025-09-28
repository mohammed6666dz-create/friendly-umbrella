const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// نخلي الملفات الأمامية (HTML, CSS, JS) متاحة من public/
app.use(express.static("public"));

// لما يتصل مستخدم
io.on("connection", (socket) => {
  console.log("✅ مستخدم دخل");

  // انضمام لغرفة
  socket.on("joinRoom", ({ room, username, avatar }) => {
    socket.join(room);
    console.log(`👤 ${username} دخل الغرفة: ${room}`);

    // نبعت رسالة دخول للغرفة كاملة
    io.to(room).emit("message", {
      user: "النظام",
      avatar: "",
      text: `${username} انضم إلى ${room}`,
      time: new Date().toLocaleTimeString(),
      room,
    });
  });

  // استقبال رسالة من مستخدم
  socket.on("chatMessage", ({ room, user, avatar, msg, time }) => {
    io.to(room).emit("message", {
      user,
      avatar,
      text: msg,
      time,
      room,
    });
  });

  // عند الخروج
  socket.on("disconnect", () => {
    console.log("❌ مستخدم خرج");
  });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 السيرفر راهو يخدم على http://localhost:${PORT}`);
});
