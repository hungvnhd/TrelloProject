const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// import routes
let adminRoutes = require("./routes/admin.routes");
let userRoutes = require("./routes/user.routes");
let authRoutes = require("./routes/auth.routes");
let workspaceRoutes = require("./routes/workspace.routes");
let workspaceBoardRoutes = require("./routes/workspaceboard.routes");
let boardcardRoutes = require("./routes/boardcard.routes");
let cardtodoRoutes = require("./routes/cardtodo.routes");
const {
  requireAuth,
  notRequireAuth,
  requireAdmin,
} = require("./middlewares/auth.middlewares");
// let workspaceRoutes = require("./routes/workspace.routes");
// let workspaceBoardRoutes = require("./routes/workspaceboard.routes");
// let boardcardRoutes = require("./routes/boardcard.routes");
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

app.get("/", requireAdmin, (req, res) => {
  res.redirect("/workspace");
});
app.use("/admin", adminRoutes);

app.use("/auth", notRequireAuth, authRoutes);

app.use("/user", requireAuth, userRoutes);

app.use("/workspace", requireAuth, workspaceRoutes);

app.use("/workspaceboard", requireAuth, workspaceBoardRoutes);

app.use("/boardcard", requireAuth, boardcardRoutes);

app.use("/cardtodo", requireAuth, cardtodoRoutes);

app.listen(3000, () => {
  console.log("server is running on port http://127.0.0.1:3000");
});
