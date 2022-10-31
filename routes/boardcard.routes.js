const express = require("express");
const router = express.Router();
const boardcardController = require("../controller/boardcard.controller")


router.get("/", boardcardController.getAllBoardCard)

router.get("/:id", boardcardController.getAllByIdBoardCard)

module.exports = router;