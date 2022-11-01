let baseApi = "http://127.0.0.1:3000/";
let loginForm = document.getElementById("login-form");

const showMessage = (message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
};

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let email = loginForm.email.value;
  let password = loginForm.password.value;

  let data = {
    email,
    password,
  };
  fetch(baseApi + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        alert("đăng nhập thành công");
        window.location.href = "/user";
      } else {
        showMessage(data.message);
      }
    })
    .catch((err) => console.log(err));
});
