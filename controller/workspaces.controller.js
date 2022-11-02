const db = require("../models/db");

module.exports.getAllWorkspace = (req, res) => {
  db.execute("SELECT * FROM tbl_workspaces")
    .then((data) => {
      let [rows] = data;
      res.render("homepage.ejs", {
        data: rows,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getAllIdWorkspace = (req, res) => {
  let id = req.params.id;
  db.execute("SELECT * FROM tbl_workspaces WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows[0],
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createWorkspace = (req, res) => {
  let { name } = req.body;
  let userId = req.signedCookies.userId;
  console.log(userId);
  if (!name) {
    return res.status(500).json({
      message: "Invail name",
    });
  }
  let id = Math.floor(Math.random() * 1000000);
  db.execute("SELECT * FROM tbl_workspaces WHERE name = ?", [name])
    .then((data) => {
      let [rows] = data;
      console.log(data);
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute("INSERT INTO tbl_workspaces VALUES(?, ?, ?)", [
          id,
          userId,
          name,
        ]);
      }
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Create one succesfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.updateWorkspace = (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  db.execute("UPDATE tbl_workspaces SET name = ? WHERE id = ?", [name, id])
    .then((data) => {
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteWorkspace = (req, res) => {
  let id = req.params.id;
  db.execute("DELETE FROM tbl_workspaces WHERE id = ?", [id])
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Delete one successfully",
      });
    })
    .catch((err) => console.log(err));
};
