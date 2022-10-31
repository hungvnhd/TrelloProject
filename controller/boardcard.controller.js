const db = require("../models/db")

module.exports.getAllBoardCard = (req, res)=>{
    db.execute("SELECT * FROM tbl_boardcards")
    .then((data)=>{
        let [rows] = data;
        res.status(200).json({
            data: rows
        })
    })
    .catch((err)=>console.log(err))
}

module.exports.getAllByIdBoardCard = (req, res)=>{
    db.execute("SELECT * FROM tbl_boardcards WHERE id =?", [id])
    .then((data)=>{
        
    })
    .catch((err)=>console.log(err))
}