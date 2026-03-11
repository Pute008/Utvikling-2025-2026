const express = require("express");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");

const cors = require("cors");
app.use(cors());

app.use(express.static('public'));

const port = 3000;

app.get('/api/fjell_info', (req, res) => { 
    const row = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
    res.json(row);
});

app.get('/fjell_info', (req, res) => {
    try {
        const row = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
        res.json(row);
    } catch {
        console.error('Error after catching fjell:', error);
        res.status(500).json({ message: "Could not get fjell" });
    }
})

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`)
});