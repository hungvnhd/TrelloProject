let api = "http://127.0.0.1:3000/";
let registerForm = document.getElementById("register-form");
const confirmInputPassword =
  document.getElementsByClassName("confirmPassword")[0];
const inputUrl = document.getElementsByClassName("url")[0];
const inputEmail = document.getElementsByClassName("email")[0]
const inputPassword = document.getElementsByClassName("password")
const showMessage = (message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
};

// const renderShowMessage = (message) => {
//   let messageContainer = document.getElementsByClassName("message")[0];
//   messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
//   setTimeout(() => {
//     messageContainer.innerHTML = "";
//   }, 3000);
// };
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = registerForm.email.value;
  let password = registerForm.password.value;
  let confirmPassword = registerForm.password.value;
  let url = registerForm.url.value;
  let data = {
    email,
    password,
    confirmPassword,
    url,
  };

  if (inputEmail.value == "") {
    inputEmail.style.border = "1px solid red";
    setTimeout(() => {
      inputEmail.style.border = "";
    }, 3000);
  }

  if (inputPassword.value == "") {
    inputPassword.style.border = "1px solid red";
    setTimeout(() => {
      inputPassword.style.border = "";
    }, 3000);
  }

  if (confirmInputPassword.value == "") {
    confirmInputPassword.style.border = "1px solid red";
    setTimeout(() => {
      confirmInputPassword.style.border = "";
    }, 3000);
  }
  if (inputUrl.value == "") {
    inputUrl.style.border = "1px solid red";
    setTimeout(() => {
      inputUrl.style.border = "";
    }, 6000);
  }

  // console.log(data);
  fetch(api + "auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        alert("Đăng kí thành công");
        window.location.href = "/auth/login";
      } else {
        console.log(data.message);
        showMessage(data.message);
      }
    })
    .catch((err) => console.log(err));
});
