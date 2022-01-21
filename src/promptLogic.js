const inquirer = require("inquirer");
const mysql = require("mysql2");
const appName = require("./appName");
const deptsTable = require("../queries/departmentQueries");

viewDepts = () => {return deptsTable()};
const viewRoles = () => {return console.log("you chose to view all roles")};
const viewStaff = () => {return console.log("you chose to view all staff")};
const addDept = () => {return console.log("you chose to add a department")};
const addRole = () => {return console.log("you chose to add a role")};
const addStaff = () => {return console.log("you chose to add an employee")};
const updateRole = () => {return console.log("you chose to update an employee's role")};

console.log(appName);

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
            }else if (answer.mainMenu === "Update Employee Role") {
                return updateRole();
            } else {
                return;
            }
        });
};

module.exports = promptApp;