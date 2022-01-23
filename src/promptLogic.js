const inquirer = require("inquirer");
const db = require("../db/connection");
const [deptsTable, newDept] = require("../queries/departmentQueries");
const [rolesTable, newRole] = require("../queries/rolesQueries");
const [staffTable, newStaff]= require("../queries/employeesQueries");

// Show table of departments
const viewDepts = () => {
    deptsTable();
};
// Show table of roles
const viewRoles = () => {
    rolesTable();
};
// Show table of employees
const viewStaff = () => {
    staffTable();
};
// Add new department
const addDept = () => {
    return inquirer
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
            db.query(sql, answer.deptName, (err, rows) => {
                if (err) {
                    throw err;
                }
                const sql2 = `SELECT * FROM departments`;
                db.query(sql2, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`New department, ${answer.deptName}, has been added!`)
                    console.table(rows);
                });
            })  
    });
};

// Add new role
const deptList = () => {
    let deptArr = [];
    db.query(`SELECT department_name FROM departments`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            deptArr.push(res[i].department_name);
        }
    });
    return deptArr;
};

const addRole = () => {
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

            return newRole(title, salary, department);
        });
};

// add an employee
const roleList = () => {
    let roleArr = [];
    db.query(`SELECT title FROM roles`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    });
    return roleArr;
};
const mgrList = () => {
    let mgrArr = [];
    db.query(`SELECT first_name FROM employees`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            mgrArr.push(res[i].first_name);
        }
    });
    return mgrArr;
};

const addStaff = () => {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "New employee first name:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter employee first name!");
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "New employee last name:",
                validate: input => {
                    if (input) {
                        return true;
                    } else {
                        console.log("Please enter employee last name!");
                    }
                }
            },
            {
                type: "list",
                name: "role",
                message: "New employee title:",
                choices: roleList()
            },
            {
                type: "list",
                name: "mgr",
                message: "New employee's manager:",
                choices: mgrList()
            }
        ])
        .then(answers => {
            const fName = answers.firstName;
            const lName = answers.lastName;
            const role = answers.role;
            const mgr = answers.mgr;
            return newStaff(fName, lName, role, mgr);
        });
};

const updateRole = () => { return console.log("you chose to update an employee's role") };

const promptApp = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "mainMenu",
                message: "What would you like to do?",
                choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"]
            }
        ])
        .then(answer => {
            if (answer.mainMenu === "View All Departments") {
                return viewDepts();
            } else if (answer.mainMenu === "View All Roles") {
                return viewRoles();
            } else if (answer.mainMenu === "View All Employees") {
                return viewStaff();
            } else if (answer.mainMenu === "Add Department") {
                return addDept();
            } else if (answer.mainMenu === "Add Role") {
                return addRole();
            } else if (answer.mainMenu === "Add Employee") {
                return addStaff();
            } else if (answer.mainMenu === "Update Employee Role") {
                return updateRole();
            } else {
                return;
            }
        });
};

module.exports = promptApp;