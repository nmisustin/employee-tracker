INSERT INTO departments
(department_name)
VALUES
("Engineering"),
('Accounting'),
('Sales');

INSERT INTO roles
(title, salary, department_id)
VALUES
('Engineering Intern', 30000, 1),
('Engineer', 50000, 1),
('Lead Engineer', 75000, 1),
('Junior Accountant', 30000, 2),
('Accountant', 40000, 2),
('Lead Accountant', 60000, 2),
('Telephone Opperator', 25000, 3),
('Sales Representative', 35000, 3),
('Sales Lead', 50000, 3);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Fred', 'Smith', 3, NULL),
('Kelly', 'Green', 1, 1),
('Octavius', 'Stung', 2, 1),
('Ellie', 'Integ', 2, 1),
('Emily', 'Vague', 6, NULL),
('Arnold', 'Grey', 4, 5),
('James', 'Johnson', 5, 5),
('Jill', 'Johnson', 5, 5),
('Jordan', 'Mills', 9, NULL),
('Taylor', 'Greening', 7, 9),
('Jane', 'Doe', 8, 9);