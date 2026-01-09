function velgTilfeldig(array, antall) {
    let kopi = [...array];

    let valg = [];

    for (let index = 0; index < antall; index++) {
        let tilfeldigIndex = Math.floor(Math.random() * kopi.length);
        let element = kopi[tilfeldigIndex];
        valg.push(element);
        kopi.slice(tilfeldigIndex, 1);
    }
    return valg;
}

function parseCsv(csvData) {
    let linjer = csvData.trim().split('\n');
    linjer.shift();
    let brukere = [];

    for (let linje of linjer) {
        let deler = linje.split(';');

        let fornavn = deler[4].trim();
        let etternavn = deler[5].trim();
        let navn = fornavn + ' ' + etternavn;
        
        brukere.push(navn);
    }
    return brukere;
}

async function lastOgVelgBrukere() {
    try {
        let response = await fetch("users.csv");
        let csvData = await response.text();

        let alleBrukere = parseCsv(csvData);

        let femBrukere = velgTilfeldig(alleBrukere, 5);

        console.log("5 tilfeldige brukere")
        console.log(femBrukere)

        let html = '<h2>5 tilfeldige brukere:</h2><ul>';
        for (let navn of femBrukere) {
            html += '<li>' + navn + '</li>';
        }
        html += '</ul>';

        document.querySelector('#resultat').innerHTML = html;
    } catch (error) {
        console.error('Feil ved lasting av fil:', error);
        document.querySelector('#resultat').innerHTML = '<p style="color: red;">Feil ved lasting av fil</p>';
    }
}

lastOgVelgBrukere();