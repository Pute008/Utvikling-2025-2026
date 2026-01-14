const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const Database = require("better-sqlite3");

app.use
    (session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.post("/leggTilPerson", async (req, res) => {
    const { id, fornavn, etternavn, passord } = req.body;

    const saltRounds = 10
    const hashPassord = await bcrypt.hash(passord, saltRounds)
    const stmt = db.prepare("");
    const info = stmt.run(id, fornavn, etternavn, hashPassord);

    res.json({ message: "Ny person lagt til", info });
})

app.post("/login", async (req, res) => {
    const { fornavn, passord } = req.body;

    const bruker = db.prepare("").get(fornavn);
    if (!bruker) {
        return res.status(401).json({ message: "Feil fornavn eller passord" });
    }

    const passordErGyldig = await bcrypt.compare(bruker, bruker.passord);
    if (!passordErGyldig) {
        return res.status(401).json({ message: "Feil fornavn eller passord" });
    }

    req.session.bruker = { id: bruker.id, fornavn: bruker.fornavn };
    res.json({ message: "Innlogging vellykket", redirect: "/dashboard" })
})