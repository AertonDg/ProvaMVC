import mysql from 'mysql2'
import "dotenv/config";


export const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
})
export const handleError = (res, error, message)  => {
    console.error(message, error);
    res.status(500).json({ message });
  }
  
export default conn;