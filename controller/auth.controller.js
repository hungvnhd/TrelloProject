const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

module.exports.renderRegister = (req, res) => {
  res.send("<h1>This is register homepage</h1>");
};

module.exports.renderLogin = (req, res) => {
  res.send("<h1>This is login homepage</h1>");
};

module.exports.renderBoard = (req, res) => {
  res.render("board");
};

module.exports.register = (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      message: "Invail email or password",
    });
  }
  if (!filter.test(email)) {
    return res.status(500).json({
      message: "Enter a valid email address.Example: Dungmeo123@gmail.com'",
    });
  }

  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }

  let id = Math.floor(Math.random() * 1000000);
  password = bcrypt.hashSync(password, saltRounds);
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      // console.log(data);
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?, ?)", [
          id,
          null,
          email,
          password,
          null,
          null,
        ]);
      }
    })
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Create one succesfully",
        status: "success",
      });
    })
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports.login = (req, res) => {
  let { email, password } = req.body;
  // console.log(email, password);
  if (!email || !password) {
    return res.status(500).json({
      message: "Invalid email or password",
    });
  }
  db.execute("SELECT * FROM tbl_users WHERE email = ?", [email])
    .then((data) => {
      let [rows] = data;
      let find = rows[0];
      if (!find) {
        res.status(404).json({
          message: "User is not exist",
        });
      } else {
        // check password
        let passValid = bcrypt.compareSync(password, find.password);
        // console.log(passValid);
        if (!passValid) {
          res.status(404).json({
            message: "Wrong password",
          });
        } else {
          res.cookie("userId", find.user_id, { signed: true });
          res.cookie("role", find.role, { signed: true });

          res.status(200).json({
            message: "Login Successfully",
            status: "success",
          });
        }
      }
    })
    .catch((err) => console.log(err));
};

module.exports.renderRegister = (req, res) => {
  res.render("sign-up.ejs");
};
module.exports.renderLogin = (req, res) => {
  res.render("login.ejs");
};
