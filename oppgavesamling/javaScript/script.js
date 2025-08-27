// let tall = document.getElementById('userTall');

// tall.addEventListener('click', function(){
//     document.getElementById("textID").innerText = tall;
// });









let number = 10;

const navn = "Felix";

let arrayBilder = ["bilde1.jpg", "bilde2.png"];

const PI = Math.PI;

console.log("Nummeret ditt er: " + number);
console.table(arrayBilder);
console.warn(PI);

let alder = parseInt(prompt("Hvor gammel er du? "));
let årstall = alder + 1980;
console.log("Du er " + årstall + " år gammel.")

document.getElementById("utskrift").innerText = "Du er " + årstall + " år gammel.";

let passord = document.getElementById("viktigdata").innerHTML;
console.log(passord);