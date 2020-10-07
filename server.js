const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

mysql
    .createConnection({
        host: "localhost",
        user: "root",
        database: "aufgabenmanager",
    })
    .then((con) => {
        connection = con;
    });

app.use(express.static("public"));
app.use(express.json());