// تحميل البيانات من localStorage
window.onload = () => {
  document.getElementById("username").textContent = localStorage.getItem("username") || "مجهول";
  document.getElementById("status").textContent = localStorage.getItem("status") || "ضع حالتك هنا";
  document.getElementById("avatar").src = localStorage.getItem("avatar") || "https://i.imgur.com/5cX1.png";
};

// تغيير الاسم
function changeUsername() {
  let newName = prompt("أدخل اسمك الجديد:");
  if (newName) {
    localStorage.setItem("username", newName);
    document.getElementById("username").textContent = newName;
  }
}

// تغيير الحالة
function changeStatus() {
  let newStatus = prompt("أدخل حالتك:");
  if (newStatus) {
    localStorage.setItem("status", newStatus);
    document.getElementById("status").textContent = newStatus;
  }
}

// تغيير الصورة
function changeAvatar() {
  document.getElementById("avatar-input").click();
}

document.getElementById("avatar-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("avatar", reader.result);
      document.getElementById("avatar").src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// رجوع للرومات
function goBack() {
  window.location.href = "rooms.html";
}
// profile.js

// نجيب العناصر
const coverInput = document.getElementById('coverInput');
const coverImage = document.getElementById('coverImage');

// تغيير صورة الخلفية
if (coverInput) {
  coverInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        coverImage.src = e.target.result;
        // نخزنها في localStorage باش تبقى حتى من بعد
        localStorage.setItem('profileCover', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

// نرجع الخلفية المخزنة كل مرة نفتح الصفحة
window.addEventListener('load', () => {
  const savedCover = localStorage.getItem('profileCover');
  if (savedCover && coverImage) {
    coverImage.src = savedCover;
  }
});
