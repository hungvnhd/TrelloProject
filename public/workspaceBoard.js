// $("cards").sortable();

let cardsLayout = document.getElementById("cards-layout");
let listCardTodo = document.querySelectorAll("#list-card-todo");
let createTodo = document.querySelectorAll(".cards-create");
// console.log(createTodo);
listCardTodo.forEach((e) => {
  new Sortable(e, {
    group: "shared", // set both lists to same group
    animation: 150,
  });
});
new Sortable(cardsLayout, {
  animation: 150,
});
let workspaceID = window.location.href.split("/")[4];
let boardItems = document.querySelectorAll(".user-boards__items");
// console.log(boardItems);
boardItems.forEach((e) => {
  e.onclick = (event) => {
    window.location.href = `/workspaceboard/${workspaceID}/${event.target.classList[1]}`;
    // console.log(event.target.classList[1]);
  };
});
let addList = document.getElementsByClassName("add-a-list")[0];

addList.onclick = (e) => {
  // console.log(e.target.classList);
  let div = document.createElement("div");
  div.classList.add("col-3");
  div.classList.add("clickbox");
  if (addList.classList.contains("checked")) {
    div.innerHTML = ` <li class="cards">
    <form action="" class="create-card-form">
      <div>
      <input type="text" class="create-card-input" id="create-card-input" placeholder="Enter card title" name="input">
      </div>
      <button class="create-card-submit">Add list</button>
      <span class="create-card-close"><i class="fa-solid fa-xmark"></i></span>
  
    </form>
     </li>`;

    // createCardForm.onsubmit = (e) => {
    //   e.preventDefault();
    // };

    addList.classList.remove("checked");
    cardsLayout.appendChild(div);
    document.getElementsByClassName("create-card-submit")[0].disabled = true;
    document.getElementsByClassName("create-card-submit")[0].style.cursor =
      "not-allowed";
    let createCardForm = document.getElementsByClassName("create-card-form")[0];
    let cardNameInput = document.getElementById("create-card-input");
    cardNameInput.onkeyup = () => {
      if (cardNameInput.value == "") {
        document.getElementsByClassName(
          "create-card-submit"
        )[0].disabled = true;

        document.getElementsByClassName("create-card-submit")[0].style.cursor =
          "not-allowed";
      } else {
        document.getElementsByClassName(
          "create-card-submit"
        )[0].disabled = false;
        document.getElementsByClassName("create-card-submit")[0].style.cursor =
          "pointer";
        createCardForm.onsubmit = (e) => {
          e.preventDefault();
          console.log(cardNameInput.value);

          let data = {
            name: cardNameInput.value,
          };
          console.log(window.location.href.split("/"));
          let boardID = window.location.href.split("/")[5];
          let workspaceID = window.location.href.split("/")[4];
          fetch(`/boardcard/${workspaceID}/${boardID}`, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              // window.location.href = "/workspace";
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
      }
    };
    window.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("create-card-form") ||
        e.target.classList.contains("add-a-list") ||
        e.target.classList.contains("create-card-input") ||
        e.target.classList.contains("create-card-submit") ||
        e.target.classList.contains("cards-create")
      ) {
        // Clicked in box
        // console.log(e.target.classList);
      } else {
        document.getElementsByClassName("clickbox")[0].remove();
        addList.classList.add("checked");
        // Clicked outside the box
      }
    });
  } else {
    div.innerHTML = "";
  }

  // if()

  // console.log(e.target.parentElement.parentElement.children[1].children.length);
};
createTodo.forEach((e, i) => {
  e.onclick = (event) => {
    let div = document.createElement("div");
    div.classList.add("clickbox1");

    div.innerHTML = ` <li>
    <form action="" class="create-card-form">
      <div>
      <input type="text" class="create-card-input" id="create-card-input" placeholder="Enter task name" name="input">
      </div>
      <button class="create-card-submit">Add task</button>
      <span class="create-card-close"><i class="fa-solid fa-xmark"></i></span>
  
    </form>
     </li>`;
    listCardTodo[i].appendChild(div);
    createTodo[i].style.display = "none";
    document.getElementsByClassName("create-card-submit")[0].disabled = true;
    document.getElementsByClassName("create-card-submit")[0].style.cursor =
      "not-allowed";
    let cardNameInput = document.querySelectorAll(".create-card-input");
    let createCardForm = document.querySelectorAll(".create-card-form");
    window.addEventListener("click", function (e) {
      if (
        e.target.classList.contains("cards") ||
        e.target.classList.contains("card-todo") ||
        e.target.classList.contains("card-name") ||
        e.target.classList.contains("create-card-submit") ||
        e.target.classList.contains("cards-create") ||
        e.target.classList.contains("create-card-input") ||
        e.target.classList.contains("create-card-form")
      ) {
        // Clicked in box
        // console.log(e.target.classList);
      } else {
        document.getElementsByClassName("clickbox1")[0].remove();
        createTodo[i].style.display = "block";

        // addList.classList.add("checked");
        // Clicked outside the box
      }
    });

    console.log(createCardForm);
    cardNameInput.forEach((e, i) => {
      e.onkeyup = () => {
        if (e.value == "") {
          document.getElementsByClassName(
            "create-card-submit"
          )[0].disabled = true;

          document.getElementsByClassName(
            "create-card-submit"
          )[0].style.cursor = "not-allowed";
        } else {
          document.getElementsByClassName(
            "create-card-submit"
          )[0].disabled = false;
          document.getElementsByClassName(
            "create-card-submit"
          )[0].style.cursor = "pointer";
          createCardForm[i].onsubmit = (event) => {
            event.preventDefault();
            // console.log(e.value);

            let cardID =
              event.target.parentElement.parentElement.parentElement
                .parentElement.classList[1];

            let data = {
              name: e.value,
              cardID: cardID,
            };
            // console.log(window.location.href.split("/"));
            // let boardID = window.location.href.split("/")[5];
            // let workspaceID = window.location.href.split("/")[4];
            fetch(`/cardtodo`, {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => response.json())
              .then((data) => {
                let currentURL = window.location.href;
                window.location.href = currentURL;
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

let cardTodo = document.querySelectorAll(".card-todo");
console.log(cardTodo);

cardTodo.forEach((e) => {
  if (e.classList[2] != e.parentElement.parentElement.classList[1]) {
    e.remove();
  }
});
