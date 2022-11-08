let api = "http://127.0.0.1:3000/";
let tbody = document.getElementById("tbody");

tbody.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target.classList.contains("btn-delete"));
  if (e.target.classList.contains("btn-delete")) {
    // let btnDelete = document.getElementsByClassName("btn-delete")[0]
    // let id = btnDelete.id
    let id = e.target.id;
    console.log(id);
    fetch(api + `admin/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        e.target.parentElement.parentElement.remove();
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  if (e.target.classList.contains("btn-update")) {
    let td = e.target.parentElement.parentElement;
    let tdChildList = td.children;
    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      name: tdChildList[2].innerHTML,
      email: tdChildList[3].innerHTML,
      password: tdChildList[4].innerHTML,
      url: tdChildList[5].innerHTML,
      role: tdChildList[5].innerHTML,
    };

    td.innerHTML = `<tr>
       <th scope="row">${info.index}</th>
       <td>${info.id}</td>
       <td><input type="text" value="${info.name} "></td>
       <td>${info.email}</td>
       <td>${info.password}</td>
       <td><input type="text" value="${info.url}"></td>
       <td>${info.role}</td>
       <td class="action">
         <span id="${info.id}" class="btn-delete btn btn-danger">
           <ion-icon name="trash-outline"></ion-icon>
         </span>
         <span id="update-${info.id}" class="btn-save btn btn-info">
              Save
         </span>
       </td>
     </tr>`;
  }

  if (e.target.classList.contains("btn-save")) {
    let id = e.target.id.split("-")[1];
    let td = e.target.parentElement.parentElement;
    let tdChildList = td.children;
    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      name: tdChildList[2].children[0].value,
      email: tdChildList[3].innerHTML,
      password: tdChildList[4].innerHTML,
      url: tdChildList[5].children[0].value,
      role: tdChildList[6].innerHTML,
    };
    fetch(api + `admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        td.innerHTML = `<tr>
            <th scope="row">${info.index}</th>
            <td>${info.id}</td>
            <td>${info.name}</td>
            <td>${info.email}</td>
            <td>${info.password}</td>
            <td>${info.url}</td>
            <td>${info.role}</td>
            <td class="action">
              <span id="${info.id}" class="btn-delete btn btn-danger">
                <ion-icon name="trash-outline"></ion-icon>
              </span>
              <span id ="save-${info.id}"class="btn-update btn btn-info">
                <ion-icon name="build-outline"></ion-icon>
              </span>
            </td>
          </tr>`;
      })
      .catch((err) => console.log(err));
  }
});
