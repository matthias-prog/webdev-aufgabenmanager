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

app.post("/aufgaben", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO aufgaben (aufgabenName, erstelldatum, abgabedatum, beschreibung, stand, benutzerID) VALUES (?, ?, ?, ?, ?, ?)",
    [req.body.aufgabenName, req.body.erstelldatum, req.body.abgabedatum, req.body.beschreibung, req.body.stand, req.body.benutzerID]
  ).catch();

  res.json({
    id: rows.insertId,
    aufgabenName: req.body.aufgabenName,
    erstelldatum: req.body.erstelldatum,
    abgabedatum: req.body.abgabedatum,
    beschreibung: req.body.beschreibung,
    stand: req.body.stand,
    benutzerID: req.body.benutzerID,
  });
});

app.post("/benutzer", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO benutzer (benutzerName, email, passwort) VALUES (?, ?, ?)",
    [req.body.benutzerName, req.body.email, req.body.passwort]
  );

  res.json({
    id: rows.insertId,
    benutzerName: req.body.benutzerName,
    email: req.body.email,
    passwort: req.body.passwort,
  });
});

app.delete("/aufgaben/:id", async (req, res) => {
  console.log(req.params.id);

  const [rows] = await connection.execute("DELETE FROM aufgaben WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 1) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.delete("/benutzer/:id", async (req, res) => {
  console.log(req.params.id);

  const [rows] = await connection.execute("DELETE FROM benutzer WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 1) {
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

app.listen(55);