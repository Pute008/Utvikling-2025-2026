// Fra timen
let arrayNavn = ["Ola", "Kari", "Per"];

console.log(arrayNavn);

for (let navn of arrayNavn) {
    console.log(navn);
}

console.log(arrayNavn[1]);

let person = {
    navn: "felix",
    etternavn: "westby",
    alder: 17
}

console.log(person)
console.log(person.alder)


let arrayPersoner = [
    {
        navn: "kari",
        alder: 30,
    },
    {
        navn: "ola",
        alder: 25,
    },
    {
        navn: "per",
        alder: 28,
    }
]

console.log(arrayPersoner[1])
console.log(arrayPersoner[2].navn)

arrayPersoner.push(person);

// utskrift
console.log("\nHer kommer aller personene i arrayen")

for (let person of arrayPersoner) {
    // console.log(person);
    if (person.alder >= 30) {
        console.log(person.navn);
    }
    
}

for (let index = 0; index < arrayPersoner.length; index++) {
    // console.log(arrayPersoner[index].navn);
    if (arrayPersoner[index].alder >= 30) {
        console.log(arrayPersoner[index].navn);
    }

}


// hvordan man fjerner noe fra index
for (let index = 0; index < arrayPersoner.length; index++) {
    // console.log(arrayPersoner[index].navn);
    if (arrayPersoner[index].alder >= 30) {
        console.log("Fjerner nå: " + arrayPersoner[index].navn);
        arrayPersoner.splice(arrayPersoner[index], 1)
    }

}










// A Univers tekst oppgaver

let a = [1, 2, 3];
let b = Array.from(a);

// b[1] = 4;

console.log(a);
console.log(b);


// array i en array (få tilgang til alle enkeltverdiene i hvert array)

let retter = [
  ["laksetartar", "ertesuppe"],
  ["biff med rødvinssaus", "lammeskank"],
  ["jordbæris", "eplekake"]
];

for (let i = 0; i < retter.length; i++) {
  for (let j = 0; j < retter[i].length; j++) {
    console.log(retter[i][j]);
  }
}


// sortere tekst i en array

let drikke = ["te", "vann", "kaffe", "appelsinsaft"];
drikke.sort();
console.log(drikke);
// Skriver ut: ["appelsinsaft", "kaffe", "te", "vann"]