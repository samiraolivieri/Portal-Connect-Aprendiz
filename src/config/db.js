const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'alunolab',
  database: process.env.DB_NAME || 'connect',
  port: '3303'
});

module.exports = db.promise(); // Usamos promise para facilitar o código no controller