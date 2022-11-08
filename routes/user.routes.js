const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
<<<<<<< HEAD
const userProfileController = require("../controller/userprofile.controller")

router.get("/", userController.renderHomepage);
router.get("/1", userController.renderBoard);

router.get("/", userController.renderAdmin)

router.get("/userprofile", userProfileController.getAllUserprofile)


=======

router.get("/:id", userController.renderHomepage);
>>>>>>> 1c7bdc100960095ecf280d5db78c7ac2d965a265

module.exports = router;
