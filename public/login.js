let baseApi = "http://127.0.0.1:3000/"

let loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    let email = loginForm.email.value;
    let password = loginForm.password.value;
    let confirmPassword = loginForm.confirmpassword.value;


//     const emailRegex =
//     /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//   if (!email) {
//     renderErrorMessage("login-email-err", "Please enter your email");
//   } else if (!emailRegex.test(email)) {
//     renderErrorMessage("login-email-err", "Invalid email");
//   } else {
//     renderErrorMessage("login-email-err", "");
//   }

//   if (!password) {
//     renderErrorMessage("login-password-err", "Please enter your password");
//   } else {
//     renderErrorMessage("login-password-err", "");
//   }
//   if (email && password) {
//     signInNewUser(email, password);
//     // getDisplayName();
//   }


    let data ={
        email,
        password,
        confirmPassword
    }
console.log(data);
    fetch(baseApi + "auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res)=> res.json())
    .then((data)=>{
        if(data.status === "success"){
            window.location.href="/user"
        }
    })
})
