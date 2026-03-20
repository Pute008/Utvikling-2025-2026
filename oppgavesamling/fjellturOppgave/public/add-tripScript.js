function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "/index.html";
    }
}

async function loadMountains() {
    try {
        const response = await fetch('/fjell_info');
        if (!response.ok) throw new Error("Failed to load mountains");
        
        const mountains = await response.json();
        const select = document.getElementById('mountain');
        
        mountains.forEach(mountain => {
            const option = document.createElement('option');
            option.value = mountain.fjell_id;
            option.textContent = `${mountain.fjellnavn} (${mountain.hoyde}m)`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading mountains:", error);
        document.getElementById('error-message').textContent = "Failed to load mountains list";
    }
}

async function addTrip(event) {
    event.preventDefault();
    
    const fjell_id = document.getElementById('mountain').value;
    const tidspunkt = document.getElementById('date').value;
    const varighet = parseInt(document.getElementById('duration').value) || 0;
    const beskrivelse = document.getElementById('description').value;
    
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    errorDiv.textContent = "";
    successDiv.textContent = "";
    
    if (!fjell_id || !tidspunkt) {
        errorDiv.textContent = "Mountain and date are required";
        return;
    }
    
    try {
        const response = await fetch('/add-trip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fjell_id: parseInt(fjell_id),
                tidspunkt,
                varighet,
                beskrivelse
            })
        });
        
        const result = await response.json();
        if (response.ok) {
            successDiv.textContent = "Trip logged successfully!";
            document.querySelector('form').reset();
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 2000);
        } else {
            errorDiv.textContent = result.message || "Failed to add trip";
        }
    } catch (error) {
        errorDiv.textContent = "An error occurred. Please try again.";
        console.error("Error adding trip:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadMountains);
