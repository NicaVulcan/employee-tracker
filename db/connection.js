const mysql = require("mysql2");

//connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "F1b0n@cc1",
        database: "dunder_mifflin"
    },
);

module.exports = db;