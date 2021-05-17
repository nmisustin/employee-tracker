const inquirer = require("inquirer");
const cTable = require('console.table')
const{getAllEmployees, getDepartments, addDepartment, addRole, addEmployee, changeEmployeeRole, getRoles, closeConnection} =require('./routes/employeeRoutes');
const inputCheck = require("../../../Downloads/12.5/utils/inputCheck");
async function choices(){
    const answers = await inquirer.prompt([{
        name: 'choice',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View employees', 'View roles', 'View departments', 'Add a new employee', 'Add a new role', 'Add a new department', "Change an employee's role", "I'm done!" ]
    }])
    return await choiceActions(answers.choice);
}
async function choiceActions(choice){
    let result = true;
    if(choice === 'View employees'){
        const response = await  getAllEmployees();
        console.table(response);
    }
    else if(choice === 'View roles' ){
        const response =  await getRoles();
        console.table(response);
    }
    else if(choice === 'View departments'){
        const response = await getDepartments();
        console.table(response);
    }
    else if(choice === 'Add a new employee'){
        await employeeAdder();
    }
    else if(choice === 'Add a new role'){
        await roleAdder();
    }
    else if(choice === 'Add a new department'){
        await departmentAdder();
    }
    else if(choice === "Change an employee's role"){
        await roleChanger();
    }
    else if(choice === "I'm done!"){
        result = false;
    }
    return result;
}
async function employeeAdder(){
    const answers = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of your employee?'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of your employee?'
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'What role will this employee be working in',
            choices: await getRoleNames()
        },
        {
            name: 'manager_id',
            type: 'list',
            message: "Who is this employee's manager?",
            choices: await getEmployeeNames()
        }
    ])
    answers.role_id = searchRoleId(answers.role_id, await getRoles());
    answers.manager_id = searchEmployeeId(answers.manager_id, await getAllEmployees())
    console.log(answers);
    addEmployee(answers);
}
async function roleAdder(){
    const answers = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the name of the new role?'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary of the new role?'
        },
        {
            name: 'department_id',
            type: 'list',
            message: 'What department is the new role a part of?',
            choices: await getDepartmentNames()
        } 
    ])
    answers.department_id = searchDepartmentId(answers.department_id, await getDepartments());
    addRole(answers);
}
async function departmentAdder(){
    const answers = await inquirer.prompt([
        {
            name: 'department_name',
            type: 'input',
            message: 'What is your new department name?'
        }
    ])
    addDepartment(answers.department_name);
}
async function roleChanger(){
    const answers = await inquirer.prompt([
        {
            name: 'id',
            type: 'list',
            message: "Which employee's role would you like to change?",
            choices: await getEmployeeNames()
        },
        {
            name: 'role_id',
            type: 'list',
            message: 'Which role would you like to give this employee?',
            choices: await getRoleNames()
        }
    ])
    answers.id = searchEmployeeId(answers.id, await getAllEmployees());
    answers.role_id = searchRoleId(answers.role_id, await getRoles());
    changeEmployeeRole(answers);
}
async function getDepartmentNames(){
    const departments = await getDepartments()
    const departmentNames = []
    for(let i=0; i<departments.length; i++){
        const name = departments[i].department_name;
        departmentNames.push(name);
    }
    return departmentNames
}
async function getEmployeeNames(){
   const employees = await getAllEmployees()
   const employeeNames = []
   for(let i=0; i<employees.length; i++){
        const name = employees[i].employee_name;
        employeeNames.push(name);
    }
    return employeeNames
}
async function getRoleNames(){
    const roles = await getRoles();
    const roleNames = [];
    for(let i=0; i<roles.length; i++){
        const name = roles[i].title;
        roleNames.push(name);
    }
    return roleNames
}
function searchDepartmentId(key, array){
    const department = array.find(d => d.department_name === key)
    return department.id
}
function searchEmployeeId(key, array){
    const employee = array.find(e => e.employee_name === key)
    return employee.id
}
function searchRoleId(key, array){
    const role = array.find(r => r.title === key)
    console.log(role.id)
    return role.id
}
async function main(){
    while (await choices());
    await closeConnection();
}
main()