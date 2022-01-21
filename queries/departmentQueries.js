const db = require("../db/connection");
const promptApp = require("../src/promptLogic")

// View Departments table: dept id and dept names
const deptsTable = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(rows);

    });
};

// Add dept: enter dept name
let addDept = `
    INSERT INTO departments (department_name)
    VALUES (?)`;

module.exports = deptsTable;

