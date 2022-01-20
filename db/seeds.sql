INSERT INTO departments (department_name)
VALUES
    ("Office Administration"),
    ("Human Resources"),
    ("Sales"),
    ("Product Oversight"),
    ("Accounting"),
    ("Warehouse");

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

INSERT INTO employees (first_name, last_name, role_id)
VALUES 
    ("Roy", "Anderson", 15),
    ("Pamela", "Beesly", 3),
    ("Andy", "Bernard", 8),
    ("Creed", "Bratton", 10),
    ("Karen", "Filipelli", 8),
    ("Holly", "Flax", 6),
    ("Toby", "Flendersosn", 5),
    ("Clark", "Green", 12),
    ("Jim", "Halpert", 7),
    ("Erin", "Hannon", 4),
    ("Hidetoshi", "Hasaqawa", 16),
    ("Ryan", "Howard", 12),
    ("Stanley", "Hudson", 8),
    ("Kelly", "Kapoor", 11),
    ("Kevin", "Malone", 14),
    ("Angela", "Martin", 13),
    ("Pete", "Miller", 12),
    ("Val", "Johnson", 16),
    ("Oscar", "Martinez", 14),
    ("Meredith", "Palmer", 9),
    ("Darryl", "Philbin", 15),
    ("Michael", "Scott", 1),
    ("Dwight", "Schrute", 2),
    ("Phyllis", "Vance", 8);

