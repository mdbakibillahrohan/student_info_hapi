'use strict'
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: "postgres",
    password: "password",
    database: "student_info",
    port: 5432
});

client.connect();

module.exports = client;
