// form handling
function handleRegister(e) {
  e.preventDefault();
  const userName = document.getElementById("username").value;
  const emailId = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  localStorage.setItem("Is_user_name", userName);
  localStorage.setItem("is_email", emailId);
  localStorage.setItem("is_password", password);

  location.href = "login.html";
}

registerBtn.addEventListener("click", handleRegister);

