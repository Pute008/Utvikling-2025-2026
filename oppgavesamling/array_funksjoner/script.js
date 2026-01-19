const personer = [
    { navn: "Ola", alder: 25 },
    { navn: "Kari", alder: 30 },
    { navn: "Per", alder: 20 },
    { navn: "Lise", alder: 35 },
    { navn: "Nina", alder: 15 },
    { navn: "Morten", alder: 17 },
    { navn: "Felix", alder: 17 },
    { navn: "Lasse", alder: 53 }
];

console.table(personer); // Viser originaldataene i tabellformat

// filtrere innholdet i arrayet og finne de med en alder på 18 år eller over
const voksne = personer.filter(personer => personer.alder >= 18);
console.table(voksne);

// finner den første personen med en alder på 50 år eller over
const personOver50 = personer.find(personer => personer.alder >= 50);
console.table(personOver50);

// henter ut alle navnene i arrayet, men ikke noe annet
const personNavn = personer.map(personer => personer.navn);
console.table(personNavn);

// gir oss summen av alderen til alle i arrayet
const totalAlder = personer.reduce((sum, personer) => sum + personer.alder, 0);
console.log(totalAlder);

// henter ut en verdi på true hvis det er minst ett element med noen som er over en viss verdi eller false hvis ingen over en viss verdi
const noenVoksne = personer.some(personer => personer.alder >= 18);
console.log("Er det minst en person som er over 18 år?", noenVoksne);

// sjekker om alle i elementene oppfyller en bestemt betingelse (feks: er alle verdiene over 18 år eller eldre?)
const alleVoksne = personer.every(personer => personer.alder >= 18);
console.log("Er alle personene over 18 år?", alleVoksne);

const sorterPersoner = personer.slice().sort((a, b) => a.alder - b.alder);
console.table(sorterPersoner);