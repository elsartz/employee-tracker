const res = require('express/lib/response');
const db = require('./db/connection');
const { // viewEmployees, 
        addEmployee } = require('./input.js');
        // updateEmployee, 
        // viewRole,
        // addRole, 
        // viewDepartment,
        // addDepartment 


db.connect(err => {
    if (err) throw err;
    // console.log('Database connected.');
  });


const sql = `SELECT title FROM roles`;
db.promise().query(sql)
.then((rows) => {
    {
        let role = rows[0].map(({title}) => title);
    //    console.log('role:',role, 'rows:',rows[0]);
        addEmployee(role);
    }
})
.catch(err => { console.log(err) })
.then( () => db.end());


// select * from personnel left join roles on personnel.role_id=roles.id;

const com1 = "mysqlshow -u root --password=MyNewPass employee personnel"
const com2 = "mysqlshow -u root --password=MyNewPass employee "
const com3 = `mysql -u root --password=MyNewPass -D employee -e "select * from personnel"`
var exec = require('child_process').exec;

// exec(com1,
//     function (error, stdout, stderr) {
//         console.log('stdout: ' + stdout);
//         // console.log('stderr: ' + stderr);
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//     });



// addEmployee(role);