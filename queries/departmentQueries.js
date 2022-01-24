const db = require("../db/connection");
const inquirer = require("inquirer");

// View Departments table: dept id and dept names
const deptsTable = () => {
    const promptApp = require("../src/promptLogic");

    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        promptApp();
    });
};

// Add dept: enter dept name
const newDept = (deptArr) => {
    const promptApp = require("../src/promptLogic");

    inquirer
    .prompt([
        {
            type: "input",
            name: "deptName",
            message: "New Department Name:",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter new department name!");
                    return false;
                }
            }
        }
    ])
    .then(answer => {

        const sql = `
        INSERT INTO departments (department_name)
        VALUES (?);`;
        const dept = answer.deptName;
        
        deptArr.push(dept);

        db.query(sql, dept, (err, rows) => {
            if (err) {
                throw err;
            }
            const sql2 = `SELECT * FROM departments`;
            db.query(sql2, (err, rows) => {
                if (err) {
                    throw err;
                }
                console.log(`New department, ${dept}, has been added!`)
                console.table(rows);
                promptApp();
            });
        });
    });
};
    
module.exports = [deptsTable, newDept]

