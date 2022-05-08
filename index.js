const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'MyNewPass',
        database: 'employee'
    },
console.log('Connected to the employee database.')
);


const com1 = "mysqlshow -u root -p employee personnel"
const com2 = "mysqlshow -u root -p employee "
const com3 = "mysqlshow -u root -p employee personnel first_name last_name"
var exec = require('child_process').exec;

exec(com1,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });