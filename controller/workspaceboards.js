const db = require("../models/db");

module.exports.getAllWorkspaceBoard = (req, res) => {
  db.execute("SELECT * FROM tbl_workspaceboards")
    .then((data) => {
      let [rows] = data;
      // console.log(rows);
      res.render("homepage.ejs", {
        data: rows,
      });
      // res.status(200).json({
      //   data: rows,
      // });
    })
    .catch((err) => console.log(err));
};
module.exports.getAllByIdWorkspaceBoard = (req, res) => {
  let boards;
  // let cards;
  let { id, boardID } = req.params;
  console.log(req.params);
  // console.log(req.params);
  db.execute("SELECT * FROM tbl_workspaceboards WHERE workspaceID = ?", [id])
    .then((data) => {
      let [rows] = data;
      boards = rows;
      // console.log(boards);
      db.execute("SELECT * FROM tbl_boardcards WHERE boardID = ?", [
        boardID,
      ]).then((data) => {
        let [cards] = data;
        // console.log(cards);
        db.execute("SELECT * FROM tbl_workspaceboards WHERE id = ?", [
          boardID,
        ]).then((data) => {
          let [boardsData] = data;
          // console.log(boardsData);

          db.execute("SELECT * FROM tbl_cardtodos").then((data) => {
            let [todos] = data;
            db.execute("SELECT * FROM tbl_workspaces WHERE id = ?", [id]).then(
              (data) => {
                let [workspaceData] = data;
                console.log(workspaceData);
                res.render("workspaceBoard.ejs", {
                  data: boards,
                  data1: cards,
                  data2: boardsData,
                  data3: todos,
                  data4: workspaceData,
                });
              }
            );
            // console.log(todos);
          });
          // console.log(boardsData);
        });
      });
    })

    .catch((err) => console.log(err));
};

module.exports.createWorkspaceBoard = (req, res) => {
  let workspaceId = req.params.id;
  let name = req.body.name;
  let backgroundURL = req.body.boardBackgroundURL;
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
          [id, name, workspaceId, backgroundURL]
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

module.exports.deleteWorkspaceBoard = (req, res) => {
  let { id } = req.params;
  db.execute("DELETE FROM tbl_workspaceboards WHERE workspaceID =?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Delete one successfully",
      });
    })
    .catch((err) => console.log({ message: err }));
};
