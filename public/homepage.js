let form = document.getElementById("create-workspace-form");
console.log(form);
let workspaceNameInput = document.getElementsByClassName(
  "form-workspace-name-input"
)[0];

workspaceNameInput.onkeyup = () => {
  if (workspaceNameInput.value === "") {
    document.getElementsByClassName(
      "form-create-submit-btn"
    )[0].disabled = true;
    document.getElementsByClassName(
      "form-create-submit-btn"
    )[0].style.backgroundColor = "#F5F6F8";
    document.getElementsByClassName("form-create-submit-btn")[0].style.color =
      "#A5ADB9";
    document.getElementsByClassName("form-create-submit-btn")[0].style.cursor =
      "not-allowed";
  } else {
    document.getElementsByClassName(
      "form-create-submit-btn"
    )[0].style.backgroundColor = "green";
    document.getElementsByClassName(
      "form-create-submit-btn"
    )[0].disabled = false;
    document.getElementsByClassName("form-create-submit-btn")[0].style.cursor =
      "pointer";
    document.getElementsByClassName("form-create-submit-btn")[0].style.color =
      "white";
  }
};
form.onsubmit = (e) => {
  e.preventDefault();
  let data = { name: workspaceNameInput.value };
  fetch("/workspace", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "/workspace";
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
