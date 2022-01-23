const inquirer = require("inquirer");
const db = require("../db/connection");
const [deptsTable, newDept] = require("../queries/departmentQueries");
const [rolesTable, newRole] = require("../queries/rolesQueries");
const [staffTable, newStaff, updateEmp] = require("../queries/employeesQueries");

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
            newDept(answer.deptName);
        });
};

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

// Add new role
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

// Answer options for adding new employee's role, and updating employee's role
const roleList = () => {
    let roleArr = [];
    db.query(`SELECT title FROM roles`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    });
    return roleArr;
};

// Answer options for adding new employee's manager, and for selecting employee to update
const empList = () => {
    let empArr = [];
    db.query(`SELECT first_name FROM employees`, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            empArr.push(res[i].first_name);
        }
    });
    return empArr;
};

// Add an employee
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
                choices: empList()
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

// Update employee's role
const updateRole = () => {
    // return inquirer
    //     .prompt([
    //         {
    //             type: "list",
    //             name: "emp",
    //             message: "Employee to update:",
    //             choices: empList()
    //         },
    //         {
    //             type: "list",
    //             name: "role",
    //             message: "Employee's new title:",
    //             choices: roleList()
    //         }
    //     ])
    return updateEmp("Dwight", "Regional Manager");
};

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