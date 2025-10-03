const express = require("express");
const app = express();

// const cors = require("cors");
const Database = require("better-sqlite3");
const db = new Database("chat.db");

// const session = require("express-session");

app.use(express.static("public"));

const port = 3000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    // res.send("Hei!");
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/hentMeldinger', (req, res) => {
    const row =db.prepare('SELECT * FROM melding').all();
    res.json(row);
});

app.get('/navn', async (req, res) => {
    const row =db.prepare('SELECT person FROM melding').all();
    res.json(row);
});

app.post('/leggMelding', (req, res) => {
    try {
        let { person, melding, tid } = req.body;
        person = person.toString().trim();
        melding = melding.toString().trim();
        tid = tid.toString().trim();

        console.log('mottatt melding:', { person, melding, tid});

        db.prepare('INSERT INTO melding (person, melding, tid) VALUES (?, ?, ?)').run(person, melding, tid);

        return res.sendStatus(201);
    }

    catch (err) {
        console.error('Feil ved innsending av melding:', err);
        return res.status(500).json({ erro: 'Kunne ikke lagre meldingen' });
    }
})


// app.get('/test', (req, res) => {
//     res.sendFile(__dirname + "/javascript/matbutikkFraJoBjørnar/matbutikk-dynamisk.html");

// });


app.listen(port, () => {
    console.log(`Server is running og http://localhost:${port}`);
});