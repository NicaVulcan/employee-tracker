const db = require("../db/connection");
// const promptApp = require("../src/promptLogic")
// import {promptApp} from "../src/promptLogic";
// const promptApp = require("../app");

// View Departments table: dept id and dept names
const deptsTable = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
    });
    // promptApp();
};

// Add dept: enter dept name
const newDept = (param) => {
    const sql = `
    INSERT INTO departments (department_name)
    VALUES (?);`;
    db.query(sql, param, (err, rows) => {
        if (err) {
            throw err;
        }
        const sql2 = `SELECT * FROM departments`;
        db.query(sql2, (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(`New department, ${param}, has been added!`)
            console.table(rows);
        });

    });
};
    
module.exports = [deptsTable, newDept]

