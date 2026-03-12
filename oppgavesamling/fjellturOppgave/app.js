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

app.get('/allePersoner', (req, res) => {
    try {
        const row = db.prepare('SELECT brukernavn FROM person').all();
        res.json(row);
    } catch (error) {
        console.error('Error after catching brukernavn:', error);
        res.status(500).json({ message: "Could not get brukernavn" });
    }
})

app.get('/fjellturer/:brukernavn', (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

    const row = db.prepare(`SELECT fjell.fjellnavn
        FROM person
        INNER JOIN fjelltur
        ON person.brukernavn = fjelltur.brukernavn
        INNER JOIN fjell
        ON fjelltur.fjell_id = fjell.fjell_id
        WHERE person.brukernavn = ?
    `).all(brukernavn);
    
    res.json(row);
})

app.get('/fjellturer_hausnes', (req, res) => {
    const row = db.prepare(`SELECT fjell.fjellnavn
        FROM person
        INNER JOIN fjelltur
        ON person.brukernavn = fjelltur.brukernavn
        INNER JOIN fjell
        ON fjelltur.fjell_id = fjell.fjell_id
        WHERE person.brukernavn = 'hausnes'
    `).all();
    res.json(row);
})

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`)
});