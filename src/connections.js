const { Client } = require("pg");

const client = new Client({
 user: process.env.USER,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  host: process.env.HOST,
  password: process.env.PASSWORD,
});


module.exports = client ;