// View Roles table: role id, job title, dept role belongs to, salary
let viewRoles = `
    SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

// Add role: enter name, salary, dept
let addRole = `
    INSERT INTO roles (title, department_id, salary)
    VALUES (?, ?, ?)`;
