const db = require("../db/connection");
const inquirer = require("inquirer");

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
const newStaff = () => {

    // Answer options for adding new employee's role
    let roleList = () => {
        let roleArr = [];
        db.query(`SELECT title FROM roles`, (err, res) => {
            for (let i = 0; i < res.length; i++) {
                let role = res[i].title;
                roleArr.push(role);
            }
        });
        return roleArr;
    };

    // Answer options for adding new employee's manager
    let mgrList = () => {
        let mgrArr = [];
        db.query(`SELECT first_name FROM employees`, (err, res) => {
            for (let i = 0; i < res.length; i++) {
                let mgr = res[i].first_name
                mgrArr.push(mgr);
            }
        });
        return mgrArr;
    };

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

            const sql = `
                INSERT INTO employees(first_name, last_name, role_id, manager_id)
                VALUES(?, ?,
                    (SELECT id FROM roles WHERE title = ?),
                    (SELECT emp.id FROM employees AS emp WHERE emp.first_name = ?))`;
            db.query(sql, [fName, lName, role, mgr], (err, result) => {
                if (err) { throw err; };
                console.log(`New employee ${fName} ${lName} has been added!`);
            });
            db.query(`SELECT id, first_name, last_name FROM employees`, (err, rows) => {
                if (err) { throw err; };
                console.table(rows);
            });
        });
};

// Update employee: select employee -> update role
const updateEmp = () => {

    // Answer options for selecting which employee to update
    let empList = () => {
        let empArr = [];
        db.query(`SELECT first_name FROM employees`, (err, res) => {
            for (let i = 0; i < res.length; i++) {
                let emp = res[i].first_name
                empArr.push(emp);
            }
        });
        return empArr;

    };

    // Answer options for updating employee's role
    let roleList = () => {
        let roleArr = [];
        db.query(`SELECT title FROM roles`, (err, res) => {
            for (let i = 0; i < res.length; i++) {
                let role = res[i].title;
                roleArr.push(role);
            }
        });
        return roleArr;
    };

    return inquirer
        .prompt([
            {
                type: "list",
                name: "emp",
                message: "Employee to update:",
                choices: empList()
            },
            {
                type: "list",
                name: "role",
                message: "Employee's new title:",
                choices: roleList()
            }
        ])
        .then(answers => {
            console.log(answers);

            // const sql = `
            //     UPDATE employees
            //     SET role_id = (SELECT id FROM roles WHERE title = ?) 
            //     WHERE first_name = ?`;
            // db.query(sql, [role, emp], (err, result) => {
            //     if (err) { throw err; };
            //     console.log(`${emp}'s role has been updated to ${role};`);
            // });
            // const sql2 = `
            //     SELECT employees.id, employees.first_name, employees.last_name roles.title
            //     FROM employees
            //     LEFT JOIN roles
            //     ON employees.role_id = roles.id
            //     WHERE employees.first_name = ?;`
            // db.query(sql2, emp, (err, rows) => {
            //     if (err) { throw err; };
            //     console.table(rows);
            // })
        })


}
module.exports = [staffTable, newStaff, updateEmp];