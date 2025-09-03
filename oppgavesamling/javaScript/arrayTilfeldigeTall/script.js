let array = [];
let totalSum = 0;

for (let tall = 1; tall <= 200; tall++) {
    let tilfeldig = getRandomIntInclusive(1, 100);
    array.push(tilfeldig); //må ha en variabel
    totalSum += tilfeldig;
}
console.log(array);
console.log(totalSum);

// let sum = array.reduce((acc, curr) => acc + curr, 0);
// console.log(sum)

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}