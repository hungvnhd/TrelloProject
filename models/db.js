const mysql = require("mysql2");
// liên kết đến database: lấy và lưu dữ liệu trên db
let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "project3_schema",
  password: "12345",
  multipleStatements: true,
});

module.exports = pool.promise();
