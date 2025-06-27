require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');

  const tableQueries = [
    `CREATE TABLE IF NOT EXISTS community_chat (
      message_id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      message TEXT,
      image_url VARCHAR(500),
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS diseases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      symptoms TEXT,
      remedies TEXT,
      image_url VARCHAR(500)
    )`,

    `CREATE TABLE IF NOT EXISTS doctors (
      doctor_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      city VARCHAR(255),
      phone VARCHAR(50),
      clinic_address VARCHAR(500),
      experience VARCHAR(100),
      specialization VARCHAR(255),
      photo_url VARCHAR(500)
    )`,

    `CREATE TABLE IF NOT EXISTS reviews (
      review_id INT AUTO_INCREMENT PRIMARY KEY,
      doctor_id INT,
      user_id INT,
      rating INT,
      feedback TEXT,
      date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255)
    )`
  ];

  // Execute each CREATE TABLE sequentially
  let completed = 0;
  tableQueries.forEach((query) => {
    connection.query(query, (err) => {
      if (err) throw err;
      console.log(`✅ Table created or already exists.`);
      completed++;
      if (completed === tableQueries.length) {
        console.log('✅ All tables created successfully.');
        connection.end();
      }
    });
  });
});
