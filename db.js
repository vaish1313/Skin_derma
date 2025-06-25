
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',         // replace with your MySQL password if set
  database: 'skinderma',
  port: 3307,
  
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',         // replace with your MySQL password if set
  database: 'skinderma',
  port: 3307,
  
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
 4a40d26f4cfb5c8be7c965dc401165e017be6eed
