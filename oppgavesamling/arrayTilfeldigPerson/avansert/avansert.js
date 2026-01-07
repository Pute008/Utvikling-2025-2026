function velgTilfeldig(array, antall) {
    let kopi = [...array];

    let valg = [];

    for (let index = 0; index < antall; index++) {
        let tilfeldigIndex = Math.floor(Math.random() * kopi.length);
        let element = navn[tilfeldigIndex];
        valg.push(element);
        kopi.slice(tilfeldigIndex, 1);
    }
    return valg;
}

function parseCsv(csvData) {
    let linjer = csvData.trim().split('\n');
    linjer.shift();
    let brukere = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}