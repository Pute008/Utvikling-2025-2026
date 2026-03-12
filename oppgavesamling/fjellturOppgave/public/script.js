async function fetchData() {
    const tabellBody = document.querySelector('#table')
    try {
        const res = await fetch('/fjell_info');

        const data = await res.json();

        data.forEach(fjell => {
            const rad = document.createElement('div');
            rad.classList.add('fjell')
            
            const fjellnavn = document.createElement('h1');
            fjellnavn.textContent = fjell.fjellnavn;
            rad.appendChild(fjellnavn)

            if (fjell.foto) {
                const foto = document.createElement('img');
                foto.src = "/bilder/" + fjell.foto;
                foto.alt = fjell.fjellnavn;
                foto.style.height = "300px"

                rad.appendChild(foto)
            }

            const fjellhoyde = document.createElement('p');
            fjellhoyde.textContent = fjell.hoyde;
            rad.appendChild(fjellhoyde);

            const fjellbeskrivelse = document.createElement('p');
            fjellbeskrivelse.textContent = fjell.beskrivelse;
            rad.appendChild(fjellbeskrivelse);

            tabellBody.appendChild(rad);
        });
        // console.log(data);
    } catch (error) {
        console.error("Fail:", error)
    }
}

fetchData();