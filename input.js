const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

function start() {
    console.log(` 
                  -----------------------------------
                  |                                 |
                  |      Employee organizer         |
                  |                                 |
                  -----------------------------------
    
    `);
    mainMenu();
}
function viewEmployees () {
    // return console.log('View all employees from console.table');
    const sql = `SELECT *, department.name AS department from personnel left join roles on personnel.role_id=roles.idr join department on roles.dep_id=department.idd`;
    db.promise().query(sql)
        .then((data) => {

            let columns = data[0].map(({
                id, first_name, last_name, title, department, salary, manager_id
            }) => ({
                id, first_name, last_name, title, department, salary, manager_id
            })) 

            const table = cTable.getTable(columns);
            // add some space after the printout
            console.log('\n',table)
                // for (let i=5; i<columns.length; i++) {
                //     console.log('\n');
                // };
        }).catch(err => { console.log(err) })
    
    return;
   
}

function viewRoles () {
    const sql = `select * from roles left join department on roles.dep_id=department.idd`;
    db.promise().query(sql)
        .then((data) => {
            let columns = data[0].map(({
                idr, title, name, salary
            }) => ({
                idr, title, name, salary
            }))
            const table = cTable.getTable(columns);
            // add some space after the printout
            console.log('\n',table)
                // for (let i=5; i<columns.length; i++) {
                //     console.log('\n');
                // };
        }).catch(err => { console.log(err) })
    return;
}

function viewDepartment () {
    const sql = `select * from department`;
    db.promise().query(sql)
        .then((data) => {
            let columns = data[0].map(({
                idd, name
            }) => ({
                idd, name
            }))
            const table = cTable.getTable(columns);
            // add some space after the printout
            console.log('\n',table)
                // for (let i=0; i<columns.length; i++) {
                //     console.log('\n');
                // };
        }).catch(err => { console.log(err) })
    return;
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

              result = (Object.values(answer))[0];
            
                    if (result === 'View all employees') {
                        viewEmployees();
                         mainMenu();
                    } else if (result === 'Add Employee') {
                        queryAddEmployee();
                    } else if (result === 'Update Employee role') {
                        queryAlterEmployee();
                         mainMenu();
                    } else if (result === 'View all roles') {
                        viewRoles();
                        mainMenu();
                    } else if (result === 'Add role') {
                        queryAddRole();
                        //  mainMenu();
                    } else if (result === 'View all departments') {
                        viewDepartment();
                         mainMenu();
                    } else if (result === 'Add department') {
                        addDepartment();
                      
                    } else if (result === 'Quit') {
                        return db.end();
                    }                
        }) 
};

function addDepartment() {

    inquirer.prompt([
       {
           type: 'input',
           name: 'department',
           message: "What is the name of the department?",
           validate: nameInput_1 => {
               if (nameInput_1) {
                   return true;
               } else {
                   console.log('Please enter a valid name');
                   return false;
               }
           }
       
       }
   ]).then((answer) => {
       let department = Object.values(answer);
       const sql = `INSERT INTO department (name) VALUES ('${department[0]}')`;
       db.promise().query(sql)
           .then((rows) => {
               console.log('Department added');
               mainMenu();
           }).catch(err => { console.log(err) });
   })
}

function queryAddRole() {
    const sql = `SELECT name FROM department`;
    db.promise().query(sql)
    .then((rows) => { 
        let department = rows[0].map(({name}) => name);
        // console.log(department);
        addRole(department);
    }).then(() => {return});
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
        // console.log(newRole);
        let role = Object.values(newRole);
        const sql = `INSERT INTO roles (title, salary, dep_id) VALUES ('${role[0]}','${role[1]}','1')`;
        db.query(sql, function (err, rows) {
            if (err) throw err;
            console.log('Role added');
        })
    }).then(() => {
        return mainMenu();
    });
    
}

function queryAddEmployee() { 
    const sql = `SELECT * from personnel left join roles on personnel.role_id=roles.idr`;
    // SELECT * from personnel left join roles on personnel.role_id=roles.idr join department on roles.dep_id=department.idd
    db.promise().query(sql)
        .then((rows) => {    
            
            let role = rows[0].map(({title}) => title);
            let first = rows[0].map(({first_name}) => first_name);
            let last = rows[0].map(({last_name}) => last_name);

            let firstLast =[];
            for (var i = 0; i < rows[0].length; i++) {
                firstLast.push(first[i] +' '+ last[i]);
            }               
            addEmployee(role, firstLast);    
        }
    )
    .catch(err => { console.log(err) });

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
    }).then(() => {
        return mainMenu();
    });
}

let id = [];
function queryAlterEmployee () {
   
    let sql = `SELECT id, first_name, last_name FROM personnel`;
    const query1 = db.promise().query(sql)
        .then((rows) => {

            let emplId = rows[0].map(({id}) => id);
            let first = rows[0].map(({first_name}) => first_name);
            let last = rows[0].map(({last_name}) => last_name);

            let firstLast =[];
            for (var i = 0; i < rows[0].length; i++) {
                firstLast.push(first[i] +' '+ last[i]);
            }  
            
            for (var i = 0; i < emplId.length; i++) {
                id.push(parseInt(emplId[i]));
            }  
        
            updateFirstQuery(id, firstLast);
        
            const sql2 = `SELECT idr, title from roles`;
            const query2 = db.promise().query(sql2)
                .then((rows) => {
           
                    let idr = rows[0].map(({idr}) => idr);
                    let title = rows[0].map(({title}) => title);
                })               
        })
    // return updateEmployee(idr, id);
}

function updateFirstQuery(employeeId, employeeName) {
    let employee = employeeName.map($name => {return $name});
    let id = employeeId.map($id => {return $id});
   
    let emplID = [];
    for (var i = 0; i < employee.length; i++) {
        emplID.push(id[i]+'-'+employee[i]);
    }

    return inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: "Which employee's role do you want to update?",
            choices: emplID
        }
    ]).then(data => {
        record = Object.values(data);
        console.log('record',record);
        let newrec = record[0].split('-');
        id = newrec[0];
        console.log('id',id);
    })
}

function updateEmployee(roleId, employeeId) {
    return console.log('Employee updated');
}

start();
// mainMenu();
// addEmployee();
// queryAddEmployee();
// addDepartment();
// queryAddRole();
// queryAlterEmployee();