const db = require("../models/db");

module.exports.getAllCardTodos = (req, res) => {
  db.execute("SELECT * FROM tbl_cardtodos")
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.getAllByIdCardTodos = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT *FROM tbl_cardtodos WHERE id =?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => console.log(err));
};
module.exports.createCardTodos = (req, res) => {
  console.log(req.params);

  let name = req.body.name;
  let cardID = req.body.cardID;
  if (!name) {
    res.status(200).json({
      message: "Invail name",
    });
  }
  let id = Math.floor(Math.random() * 100000);
  db.execute("SELECT * FROM tbl_cardtodos WHERE name = ?", [name])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length > 0) {
        return Promise.reject("User already exits");
      } else {
        return db.execute("INSERT INTO tbl_cardtodos VALUE (?, ?, ?)", [
          id,
          name,
          cardID,
        ]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: " Create one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.updateCardTodos = (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  db.execute("UPDATE tbl_cardtodos SET name =? WHERE id2=?", [name, id])
    .then((data) => {
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => console.log(err));
};

module.exports.deleteCardTodos = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_cardtodos WHERE cardId=?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Delete one successfully",
      });
    })
    .catch((err) =>
      console.log({
        message: err,
      })
    );
};
