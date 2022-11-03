const mysql = require("mysql2");
// liên kết đến database: lấy và lưu dữ liệu trên db
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "users_schema",
  password: "12345678",
  multipleStatements: true,
});

module.exports = pool.promise();
