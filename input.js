const inquirer = require('inquirer');

const mainMenu = [];
const roles = [ 'Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager','Accountant',
                'Legal Team Lead',
                'Lawyer'];

const roleTitleArray = roles.map($title => {
    return $title;
})
const newEmployee = [
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
    }
    
];

function addEmployee() {
    return inquirer.prompt(newEmployee);
}

module.exports = {   
                    addEmployee };
                    // viewEmployees,
                    // updateEmployee, 
                    // viewRole,
                    // addRole, 
                    // viewDepartment,
                    // addDepartment };