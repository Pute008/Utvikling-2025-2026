async function register(event) {
    event.preventDefault();
    
    const brukernavn = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const fornavn = document.getElementById("firstname").value;
    const etternavn = document.getElementById("lastname").value;
    const errorDiv = document.getElementById("error-message");

    // Clear error messages
    errorDiv.textContent = "";

    // Validate passwords match
    if (password !== confirmPassword) {
        errorDiv.textContent = "Passwords do not match";
        return;
    }

    // Validate password length
    if (password.length < 6) {
        errorDiv.textContent = "Password must be at least 6 characters";
        return;
    }

    try {
        const response = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email, 
                password, 
                brukernavn, 
                fornavn, 
                etternavn 
            })
        });

        const result = await response.json();
        if (response.ok) {
            // Show success message and redirect
            alert("Registration successful! Please login with your credentials.");
            window.location.href = result.redirect;
        } else {
            errorDiv.textContent = result.message || "Registration failed";
        }
    } catch (error) {
        errorDiv.textContent = "An error occurred. Please try again.";
        console.error("Registration error:", error);
    }
}
