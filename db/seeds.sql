-- Departments table values
INSERT INTO departments (department_name)
VALUES
    ("Office Administration"),
    ("Human Resources"),
    ("Sales"),
    ("Product Oversight"),
    ("Accounting"),
    ("Warehouse");

-- Roles table values
INSERT INTO roles (title, salary, department_id)
VALUES
    ("Regional Manager", 75000, 1),
    ("Assistant to the Regional Manager", 60000, 1),
    ("Office Administrator", 50000, 1),
    ("Receptionist", 35000, 1),
    ("HR Manager", 60000, 2),
    ("HR Representative", 50000, 2),
    ("Regional Sales Director", 60000, 3),
    ("Sales Representative", 50000, 3),
    ("Supplier Relations Representative", 50000, 4),
    ("Quality Assurance", 50000, 4),
    ("Customer Service Supervisor", 40000, 4),
    ("Customer Service", 35000, 4),
    ("Chief Accountant", 60000, 5), 
    ("Accountant", 50000, 5),
    ("Warehouse Foreman", 60000, 6),
    ("Warehouse Staff", 45000, 6);

-- Employees table values
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Roy", "Anderson", 16, 21),
    ("Pamela", "Beesly", 3, 23),
    ("Andy", "Bernard", 8, 9),
    ("Creed", "Bratton", 10, 23),
    ("Karen", "Filipelli", 8, 9),
    ("Holly", "Flax", 6, 7),
    ("Toby", "Flendersosn", 5, 23),
    ("Clark", "Green", 12, 15),
    ("Jim", "Halpert", 7, 23),
    ("Erin", "Hannon", 4, 23),
    ("Hidetoshi", "Hasaqawa", 16, 21),
    ("Ryan", "Howard", 12, 15),
    ("Stanley", "Hudson", 8, 9),
    ("Val", "Johnson", 16, 21),
    ("Kelly", "Kapoor", 11, 23),
    ("Kevin", "Malone", 14, 17),
    ("Angela", "Martin", 13, 23),
    ("Oscar", "Martinez", 14, 17),
    ("Pete", "Miller", 12, 15),
    ("Meredith", "Palmer", 9, 23),
    ("Darryl", "Philbin", 15, 23),
    ("Michael", "Scott", 1, NULL),
    ("Dwight", "Schrute", 2, 22),
    ("Phyllis", "Vance", 8, 9);

-- Add manager FK AFTER inserting Employees table info so that FK can reference PK in same table
ALTER TABLE employees ADD CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id);