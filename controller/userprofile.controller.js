const db = require("../models/db");

module.exports.getAllUserprofile = (req, res) => {
    let id = req.signedCookies.userId
  db.execute("SELECT * FROM tbl_users WHERE user_id = ?",[id])
    .then((data) => {
      let [rows] = data;
   
      res.render("userprofile", {
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};
