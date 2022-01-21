// View Employees table: employee id, first name, last name, role, dept, manager
let viewEmp = `
    SELECT staff.id, staff.first_name, staff.last_name, roles.title AS role, departments.department_name AS department, managers.first_name AS manager
    FROM employees AS staff
    LEFT JOIN roles
    ON staff.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees AS managers
    ON staff.manager_id = managers.id`;

// Add employee: enter first name, last name, role, manager
let addEmp = `
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;

// Update employee: select employee -> update role
let updateEmp = `
    UPDATE employees
    SET role_id = ? 
    WHERE id = ?`;