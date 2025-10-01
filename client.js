// غيّر الرابط هنا إلى سيرفرك على Render
const socket = io("https://friendly-umbrella-urtz.onrender.com/");

// بيانات المستخدم من URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user") || "مجهول";
const room = params.get("room") || "عام";

// الانضمام للغرفة
socket.emit("joinRoom", { room, username, avatar: "" });

// استقبال الرسائل القديمة
socket.on("messageHistory", (messages) => {
  const box = document.getElementById("chat-box");
  messages.forEach(data => {
    const div = document.createElement("div");
    div.className = data.user === username ? "message me" : "message other";
    div.innerText = data.user + ": " + data.text;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
});

// استقبال الرسائل الجديدة
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
  const input = document.getElementById("msg");
  const msg = input.value.trim();
  if (!msg) return;

  const timestamp = new Date().toLocaleTimeString();

  socket.emit("chatMessage", {
    room,
    user: username,
    avatar: "",
    msg,
    time: timestamp
  });

  input.value = "";
}
