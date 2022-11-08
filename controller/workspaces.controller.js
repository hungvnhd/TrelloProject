const db = require("../models/db");
const _ = require("lodash");

module.exports.getAllWorkspace = (req, res) => {
  let userID = req.signedCookies.userId;
  let workspaces;
  db.execute("SELECT * FROM tbl_workspaces WHERE user_id=?", [userID])
    .then((data) => {
      let [rows] = data;
      workspaces = rows;
      // console.log(rows);

      return db.execute("SELECT * FROM tbl_workspaceboards");
    })
    .then((data) => {
      let [boards] = data;
      // console.log(boards, workspaces);
      // console.log(workspaces);
      let result = boards.reduce((pre, cur) => {
        if (!pre[`${cur.workspaceID}`]) {
          pre[`${cur.workspaceID}`] = [];
        }
        pre[`${cur.workspaceID}`].push(cur);
        return pre;
      }, {});

      let workspaceIdList = Object.keys(result);
      let boardsById = Object.values(result);
      console.log(workspaceIdList);
      console.log(boardsById);

      res.render("homepage.ejs", {
        data: workspaces,
        data1: boards,
        workspaceIdList,
        boardsById,
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
  db.execute("SELECT * FROM tbl_workspaces WHERE name = ?", [name]).then(
    (data) => {
      let [rows] = data;
      // console.log(data);
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        db.execute("INSERT INTO tbl_workspaces VALUES(?, ?, ?)", [
          id,
          userId,
          name,
        ])
          .then((data) => {
            let id2 = Math.floor(Math.random() * 100000);
            console.log(data);
            db.execute("INSERT INTO tbl_workspaceboards VALUES(?, ?, ?, ?)", [
              id2,
              "Board Template",
              id,
              "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            ]);

            res.status(200).json({
              message: "Create one succesfully",
            });
            // res.render("homepage.ejs", {
            //   id: id,
            // });
          })
          .catch((err) => console.log(err));
      }
    }
  );
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
