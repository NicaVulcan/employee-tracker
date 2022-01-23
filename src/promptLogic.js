const inquirer = require("inquirer");
const db = require("../db/connection");
const [deptsTable, newDept] = require("../queries/departmentQueries");
const [rolesTable, newRole] = require("../queries/rolesQueries");
const [staffTable, newStaff, updateEmp] = require("../queries/employeesQueries");

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
            switch (answer.mainMenu) {
                case "View All Departments": 
                    deptsTable();
                    break;
                case "View All Roles":
                    rolesTable();
                    break;
                case "View All Employees":
                    staffTable();
                    break;
                case "Add Department":
                    newDept();
                    break;
                case "Add Role":
                    newRole();
                    break;
                case "Add Employee":
                    newStaff();
                    break;
                case "Update Employee Role":
                    updateEmp();
                    break;
            }
        });
};

module.exports = promptApp;