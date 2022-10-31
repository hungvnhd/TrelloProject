const db = require("../models/db");

module.exports.getAllWorkspaceBoard = (req, res) => {
  db.execute("SELECT * FROM tbl_workspaceboards")
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};
module.exports.getAllByIdWorkspaceBoard = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_workspaceboards WHERE id = ?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createWorkspaceBoard = (req, res) => {
  let name = req.body.name;
  if (!name) {
    res.status(200).json({
      message: "Invail name",
    });
  }
  let id = Math.floor(Math.random() * 1000);
  db.execute("SELECT * FROM tbl_workspaceboards WHERE name = ?", [name])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length > 0) {
        return Promise.reject("User already exits");
      } else {
        return db.execute(
          "INSERT INTO tbl_workspaceboards VALUE (?, ?, ?, ?)",
          [id, name, null, null]
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        message: " Create one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.updateWorkspaceBoard = (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  db.execute("UPDATE tbl_workspaceboards SET name = ? WHERE id = ?", [name, id])
    .then((data) => {
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => console.log(err));
};


module.exports.deleteWorkspaceBoard = (req, res)=>{
    let {id} = req.params
    db.execute("DELETE FROM tbl_workspaceboards WHERE id =?", [id])
    .then((data)=>{
        res.status(200).json({
            message:"Delete one successfully"
        })
    })
    .catch((err)=>console.log(err))
}