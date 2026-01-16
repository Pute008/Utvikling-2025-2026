"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let navn = ["felix", "alex", "tim"];
let vinner = [];
let antallVinnere = 1;
for (let index = 0; index < antallVinnere; index++) {
    let n = Math.floor(Math.random() * navn.length);
    vinner.push(navn[n]);
    navn.splice(n, 1);
}
console.table(vinner);
//# sourceMappingURL=greeter.js.map
