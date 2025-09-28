const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // يسمح لأي رابط يتصل بالسيرفر
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// كل الملفات الأمامية في public/
app.use(express.static(path.join(__dirname, "public")));

// إرسال index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// غرف ورسائل
let rooms = {}; // لتخزين الرسائل مؤقتاً لكل غرفة

io.on("connection", (socket) => {
  console.log("✅ مستخدم دخل");

  // دخول غرفة
  socket.on("joinRoom", ({ room, username, avatar }) => {
    socket.join(room);
    if (!rooms[room]) rooms[room] = [];
    
    // إرسال الرسائل القديمة للمستخدم الجديد
    socket.emit("messageHistory", rooms[room]);

    // إعلام الجميع بالانضمام
    const joinMsg = {
      user: "النظام",
      text: `${username} انضم إلى الغرفة`,
      time: new Date().toLocaleTimeString()
    };
    io.to(room).emit("message", joinMsg);
  });

  // استقبال رسالة
  socket.on("chatMessage", ({ room, user, avatar, msg, time }) => {
    const message = { user, avatar, text: msg, time };
    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(message);

    io.to(room).emit("message", message); // إرسال لكل المستخدمين في الغرفة
  });

  socket.on("disconnect", () => {
    console.log("❌ مستخدم خرج");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 السيرفر شغال على PORT ${PORT}`));
