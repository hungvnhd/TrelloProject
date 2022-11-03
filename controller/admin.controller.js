const db = require("../models/db");

module.exports.renderAdmin = (req, res) => {
  let { page_size, page_index } = req.query;
  page_index = Number(page_index) || 1;
  page_size = Number(page_size) || 5;
  let total = 0;
  db.execute("SELECT * FROM tbl_users")
    .then((data) => {
      let [rows] = data;
      total = rows.length;
      return db.execute(
        `SELECT * FROM tbl_users LIMIT ${page_size} OFFSET ${
          (page_index - 1) * page_size
        }`
      );
    })
    .then((data) => {
      let [rows, cols] = data;
      console.log(total);
      res.render("admin", {
        data: rows,
        total,
        page_size,
        page_index,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteAdmin = (req, res) => {
  let { id } = req.params;
  // console.log(id);

  db.execute("DELETE FROM tbl_cardtodos WHERE cardID = ?", [id])
    .then((data) => {
      return db.execute("DELETE FROM tbl_boardcards WHERE id= ?", [id]);
    })
    






    db.execute("DELETE FROM tbl_boardcards WHERE boardID = ?", [id])
    .then((data) => {
      return db.execute("DELETE FROM tbl_workspaceboards WHERE id= ?", [id]);
    })
    db.execute("DELETE FROM tbl_workspaceboards WHERE workspaceID = ?", [id])
    .then((data) => {
      return db.execute("DELETE FROM tbl_workspaces WHERE id= ?", [id]);
    })
    db.execute("DELETE FROM tbl_workspaces WHERE userId= ?", [id])
    .then((data) => {
      return db.execute("DELETE FROM tbl_users WHERE id= ?", [id]);
    })
    .then((data) => {
      res.json({ message: "xoa thanh cong" });
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
