const express = require("express");
const sqlite3 = require("sqlite3").verbose();

// Skapa en ny Express-applikation
const server = express();

// Middleware
server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*"); // Tillåt alla metoder (GET, POST, etc.)
    next();
  });

// Create Database Connection
const db = new sqlite3.Database("./gik339-labb2.db", (err) => {
  if (err) {
    console.error(err.message); //Logga felmeddelandet om det finns något problem
  }
  console.log("Connected to the gik339-labb2.db database."); //Bekräfta att databasanslutningen är finns och fungerar
});

// Define GET Route
server.get("/user", (req, res) => {
  const sql = "SELECT * FROM USERS"; // SQL-frågan för att hämta alla användare

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message); // Skicka ett serverfel om SQL-frågan misslyckas
      return;
    }
    res.send(rows); // Skicka användardata som svar om SQL-frågan lyckas
  });
});

// Start the Server och lyssna på port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
