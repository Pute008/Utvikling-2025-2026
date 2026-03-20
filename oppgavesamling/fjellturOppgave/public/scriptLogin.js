async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("error-message");

    try {
        const response = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = result.redirect;
        } else {
            errorDiv.textContent = result.message || "Login failed";
        }
    } catch (error) {
        errorDiv.textContent = "An error occurred. Please try again.";
        console.error("Login error:", error);
    }
}