// $("cards").sortable();

let cardsLayout = document.getElementById("cards-layout");
let listCardTodo = document.querySelectorAll("#list-card-todo");
listCardTodo.forEach((e) => {
  new Sortable(e, {
    group: "shared", // set both lists to same group
    animation: 150,
  });
});
new Sortable(cardsLayout, {
  animation: 150,
});
