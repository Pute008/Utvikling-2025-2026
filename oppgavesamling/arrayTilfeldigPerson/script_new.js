let navn = ["Felix", "Mads", "Jakov"];

let vinner = []

let antallVinnere = 2

for (let index = 0; index < antallVinnere; index++) {
    let n = Math.floor(Math.random() * navn.length)
    vinner.push(navn[n])
    navn.splice(n, 1)
}

console.table(vinner)