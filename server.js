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


app.post("/register", async (req, res) => {
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


app.post("/login", async (req, res) => {

  try {
    const [rows] = await connection.execute("SELECT * FROM benutzer WHERE email = ? AND passwort = ?", [req.body.email, req.body.passwort]);
    if (rows[0].email == req.body.email && rows[0].passwort == req.body.passwort) {
      res.status(200).send();
    } else {
      res.status(401).send();
    }

  } catch (err) {
    res.status(500).send('Login fehlgeschlagen');
  }

});

app.post("/aufgaben", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO aufgaben (aufgabenName, erstelldatum, abgabedatum, beschreibung, stand, benutzerID) VALUES (?, ?, ?, ?, ?, ?)",
    [req.body.aufgabenName, req.body.erstelldatum, req.body.abgabedatum, req.body.beschreibung, req.body.stand, req.body.benutzerID]
  ).catch((err) => { res.status(500).send('Hinzufügen fehlgeschlagen'); });

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

app.put("/aufgaben", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM aufgaben WHERE id=?", [req.body.id]);
  try {
    if (req.body.aufgabenName != rows.aufgabenName) {
      const [rows] = await connection.execute("UPDATE aufgaben SET aufgabenName=? WHERE id=?", [req.body.aufgabenName, req.body.id]);
    }
    if (req.body.abgabedatum != rows.abgabedatum) {
      const [rows] = await connection.execute("UPDATE aufgaben SET abgabedatum=? WHERE id=?", [req.body.abgabedatum, req.body.id])
    }
    if (req.body.beschreibung != rows.beschreibung) {
      const [rows] = await connection.execute("UPDATE aufgaben SET beschreibung=? WHERE id=?", [req.body.beschreibung, req.body.id])
    }
    if (req.body.benutzerID != rows.benutzerID) {
      const [rows] = await connection.execute("UPDATE aufgaben SET benutzerID=? WHERE id=?", [req.body.benutzerID, req.body.id])
    }
  } catch (err) {
    return res.status(500).send('Update fehlgeschlagen');
  }

  res.status(200).send();
});

app.post("/benutzer", async (req, res) => {
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO benutzer (benutzerName, email, passwort) VALUES (?, ?, ?)",
    [req.body.benutzerName, req.body.email, req.body.passwort]
  ).catch((err) => { res.status(500).send('Hinzufügen fehlgeschlagen'); });

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

app.put("/benutzer", async (req, res) => {
  const [rows] = await connection.execute("SELECT * FROM benutzer WHERE id=?", [req.body.id]);
  try {
    if (req.body.benutzerName != rows.benutzerName) {
      const [rows] = await connection.execute("UPDATE benutzer SET benutzerName=? WHERE id=?", [req.body.benutzerName, req.body.id]);
    }
    if (req.body.email != rows.email) {
      const [rows] = await connection.execute("UPDATE benutzer SET email=? WHERE id=?", [req.body.email, req.body.id])
    }
    if (req.body.passwort != rows.passwort) {
      const [rows] = await connection.execute("UPDATE benutzer SET passwort=? WHERE id=?", [req.body.passwort, req.body.id])
    }

  } catch (err) {
    return res.status(500).send('Update fehlgeschlagen');
  }

  res.status(200).send();
});

app.patch("/aufgaben/:id/:status", async (req, res) => {
  try {
    const [rows] = await connection.execute("UPDATE aufgaben SET stand=? WHERE id=?", [req.params.status, req.params.id]);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
  res.status(200).send();

});

app.listen(55);