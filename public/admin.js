
let api = "http://127.0.0.1:3000/"
let tbody = document.getElementById("tbody");

tbody.addEventListener("click", function(e){
    e.preventDefault();
    // console.log(e.target.classList.contains("btn-delete"));
    if(e.target.classList.contains("btn-delete")) {
        // let btnDelete = document.getElementsByClassName("btn-delete")[0]
        // let id = btnDelete.id
        let id = e.target.id;
        console.log(id);

        
        fetch(api + `admin/${id}`, {
            method: "DELETE"
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            e.target.parentElement.parentElement.remove()
            console.log(data);
        })
        .catch((err)=> console.log(err))
    }
})