const inquirer = require('inquirer');

const mainMenu = [];


function addEmployee(role, manager) {
    // let roles = role;
    let roleTitleArray = role.map($title => {
        return $title;
    });

    let managerNameArray = manager.map($name => {
        return $name;
    })

    // console.log(roleTitleArray);
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
                    addEmployee };
                    // viewEmployees,
                    // updateEmployee, 
                    // viewRole,
                    // addRole, 
                    // viewDepartment,
                    // addDepartment };