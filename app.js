const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// import routes
// let userRoutes = require("./routes/users.routes");
let authRoutes = require("./routes/auth.routes");
// let blogRoutes = require("./routes/blogs.routes");
// const db = require("./models/db");

// Set up view engine
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// use third-party middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser("secret"));

app.get("/", (req, res) => {
  console.log("Login");
  res.send("hello");
});
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("server is running on port http://127.0.0.1:3000");
});
