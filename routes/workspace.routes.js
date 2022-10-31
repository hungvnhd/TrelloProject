const express = require("express")
const router = express.Router();
const workspaceController = require("../controller/workspaces.controller")

router.get("/", workspaceController.getAllWorkspace)

router.get("/:id", workspaceController.getAllIdWorkspace)

router.post("/", workspaceController.createWorkspace)

router.put("/:id", workspaceController.updateWorkspace)

router.delete("/:id", workspaceController.deleteWorkspace)


module.exports = router;