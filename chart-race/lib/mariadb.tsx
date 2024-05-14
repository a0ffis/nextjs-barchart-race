// import mariadb from "mariadb";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // host: "localhost",
  // user: "root",
  // password: "my-secret-pw",
  // port: 3000,
  database: "population",
  acquireTimeout: 5000,
});

const query = async (query: any, bind: any) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, bind);
    return result;
  } catch (err) {
    console.log("error here : ", err);
    throw err;
  } finally {
    // if (conn) return conn.release();
    if (conn) {
      conn.release();
    }
  }
};

export default { query };
