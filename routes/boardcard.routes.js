const express = require("express");
const router = express.Router();
const boardcardController = require("../controller/boardcard.controller")


router.get("/", boardcardController.getAllBoardCard)

router.get("/:id", boardcardController.getAllByIdBoardCard)

router.post("/", boardcardController.createBoardCard)

router.put("/:id", boardcardController.updateBoardCard)

router.delete("/:id", boardcardController.deleteBoardCard)

module.exports = router;