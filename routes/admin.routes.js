const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller")


router.get("/", adminController.renderAdmin)


router.put("/:id", adminController.updateAdmin)

router.delete("/:id", adminController.deleteAdmin)



module.exports = router