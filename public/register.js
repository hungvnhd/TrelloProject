let api = "http://127.0.0.1:3000/";
let registerForm = document.getElementById("register-form");
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

  console.log(data);
  fetch(api + "auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data);
    if(data.status === "success"){
        window.location.href="/auth/login"
    }
  })
  .catch((err)=>console.log(err))
});
