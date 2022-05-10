const inquirer = require('inquirer');
const queryAddEmployee = require('./index');
const db = require('./db/connection');

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [  'View all employees',
                        'Add Employee',
                        'Update Employee role',
                        'View all roles',
                        'Add role',
                        'View all departments',
                        'Add department',
                        'Quit']
        }
    ]).then( function (result) {
               
                    if (result === 'View all employees') {
                        console.log('View all employees');
                        mainMenu();
                    } else if (result === 'Add Employee') {
                        queryAddEmployee();
                    } else if (result === 'Update Employee role') {
                        console.log('Update Employee role');
                        mainMenu();
                    } else if (result === 'View all roles') {
                        console.log('View all roles');
                        mainMenu();
                    } else if (result === 'Add role') {
                        console.log('Add role');
                        mainMenu();
                    } else if (result === 'View all departments') {
                        console.log('View all departments');
                        mainMenu();
                    } else if (result === 'Add department') {
                        console.log('Add department');
                        mainMenu();
                    } else if (result === 'Quit') {
                        return;
                    }
                
                })     //.then( () => db.end());
};


function addEmployee(role, manager) {
    // initiate the role choice
    let roleTitleArray = role.map($title => {
        return $title;
    });
    // initial the manager choice
    let managerNameArray = manager.map($name => {
        return $name;
    })
    // Questions to add an employee
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is employee's first name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;                
                } else {
                    console.log('Please enter a valid name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is employee's last name?",
            validate: lastInput => {
                if (lastInput) {
                    return true;                
                } else {
                    console.log('Please enter a valid name');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleTitle',
            message: "What is employee's role?",
            choices: roleTitleArray
        },
        {
            type: 'list',
            name: 'managerName',
            message: "What is employee's manager?",
            choices: managerNameArray
        }        
    ]);
}

module.exports = {   
                    addEmployee,
                    mainMenu };
                    // viewEmployees,
                    // updateEmployee, 
                    // viewRole,
                    // addRole, 
                    // viewDepartment,
                    // addDepartment };