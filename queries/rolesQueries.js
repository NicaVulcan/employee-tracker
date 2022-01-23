const db = require("../db/connection");

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
const newRole = (title, salary, department) => {

    const deptId = `INSERT INTO roles(title, salary, department_id) VALUES(?, ?, (SELECT id FROM departments WHERE department_name = ?));`
    db.query(deptId, [title, salary, department], (err, result) => {
        if(err) {throw err;}
        console.log(result);
        console.log(`New role ${title} has been added!`)

    })
    const sql = `SELECT id, title FROM roles;`;
    db.query(sql, (err, rows) => {
        if (err) {throw err;}
        console.table(rows);
    });
  
};
module.exports = [rolesTable, newRole];