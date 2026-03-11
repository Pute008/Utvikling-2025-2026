async function hentPersoner() {
    const res = await fetch('/allePersoner');
    const personer = await res.json();
    const dropdown = document.getElementById('personDropdown');

    personer.forEach(person => {
        const option = document.createElement('option');
        option.value = person.brukernavn
        option.textContent = person.brukernavn;
        dropdown.appendChild(option)
    });
}
document.addEventListener('DOMContentLoaded', hentPersoner)