const db = require("../db/connection");

// View Employees table: employee id, first name, last name, role, dept, manager
const staffTable = () => {
    const sql = `
    SELECT staff.id, staff.first_name, staff.last_name, roles.title AS role, departments.department_name AS department, managers.first_name AS manager
    FROM employees AS staff
    LEFT JOIN roles
    ON staff.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees AS managers
    ON staff.manager_id = managers.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
    });
};

// Add employee: enter first name, last name, role, manager
const newStaff = (fName, lName, role, mgr) => {
    const sql = `
        INSERT INTO employees(first_name, last_name, role_id, manager_id)
        VALUES(?, ?,
            (SELECT id FROM roles WHERE title = ?),
            (SELECT emp.id FROM employees AS emp WHERE emp.first_name = ?));`;
    db.query(sql, [fName, lName, role, mgr], (err, result) => {
        if(err) {throw err;};
        console.log (`New employee ${fName} ${lName} has been added!`);
    });
    db.query(`SELECT id, first_name, last_name FROM employees`, (err, rows) => {
        if (err) {throw err;};
        console.table(rows);
    })
};

// Update employee: select employee -> update role
const updateEmp = (emp, role) => {
    const sql =`
        UPDATE employees
        SET role_id = (SELECT id FROM roles WHERE title = ?) 
        WHERE first_name = ?`;
    db.query(sql, [role, emp], (err, result) => {
        if(err) {throw err;};
        console.log(`${emp}'s role has been updated to ${role};`);
    });
    const sql2 = `
        SELECT employees.id, employees.first_name, employees.last_name roles.title
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id
        WHERE employees.first_name = ?;`
    db.query(sql2, emp, (err, rows) => {
        if (err) {throw err;};
        console.table(rows);
    })
    
}
module.exports = [staffTable, newStaff, updateEmp];