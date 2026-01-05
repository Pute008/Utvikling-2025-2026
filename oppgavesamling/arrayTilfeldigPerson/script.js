// let kopiNavn = [...navn];

// let tilfeldigPerson = navn[tilfeldigTall];

// console.log(tilfeldigPerson + ": Med tilfeldig indeks lik: " + tilfeldigTall);

let navn = ['Felix', 'Alexander', 'Tim', 'Jo Bjørnar', 'Benedikte', 'Mathias', 'Markus', 'Rick', 'Liam', 'Trond'];

let utvalgtePersoner = [];

let validPersoner = 2


for (let index = 0; index < validPersoner; index++) {
    let tilfeldigTall = Math.floor(Math.random() * navn.length);

    console.log(navn[tilfeldigTall]);

    utvalgtePersoner.push(navn[tilfeldigTall]);

    navn.splice(tilfeldigTall, 1);
}

console.table(navn);