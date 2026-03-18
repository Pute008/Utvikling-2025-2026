const express = require("express");
const session = require("express-session");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcrypt");
app.use(cors());

app.use(express.static('public'));

app.use(express.json());

const port = 3000;

app.use(
    session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

function kreverInnlogging(req, res, next) {
    if(!req.session.user) {
        return res.redirect("/index.html")
    }
    next();
}

app.post('/login', async (req, res) => {
    const { email } = req.body;
    const user = db.prepare("SELECT * FROM person WHERE epost = ?").all(email);
    if (!user) {
        return res.status(401).json({ message: "Wrong email or password" });
    }
    req.session.user = { brukernavn: person.brukernavn};
    res.json({ message: "Innlogging vellykket", redirect: "/main" })
});

app.get('/main', kreverInnlogging, (req, res) => {
    res.sendFile(__dirname + "/index2.html");
})

app.get('/api/fjell_info', kreverInnlogging, (req, res) => { 
    const row = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
    res.json(row);
});

app.get('/fjell_info', kreverInnlogging, (req, res) => {
    try {
        const row = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
        res.json(row);
    } catch {
        console.error('Error after catching fjell:', error);
        res.status(500).json({ message: "Could not get fjell" });
    }
})

app.get('/allePersoner', kreverInnlogging, (req, res) => {
    try {
        const row = db.prepare('SELECT brukernavn FROM person').all();
        res.json(row);
    } catch (error) {
        console.error('Error after catching brukernavn:', error);
        res.status(500).json({ message: "Could not get brukernavn" });
    }
})

app.get('/fjellturer/:brukernavn', kreverInnlogging, (req, res) => {
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