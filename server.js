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

app.get("/aufgaben", async (req, res) => {
    const [rows] = await connection.execute("SELECT * from aufgaben");
    res.json(rows);
});

app.get("/benutzer", async (req, res) => {
    const [rows] = await connection.execute("SELECT * from benutzer");
    res.json(rows);
});

app.listen(55);