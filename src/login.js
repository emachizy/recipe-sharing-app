const validationText = document.querySelector(".validation-text");
const usernameDisplay = document.querySelector(".username-display");
const loginRegister = document.querySelector(".login-register");
const is_user = localStorage.getItem("Is_user_name");

// Log in
function handleLogin(e) {
  e.preventDefault;
  console.log(e.target.parentElement);
  // const userName = document.getElementById("username").value;
  const emailId = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // const is_user = localStorage.getItem("Is_user_name");
  const is_password = localStorage.getItem("is_password");
  const is_email = localStorage.getItem("is_email");

  if (is_email === emailId && is_password === password) {
    location.href = "index.html";
    loginRegister.innerHTML = `Welcome ${is_user}`;
  } else {
    validationText.textContent = "Invalid email or password";
  }
}

loginBtn.addEventListener("click", handleLogin);
