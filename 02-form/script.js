const skjema = document.getElementById('kontaktSkjema');
const resultat = document.getElementById('resultat');

skjema.addEventListener('submit', function(e) {
    e.preventDefault();

    const navn = document.getElementById('navn').value.trim();
    const epost = document.getElementById('epost').value.trim();
    const fag = document.getElementById('fag').value.trim();
    const melding = document.getElementById('melding').value.trim();

    resultat.innerHTML = `
    <h3>Takk for innsendelsen!</h3>
	<p><strong>Navn:</strong> ${navn || '(ikke oppgitt)'}</p>
	<p><strong>E-post:</strong> ${epost || '(ikke oppgitt)'}</p>
	<p><strong>Favorittfag:</strong> ${fag}</p>
	<p><strong>Melding:</strong> ${melding || '(ingen melding)'}</p>
    `;

});