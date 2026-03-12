async function hentPersoner() {
    const res = await fetch('/allePersoner');
    const personer = await res.json();
    console.log(personer)
    const dropdown = document.getElementById('personDropdown');

    personer.forEach(person => {
        const option = document.createElement('option');
        option.value = person.brukernavn
        option.textContent = person.brukernavn;
        dropdown.appendChild(option)
    });
}
document.addEventListener('DOMContentLoaded', hentPersoner)

// se på og kanskej skrive selv senere
document.getElementById('personDropdown').addEventListener('change', async function() {
    const brukernavn = this.value;
    console.log(`Valgt person: ${brukernavn}`);
    if (brukernavn) {
        const response = await fetch(`/fjellturer/${encodeURIComponent(brukernavn)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const fjellturer = await response.json();
        
        // Sjekker at vi har fått data tilbake, og viser det i konsollen
        console.log(fjellturer); // Her kan du erstatte dette med kode for å vise fjellturene i UI

        // Skriver turene til HTML
        // Først viser vi en overskrift med hvilken person vi viser turene for
        const turerDiv = document.getElementById('fjellturerContainer');
        turerDiv.innerHTML = `<h2>Fjellturer for ${brukernavn}</h2>`;
        // Så viser vi en liste med alle fjellturene
        const ul = document.createElement('ul');
        for (const tur of fjellturer) {
            const li = document.createElement('li');
            li.textContent = tur.fjellnavn;
            ul.appendChild(li);
        }
        turerDiv.appendChild(ul);
    }
});