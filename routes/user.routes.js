const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const userProfileController = require("../controller/userprofile.controller")

router.get("/", userController.renderHomepage);
router.get("/1", userController.renderBoard);

router.get("/", userController.renderAdmin)

router.get("/userprofile", userProfileController.getAllUserprofile)



module.exports = router;
