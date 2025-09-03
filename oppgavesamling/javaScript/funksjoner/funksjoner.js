function sum(tall, tall2) {
    let sum = tall + tall2;
    return sum;
    // return er den siste koden som skjører på en linje, så man kan ikke ha noe bak den
}

let antallTall = 90;
let antallTall2 = 37;

let summerAntall = sum(antallTall, antallTall2);

let overskrift = document.createElement("h1");
overskrift.innerText = "Du har totalt jobbet " + summerAntall + " timer";
document.body.appendChild(overskrift);

document.getElementById("knapp").addEventListener("click", siHei);

function siHei() {
    console.log("hei")
}

document.getElementById("knapp").addEventListener("click", function () {
    console.log("ha det bra");
});

// anonym funksjon
document.getElementById("knapp").addEventListener("click", () => {
    console.log("Denne anonyme funksjonen kjører også")
    let overskrift = document.createElement("h1");
    overskrift.innerText = "Du har totalt jobbet " + summerAntall + " timer";
    document.body.appendChild(overskrift);
} );


document.getElementById("knapp").addEventListener("click", () => {
    let overskrift = document.createElement("h1");
    overskrift.innerText = "Du har totalt jobbet " + summerAntall + " timer";
    document.body.appendChild(overskrift);
} );

function siHeiTil(navn) {
    console.log("Hei, " + navn + "!")
}

function hentNavn () {
    let navn = prompt("Hva heter du?");
    siHeiTil(navn);
}

document.getElementById("knapp").addEventListener("click", hentNavn)



// på addeventlistener må man ha "submit" hvis man skal ha en form/skjema
// document.querySelector("#knapp")




