const db = require("../db/connection");
const inquirer = require("inquirer");

// View Roles table: role id, job title, dept role belongs to, salary
const rolesTable = () => {
    const sql = `
    SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);

    });
};

// Add role: enter name, salary, dept
const newRole = () => {

    // Answer options for adding new role's department
    const deptList = () => {
        let deptArr = [];
        db.query(`SELECT department_name FROM departments`, (err, res) => {
            for (let i = 0; i < res.length; i++) {
                deptArr.push(res[i].department_name);
            }
        });
        return deptArr;
    };

    return inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "New role title:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter new role title!");
                    }
                }
            },
            {
                type: "number",
                name: "salary",
                message: "New role salary:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter new role salary!");
                    }
                }
            },
            {
                type: "list",
                name: "department",
                message: "Department new role falls under:",
                choices: deptList()
            }
        ])
        .then(answers => {
            const title = answers.title;
            const salary = answers.salary;
            const department = answers.department;

            const sql = `
                INSERT INTO roles(title, salary, department_id) 
                VALUES(?, ?, 
                    (SELECT id FROM departments WHERE department_name = ?));`
            db.query(sql, [title, salary, department], (err, rows) => {
                if(err) {throw err;}
                console.log(`New role ${title} has been added!`)
            })
            db.query(`SELECT id, title FROM roles;`, (err, rows) => {
                if (err) {throw err;}
                console.table(rows);
            });
        })
};

module.exports = [rolesTable, newRole];