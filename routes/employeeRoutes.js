const { fetchAsyncQuestionPropertyQuestionProperty } = require('inquirer/lib/utils/utils');
const con = require('../db/connection')
// roles.title AS role_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id
function getAllEmployees() { 
    con.connect( err => {
    if(err){
        console.log(err);
    }
    const query = (`SELECT e.id, CONCAT(e.first_name, ' ',  e.last_name) AS employee_name, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager_name, r.title, r.salary, d.department_name
        FROM employees e
        LEFT JOIN employees m ON e.manager_id = m.id
        LEFT JOIN roles r ON e.role_id = r.id
        LEFT JOIN departments d ON r.department_id = d.id
         `)
    con.query(query, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log(result)
    })
})
}
function getRoles() {
    con.connect( err => {
        if(err){
            console.log(err);
        }
        const query = (`SELECT * FROM roles`)
        con.query(query, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log(result)
        })
    })
}
function getDepartments(){
    con.connect( err => {
        if(err){
            console.log(err);
        }
        const query = (`SELECT * FROM departments`)
        con.query(query, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log(result)
        })
    }) 
}
function addDepartment(body){
    console.log(body);
    con.connect( err => {
        if(err){
            console.log(err);
        }
        const query = (`INSERT INTO departments (department_name) VALUES (?)`)
        const params = body
        con.query(query, params, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log('success!')
        })
    })  
}
function addRole(body) {
    console.log(body);
    con.connect( err => {
        if(err){
            console.log(err);
        }
        const query = (`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`)
        const params = [body.title, body.salary, body.department_id]
        con.query(query, params, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log('success!')
        })
    })
}
function addEmployee(body){
    console.log(body);
    con.connect( err => {
        if(err){
            console.log(err);
        }
        const query = (`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`)
        const params = [body.first_name, body.last_name, body.role_id, body.manger_id]
        con.query(query, params, (err, result) => {
            if(err){
                console.log(err)
            }
            console.log('success!')
        })
    })
}

module.exports = {getAllEmployees, getRoles, getDepartments, addDepartment, addRole, addEmployee}