function switchForm(form) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const title = document.getElementById('form-title');

  if (form === 'register') {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    title.textContent = 'إنشاء حساب';
  } else {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    title.textContent = 'تسجيل الدخول';
  }
}const myUsername = "mohamed"; // اسمك انت لي يكون دايماً مدير الموقع
const currentUser = "mohamed"; // هذا يتغير حسب تسجيل الدخول

let roleElement = document.getElementById("userRole");

if (currentUser === myUsername) {
  roleElement.textContent = "مدير الموقع";
  roleElement.classList.add("owner");
} else {
  roleElement.textContent = "عضو";
}
