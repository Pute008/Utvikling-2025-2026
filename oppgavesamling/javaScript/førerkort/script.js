// let array = [
//     "16 år: moped",
//     "18 år: bil",
//     "21 år: lastebil",
//     "24 år: buss"
// ];

document.querySelector("form").addEventListener("submit", test);

function test(event) {
    event.preventDefault()
    let alder = document.querySelector("#age").value;
    console.log(alder);
    if (alder < 16) {
        console.log("Du er for ung til å kunne kjøre noe!")
        return
    } else if (alder >= 16) {
        console.log("Du er " + alder + " år og kan kjøre...")

        if (alder >= 16 && alder < 18) {
            console.log(alder16)
        } else if (alder >= 18 && alder < 21) {
            console.log(alder18)
        } else if (alder >= 21 && alder < 24) {
            console.log(alder21)
        }
    }
}

// let hvaDuKanKjøre = [
//     'moped',
//     'personbil',
//     'lastebil'
// ]

let alder16 = [
    'moped'
]

let alder18 = [
    'moped',
    'personbil'
]

console.log(alder18)

let alder21 = [
    'moped',
    'personbil',
    'lastebil'
]

let alder24 = [
    'moped',
    'personbil',
    'lastebil',
    'buss'
]










// for (let index = 0; index < hvaDuKanKjøre.length; index++) {
//     console.log(hvaDuKanKjøre)
// }

// for (let navn of hvaDuKanKjøre) {
//     console.log(navn)
// }