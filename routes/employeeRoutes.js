//const con = require('../db/connection')
// roles.title AS role_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id
const mysql = require('mysql2/promise');
require('dotenv').config();

  const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});
async function closeConnection(){
    const c = await con;
    c.end();
}
async function getAllEmployees() {
    const c = await con;
    const query = (`SELECT e.id, CONCAT(e.first_name, ' ',  e.last_name) AS employee_name, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name, r.title, r.salary, d.department_name
    FROM employees e
    LEFT JOIN employees m ON e.manager_id = m.id
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id;
    `)
    return (await c.query(query))[0]
}
async function getRoles(){
    const c = await con;
    const query = (`SELECT roles.id, roles.title, roles.salary, d.department_name FROM roles LEFT JOIN departments d ON roles.department_id = d.id`)
    return (await c.query(query))[0]
}
async function getDepartments(){
    const c = await con;
    const query = (`SELECT * FROM departments`)
    return (await c.query(query))[0]
}
async function addDepartment(body){
    const c = await con;
    const query = (`INSERT INTO departments (department_name) VALUES (?)`)
    const params = body
    await c.query(query, params) 
}
async function addRole(body) {
    const c = await con;
    const query = (`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`)
    const params = [body.title, body.salary, body.department_id]
    await c.query(query, params)
}
async function addEmployee(body){
    const c = await con;
    const query = (`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`)
    const params = [body.first_name, body.last_name, body.role_id, body.manger_id]
    await c.query(query, params)
}
async function changeEmployeeRole(body){
    const c = await con;
    const query = (`UPDATE employees SET role_id = ? WHERE id = ?`)
    const params = [body.role_id, body.id]
    await c.query(query, params)
}
getRoles()

module.exports = {getAllEmployees, getRoles, getDepartments, addDepartment, addRole, addEmployee, changeEmployeeRole, closeConnection}