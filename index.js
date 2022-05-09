const mysql = require('mysql2');

// Connect to database
// const db = 
mysql.createConnection(
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

// db.connect(err => {
//     if (err) throw err;
//         console.log('Database connected.');
//   });


// select * from personnel left join roles on personnel.role_id=roles.id;

const com1 = "mysqlshow -u root --password=MyNewPass employee personnel; exit;"
const com2 = "mysqlshow -u root --password=MyNewPass employee "
const com3 = `mysql -u root --password=MyNewPass -e "select * from personnel"`
var exec = require('child_process').exec;

exec(com1,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });