const express = require("express");
const router = express.Router();
const workspaceboardController = require("../controller/workspaceboards");

router.get("/", workspaceboardController.getAllWorkspaceBoard);

router.get("/:id", workspaceboardController.getAllByIdWorkspaceBoard);

router.post("/:id", workspaceboardController.createWorkspaceBoard);

router.put("/:id", workspaceboardController.updateWorkspaceBoard);

router.delete("/:id", workspaceboardController.deleteWorkspaceBoard);

module.exports = router;
