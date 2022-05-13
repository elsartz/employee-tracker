
const db = require('./db/connection.js');
const { // viewEmployees, 
        addEmployee,
        addRole,
        addDepartment,
        mainMenu } = require('./input.js');
        // updateEmployee, 
        // viewRole,
        // addRole, 
        // viewDepartment,
        //  


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
  });

function queryAddDepartment() {
    const sql = ``;

} 

function queryAddRole() {
    const sql = `SELECT name FROM department`;
    db.promise().query(sql)
    .then((rows) => { 
        let department = rows[0].map(({name}) => name);
        console.log(department);
        addRole(department);
    })
}

function queryAddEmployee() { 
    const sql = `SELECT * from personnel left join roles on personnel.role_id=roles.idr`;
    // SELECT * from personnel left join roles on personnel.role_id=roles.idr join department on roles.dep_id=department.idd
    db.promise().query(sql)
        .then((rows) => {    
            console.log('rows from addEmployee',rows[0]);
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
    .catch(err => { console.log(err) })
    // .then( () => {
    //     return console.log('Exit');
    // } );// db.end());    // mainMenu());
}

mainMenu();
// queryAddEmployee();
// addDepartment();
// queryAddRole();


module.exports = queryAddEmployee;

