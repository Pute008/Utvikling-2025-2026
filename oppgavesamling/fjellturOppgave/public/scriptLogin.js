async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    const response = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    });

    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        window.location.href = result.redirect;
    } else {
        alert(result.message);
    }
}