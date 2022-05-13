const inquirer = require('inquirer');
const queryAddEmployee = require('./index');
const db = require('./db/connection');
const cTable = require('console.table');

function viewEmployees () {
    // return console.log('View all employees from console.table');
    const sql = `SELECT *, department.name AS department from personnel left join roles on personnel.role_id=roles.idr join department on roles.dep_id=department.idd`;
    db.promise().query(sql)
        .then((data) => {
            // console.log('data:',data[0]);

            let columns = data[0].map(({
                id, first_name, last_name, title, department, salary, manager_id
            }) => ({
                id, first_name, last_name, title, department, salary, manager_id
            })) 
            // console.log('columns', columns);

    const table = cTable.getTable(columns);
      
    console.log('\n',table)
        for (let i=5; i<columns.length; i++) {
            console.log('\n');
        };
}).catch(err => { console.log(err) })
    
    return;
   
}

function viewRoles () {
    return console.log('View all roles from console.table');
}

function viewDepartment () {
    return console.log('View all department from console.table');
}

function mainMenu() {
    return inquirer.prompt([
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
    ]).then((answer) => {
// console.log(answer); return;
              result = (Object.values(answer))[0];
            //   console.log(' the console',result);
                    if (result === 'View all employees') {
                        viewEmployees();
                        // console.log('View all employees');
                         mainMenu();
                    } else if (result === 'Add Employee') {
                        queryAddEmployee();
                         mainMenu();
                    } else if (result === 'Update Employee role') {
                        console.log('Update Employee role');
                         mainMenu();
                    } else if (result === 'View all roles') {
                        viewRoles();
                        mainMenu();
                    } else if (result === 'Add role') {
                        console.log('Add role');
                         mainMenu();
                    } else if (result === 'View all departments') {
                        viewDepartment();
                         mainMenu();
                    } else if (result === 'Add department') {
                        console.log('Add department');
                         mainMenu();
                    } else if (result === 'Quit') {
                        return db.end();
                    }
                
                }) // .then( () => db.end());
};

function addDepartment() {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What is the name of the department?",
            validate: nameInput => {
                if (nameInput) {
                    return true;                
                } else {
                    console.log('Please enter a valid name');
                    return false;
                }
            }
            
        }
    ]).then (newDepartment => {
        // console.log(newDepartment);
        let department = Object.values(newDepartment);
        const sql = `INSERT INTO department (name) VALUES ('${department}')`;
        db.query(sql, function (err, rows) {
            if (err) throw err;
            console.log('Department added');
        })
    }).then(() => db.end());

    
}

function addRole(department) {
    let departmentArray = department.map($title => {
        return $title;
    });
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What is the name of the role?",
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
            name: 'salary',
            message: "What is the salary of that role?",           
        },
        {
            type: 'list',
            name: 'department',
            message: "Which department belongs to?",
            choices: departmentArray            
        }
    ]).then (newRole => {
        console.log(newRole);
        let role = Object.values(newRole);
        const sql = `INSERT INTO roles (title, salary, dep_id) VALUES ('${role[0]}','${role[1]}','1')`;
        db.query(sql, function (err, rows) {
            if (err) throw err;
            console.log('Role added');
        })
    }).then(() => db.end());

}

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
    ]).then(newEmploy => {
             
        let data = Object.values(newEmploy);
        let fname = data[0];
        let lname = data[1];
        let manager_id = data[2];

        const sqlIds = ``

        role_id = 1; manager_id = 1;
        const sql = `INSERT INTO personnel (first_name, last_name, role_id, manager_id) VALUES ('${fname}','${lname}',${role_id},${manager_id})`;
        db.query(sql, function (err, rows) {
            if (err) throw err;
            console.log('Employee added');
        })
    }).then(() => {return});
}

module.exports = {   
                    addEmployee,
                    addDepartment,
                    addRole,
                    mainMenu };
                    // viewEmployees,
                    // updateEmployee, 
                    // viewRole,
                    //  
                    // viewDepartment,