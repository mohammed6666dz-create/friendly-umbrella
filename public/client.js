const socket = io();

// نحصلو بيانات الغرفة واليوزر من الـ URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user") || "مجهول";
const room = params.get("room") || "عام";

// الدخول للغرفة
socket.emit("joinRoom", room, username);

// استقبال الرسائل
socket.on("message", (data) => {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = data.user === username ? "message me" : "message other";
  div.innerText = data.user + ": " + data.text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});

// إرسال رسالة
function sendMessage(e) {
  e.preventDefault();
  let input = document.getElementById("msg");
  let msg = input.value.trim();
  if (msg !== "") {
    socket.emit("chatMessage", { room, user: username, msg });
    input.value = "";
  }
}
function sendMessage(){
  const txt = input.value.trim();
  if(!txt) return;

  const timestamp = new Date().toLocaleTimeString();
  const myId = localStorage.getItem("userId");

  socket.emit("chatMessage", { 
    room, 
    user: username, 
    userId: myId,   // 🆔 نبعثو مع الرسالة
    avatar, 
    msg: txt, 
    time: timestamp 
  });

  input.value = "";
}
