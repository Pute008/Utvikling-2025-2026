const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");

const Database = require("better-sqlite3");
const db = new Database("brukere.db");
const app = express()

const port = 3000;

app.use(express.json());

app.use(express.static("public"))

const path = require('path');

// app.use('/beskyttet', kreverInnlogging, express.static(path.join(__dirname, 'beskyttet')));

app.use
    (session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

function kreverInnlogging(req, res, next) {
    if (!req.session.bruker) {
        return res.redirect("/index.html")
    };
    next();
}

app.post("/leggTilPerson", async (req, res) => {
    const { fornavn, etternavn, passord } = req.body;

    const saltRounds = 10;
    const hashPassord = await bcrypt.hash(passord, saltRounds);
    const stmt = db.prepare("INSERT INTO brukere (fornavn, etternavn, passord) VALUES (?, ?, ?)");
    const info = stmt.run(fornavn, etternavn, hashPassord);

    res.json({ message: "Ny person lagt til", info });
})

app.post("/login", async (req, res) => {
    const { fornavn, passord } = req.body;

    const bruker = db.prepare("SELECT * FROM brukere WHERE fornavn = ?").get(fornavn);
    if (!bruker) {
        return res.status(401).json({ message: "Feil fornavn eller passord" });
    }

    const passordErGyldig = await bcrypt.compare(passord, bruker.passord);
    if (!passordErGyldig) {
        return res.status(401).json({ message: "Feil fornavn eller passord" });
    }

    req.session.bruker = { id: bruker.id, fornavn: bruker.fornavn };
    res.json({ message: "Innlogging vellykket", redirect: "/homeSide" })
})

app.get("/getUser", (req, res) => {
    const users = db.prepare("SELECT * FROM user").all();
    res.json(users);
});

app.get("/homeSide", kreverInnlogging, (req, res) => {
    res.sendFile(__dirname + "/hidden/index.html");
});

// app.use('/hidden', kreverInnlogging, express.static(path.join(__dirname, 'secure')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})


// app.use('/hidden', express.static(path.join(__dirname, 'hidden')));