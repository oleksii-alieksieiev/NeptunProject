const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Fehler bei der MySQL-Verbindung:", err);
    return;
  }

  console.log("Mit MySQL verbunden!");
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Neptun Backend läuft!");
});

app.get("/api/customers", (req, res) => {
  const sql = "SELECT * FROM customers";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fehler beim Laden der Kunden:", err);
      return res.status(500).json({ error: "Datenbankfehler" });
    }

    res.json(results);
  });
});

app.post("/api/customers", (req, res) => {
  console.log("POST /api/customers wurde aufgerufen");
  const { name, email, phone } = req.body;

  const sql = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";

  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error("Fehler beim Erstellen des Kunden:", err);
      return res.status(500).json({ error: "Datenbankfehler" });
    }

    res.status(201).json({
      id: result.insertId,
      name: name,
      email: email,
      phone: phone,
    });
  });
});

app.delete("/api/customers/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM customers WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Fehler beim Löschen des Kunden:", err);
      return res.status(500).json({ error: "Datenbankfehler" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kunde nicht gefunden" });
    }

    res.json({
      message: "Kunde erfolgreich gelöscht",
      id: id,
    });
  });
});

app.put("/api/customers/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;

  const sql =
    "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?";

  db.query(sql, [name, email, phone, id], (err, result) => {
    if (err) {
      console.error("Fehler beim Aktualisieren des Kunden:", err);
      return res.status(500).json({ error: "Datenbankfehler" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Kunde nicht gefunden" });
    }

    res.json({
      message: "Kunde erfolgreich aktualisiert",
      id: id,
      name: name,
      email: email,
      phone: phone,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
