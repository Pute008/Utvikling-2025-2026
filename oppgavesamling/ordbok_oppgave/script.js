// ORDBOK DATASETT
// Dette datasettet inneholder 3 ord med ulike bruksområder (ordklasser) og definisjoner

// NB NB NB NB!!! Eksempeldataene under er direkte feil og mangelfulle, de er kun ment som utgangspunkt for oppgavene!

const ordbok = [
    {
        ord: "løpe",
        ordklasser: [
            {
                type: "verb",
                definisjon: "å bevege seg raskt ved å sette det ene beinet foran det andre i rask rekkefølge",
                eksempel: "Han må løpe for å rekke bussen."
            },
            {
                type: "substantiv",
                definisjon: "et løp, en distanse som tilbakelegges ved å løpe",
                eksempel: "Det var et langt løpe til toppen."
            }
        ],
        popularitet: 95,
        antallBokstaver: 4
    },
    {
        ord: "lys",
        ordklasser: [
            {
                type: "substantiv",
                definisjon: "elektromagnetisk stråling som gjør at vi kan se",
                eksempel: "Lyset fra solen er sterkt."
            },
            {
                type: "adjektiv",
                definisjon: "ikke mørk, av lys farge",
                eksempel: "Hun har lyst hår."
            },
            {
                type: "verb",
                definisjon: "å gi lys, å skinne",
                eksempel: "Stearinlyset lyser i mørket."
            }
        ],
        popularitet: 88,
        antallBokstaver: 3
    },
    {
        ord: "fast",
        ordklasser: [
            {
                type: "adjektiv",
                definisjon: "ikke løs, solid, stabil",
                eksempel: "Bordet står fast på gulvet."
            },
            {
                type: "adjektiv",
                definisjon: "regelmessig, permanent",
                eksempel: "Han har fast jobb."
            },
            {
                type: "substantiv",
                definisjon: "periode uten mat",
                eksempel: "Under fasten spiser man ikke."
            }
        ],
        popularitet: 72,
        antallBokstaver: 4
    }
];

// Skriv ut det opprinnelige datasettet
console.log("=== ORDBOK DATASETT ===");
console.table(ordbok);

console.log("\n=== OPPGAVER ===");
console.log("Løs oppgavene under ved å bruke array-funksjoner som filter, find, map, reduce, some, every og sort.\n");

// =====================================
// OPPGAVE 1: filter
// =====================================
// Filtrer ut alle ord som har 3 eller flere ordklasser
console.log("--- OPPGAVE 1 ---");
console.log("Oppgave: Filtrer ut alle ord som har 3 eller flere ordklasser");
// Skriv koden din her:


// =====================================
// OPPGAVE 2: find
// =====================================
// Finn det første ordet som har en popularitet over 85
console.log("\n--- OPPGAVE 2 ---");
console.log("Oppgave: Finn det første ordet som har en popularitet over 85");
// Skriv koden din her:


// =====================================
// OPPGAVE 3: map
// =====================================
// Lag et nytt array som inneholder bare ordene (strengene) fra ordbok-arrayet
console.log("\n--- OPPGAVE 3 ---");
console.log("Oppgave: Lag et nytt array med bare ordene");
// Skriv koden din her:


// =====================================
// OPPGAVE 4: map (avansert)
// =====================================
// Lag et nytt array med objekter som inneholder ord og antall ordklasser
// Formatet skal være: { ord: "løpe", antallOrdklasser: 2 }
console.log("\n--- OPPGAVE 4 ---");
console.log("Oppgave: Lag array med ord og antall ordklasser");
// Skriv koden din her:


// =====================================
// OPPGAVE 5: reduce
// =====================================
// Beregn totalt antall ordklasser for alle ord til sammen
console.log("\n--- OPPGAVE 5 ---");
console.log("Oppgave: Beregn totalt antall ordklasser");
// Skriv koden din her:


// =====================================
// OPPGAVE 6: reduce (avansert)
// =====================================
// Beregn gjennomsnittlig popularitet for alle ord
console.log("\n--- OPPGAVE 6 ---");
console.log("Oppgave: Beregn gjennomsnittlig popularitet");
// Skriv koden din her:


// =====================================
// OPPGAVE 7: some
// =====================================
// Sjekk om minst ett ord kan brukes som verb
console.log("\n--- OPPGAVE 7 ---");
console.log("Oppgave: Sjekk om minst ett ord kan brukes som verb");
// Skriv koden din her:


// =====================================
// OPPGAVE 8: every
// =====================================
// Sjekk om alle ord har minst 2 ordklasser
console.log("\n--- OPPGAVE 8 ---");
console.log("Oppgave: Sjekk om alle ord har minst 2 ordklasser");
// Skriv koden din her:


// =====================================
// OPPGAVE 9: sort
// =====================================
// Sorter ordene etter popularitet (høyest først)
console.log("\n--- OPPGAVE 9 ---");
console.log("Oppgave: Sorter etter popularitet (høyest først)");
// Skriv koden din her:


// =====================================
// OPPGAVE 10: Kombinasjon (filter + map)
// =====================================
// Filtrer ut ord som kan brukes som adjektiv, og lag et array med bare ordene
console.log("\n--- OPPGAVE 10 ---");
console.log("Oppgave: Finn ord som kan brukes som adjektiv");
// Skriv koden din her:


// =====================================
// OPPGAVE 11: Kombinasjon (filter + reduce)
// =====================================
// Finn totalt antall bokstaver i alle ord som har popularitet over 80
console.log("\n--- OPPGAVE 11 ---");
console.log("Oppgave: Tell bokstaver i populære ord (>80)");
// Skriv koden din her:


// =====================================
// OPPGAVE 12: Avansert (flatMap eller map + flat)
// =====================================
// Lag et array med alle definisjoner fra alle ord
// Tips: Du må kanskje bruke map og flat, eller flatMap
console.log("\n--- OPPGAVE 12 ---");
console.log("Oppgave: Lag array med alle definisjoner");
// Skriv koden din her: