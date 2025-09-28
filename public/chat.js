// لازم socket يكون معرف
let socket = io();

// استقبال ID الخاص بالمستخدم
socket.on("yourId", (id) => {
  console.log("📌 الايدي الخاص بيك:", id);

  // نخزن الايدي في localStorage باش نستعملو وين نحب
  localStorage.setItem("userId", id);
});

function sendMessage(){
  const txt = input.value.trim();
  if(!txt) return;

  const timestamp = new Date().toLocaleTimeString();
  const myId = localStorage.getItem("userId"); // 🆔 نجيبو من localStorage

  socket.emit("chatMessage", { 
    room, 
    user: username, 
    userId: myId,  // 🆔 نبعتو مع الرسالة
    avatar, 
    msg: txt, 
    time: timestamp 
  });

  input.value = "";
  input.focus();
}
function addMessageToDOM(user, avatarUrl, text, isMine=false, timeStr=null, userId="") {
  const row = document.createElement("div");
  row.className = "msg-row " + (isMine ? "msg-mine" : "msg-other");

  row.innerHTML = `
    <img class="avatar" src="${avatarUrl}" alt="avatar">
    <div class="bubble">
      <div class="who">
        ${user} 
        <span style="font-size:11px;color:#0fbf9a">#${userId}</span>
      </div>
      <div class="text">${text}</div>
      <div class="meta">${timeStr}</div>
    </div>
  `;

  messagesDiv.appendChild(row);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
