const db = require("../models/db");

module.exports.getAllBoardCard = (req, res) => {
  db.execute("SELECT * FROM tbl_boardcards")
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getAllByIdBoardCard = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_boardcards WHERE id =?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.createBoardCard = (req, res) => {
    let name = req.body.name;
    if (!name) {
      res.status(200).json({
        message: "Invail name",
      });
    }
    let id = Math.floor(Math.random() * 1000);
    db.execute("SELECT * FROM tbl_boardcards WHERE name = ?", [name])
      .then((data) => {
        let [rows] = data;
        console.log(rows);
        if (rows.length > 0) {
          return Promise.reject("User already exits");
        } else {
          return db.execute(
            "INSERT INTO tbl_boardcards VALUE (?, ?, ?)",
            [id, name, null]
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

  module.exports.updateBoardCard =(req, res)=>{
    let {id} = req.params
    let {name} = req.body
    db.execute("UPDATE tbl_boardcards SET name =? WHERE id = ?", [name, id])
    .then((data)=>{
        res.status(200).json({
            message: "Updata one successfully"
        })
    })
    .catch((err)=>console.log(err))
  }

  module.exports.deleteBoardCard = (req, res)=>{
    let {id} = req.params
    db.execute("DELETE FROM tbl_boardcards WHERE boardID =?", [id])
    .then((data)=>{
        res.status(200).json({
            message: "Delete one successfully"
        })
    })
    .catch((err)=>console.log(err))
  }