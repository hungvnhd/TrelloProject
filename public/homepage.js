let form = document.getElementById("create-workspace-form");
// console.log(form);
let workspaceNameInput = document.getElementsByClassName(
  "form-workspace-name-input"
)[0];
let deleteBtn = document.querySelectorAll(".delete-btn");
// console.log(deleteBtn);
let editBtn = document.querySelectorAll(".edit-btn");
// console.log(editBtn);

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

//delete

deleteBtn.forEach((e) => {
  e.onclick = (event) => {
    event.target.parentElement.parentElement.remove();
    let id = event.target.parentElement.parentElement.classList[0];
    console.log(id);

    fetch(`workspace/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.href = "workspace";
      })
      .catch((err) => console.log(err));
  };
});

editBtn.forEach((e) => {
  e.onclick = (event) => {
    let workspaceId =
      event.target.parentElement.parentElement.parentElement.classList[0];

    let workspaceName = event.target.parentElement.innerText
      .replace(
        event.target.parentElement.innerText.split("").splice(0, 2).join(""),
        ""
      )
      .replace("Edit", "");

    console.log(workspaceName);
    event.target.parentElement.innerHTML = `<span class="workspace-icon">${workspaceName
      .charAt()
      .toUpperCase()} </span> <input id="workspace-name-edit-input" type="text" value="${workspaceName}"> <button class="edit-btn submit-btn ${workspaceId}">Submit
    </button>`;

    let submitBtn = document.querySelectorAll(".submit-btn");

    submitBtn.forEach((e) => {
      e.parentElement.children[1].onkeyup = () => {
        console.log(e.parentElement.children[1].value);
        if (e.parentElement.children[1].value == "") {
          e.disabled = true;
          e.style.cursor = "not-allowed";
        } else {
          e.disabled = false;
          e.style.cursor = "pointer";
          e.onclick = (event) => {
            let data = {
              name: e.parentElement.children[1].value,
            };
            fetch(`/workspace/${workspaceId}`, {
              method: "PUT", // or 'PUT'
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
        }
      };
    });
  };
});
