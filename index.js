
const db = require('./db/connection.js');
const { // viewEmployees, 
        addEmployee,
        mainMenu } = require('./input.js');
        // updateEmployee, 
        // viewRole,
        // addRole, 
        // viewDepartment,
        // addDepartment 


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
  });

function queryAddEmployee() { 
    const sql = `SELECT * from personnel left join roles on personnel.role_id=roles.id`;
    // const sql = `SELECT title FROM roles`;
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
    .catch(err => { console.log(err) })
    // .then( () => {
    //     return console.log('Exit');
    // } );// db.end());    // mainMenu());
}

// mainMenu();
queryAddEmployee();

module.exports = queryAddEmployee;

