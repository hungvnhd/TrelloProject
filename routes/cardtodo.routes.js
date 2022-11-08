const express = require("express");
const router = express.Router();
const cardTodosController = require("../controller/cardtodos.controller");

router.get("/", cardTodosController.getAllCardTodos);

router.get("/:id", cardTodosController.getAllByIdCardTodos);

router.post("/", cardTodosController.createCardTodos);

router.put("/:id", cardTodosController.updateCardTodos);

router.delete("/:id", cardTodosController.deleteCardTodos);

module.exports = router;
