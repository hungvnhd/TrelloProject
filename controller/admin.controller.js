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
  console.log(id);
  db.execute(
    "DELETE tbl_users,tbl_workspaces,tbl_workspaceboards,tbl_boardcards,tbl_cardtodos FROM tbl_users INNER JOIN tbl_workspaces ON tbl_users.user_id = tbl_workspaces.userID INNER JOIN tbl_workspaceboards ON tbl_workspaceboards.workspaceID = tbl_workspaces.id INNER JOIN tbl_boardcards ON tbl_boardcards.boardID = tbl_workspaceboards.id INNER JOIN tbl_cardtodos ON tbl_cardtodos.cardID = tbl_boardcards.id WHERE tbl_users.user_id = ?",
    [id]
  );
  // db.execute("SELECT * FROM tbl_cardtodos WHERE cardID = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_cardtodos WHERE id =?", [id])
  // })

  // db.execute("SELECT * FROM tbl_boardcards WHERE boardID = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_boardcards WHERE id =?", [id])
  // })

  // db.execute("SELECT * FROM tbl_workspaceboards WHERE workspaceID = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaceboards WHERE id =?", [id])
  // })

  // db.execute("SELECT * FROM tbl_workspaces WHERE userID = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaces WHERE id =?", [id])
  // })

  // db.execute("SELECT * FROM tbl_users WHERE user_id = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_users WHERE user_id =?", [id])
  // })

  // select heet

  // db.execute("SELECT * FROM tbl_users WHERE user_id", [id])
  // .then((data)=>{
  //   return db.execute("SELECT * FROM tbl_workspaces WHERE userID=?", [id])
  // })
  // .then((data)=>{
  //   return db.execute("SELECT * FROM tbl_workspaceboards WHERE workspaceID", [id])
  // })
  // .then((data)=>{
  //   return db.execute("SELECT * FROM tbl_boardcards WHERE boardID=?", [id])
  // })
  // .then((data)=>{
  //   return db.execute("SELECT * FROM tbl_cardtodos WHERE cardID=?", [id])
  // })

  // .then((data)=>{

  //   let [rows]= data
  //   console.log([rows].id);

  //   return db.execute("DELETE FROM tbl_cardtodos WHERE id=?", [data[0][0].id])

  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_boardcards WHERE id=?", [data[0][0].id])
  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaceboards WHERE id=?", [data[0][0].id])
  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaces WHERE id=?", [data[0][0].id])
  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_users WHERE user_id=?", [data[0][0].id])
  // })

  // db.execute("DELETE tbl_cardtodos WHERE cardID = ?", [id])
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_boardcards WHERE boardID =?", [id])
  // })
  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaceboards WHERE workspaceboards =?", [id])
  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_workspaces WHERE userID =?", [id])
  // })

  // .then((data)=>{
  //   return db.execute("DELETE FROM tbl_users WHERE user_id =?", [id])
  // })

  //   db.execute("SELECT * FROM tbl_workspaces WHERE userID=?",[id] )
  //   console.log(data);
  //   let id1 = data[0][0].id
  //   .then((data)=>{
  //       db.execute("DELETE FROM tbl_workspaces WHERE id=?", [id1] )
  //       .then((data)=>{
  //           db.execute("SELECT * FROM tbl_workspaceboards WHERE workspaceID=?", [id1])
  //           .then((data)=>{
  //               let id2= data[0][0].id
  //               db.execute("DELETE FROM tbl_workspaceboards WHERE id = ?", [id2])
  //               .then((data)=>{
  //                   db.execute("SELECT * FROM tbl_boardcards WHERE boardID=?", [id2])
  //                   .then((data)=>{
  //                       let id3 = data[0][0].id
  //                       db.execute("DELETE FROM tbl_boardcards WHERE id=?", [id3])
  //                       .then((data)=>{
  //                           db.execute("SELECT * FROM tbl_cardtodos WHERE cardID=?", [id3])
  //                           let id4 = data[0][0].id
  //                           .then((data)=>{
  //                               db.execute("DELETE FROM tbl_cardtodos WHERE id=?", [id4])
  //                           })
  //                       })
  //                   })
  //               })
  //           })
  //       })
  //   })

  // cách đúng
  db.execute("DELETE FROM tbl_users WHERE user_id=?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Delete one successfully",
      });
    })

    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.updateAdmin = (req, res) => {
  let { id } = req.params;
  let { name, url } = req.body;
  db.execute("UPDATE tbl_users SET name =?, url=? WHERE user_id=?", [
    name,
    url,
    id,
  ])
    .then((data) => {
      res.status(200).json({
        message: "Update one sucessfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
