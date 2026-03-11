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

            const fjellhoyde = document.createElement('p');
            fjellhoyde.textContent = fjell.hoyde;
            rad.appendChild(fjellhoyde);

            tabellBody.appendChild(rad);
        });
        // console.log(data);
    } catch (error) {
        console.error("Fail:", error)
    }
}

fetchData();