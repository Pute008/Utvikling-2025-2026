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
        const gridDiv = document.getElementById('mountainGrid');
        
        gridDiv.innerHTML = mountains.map(mountain => `
            <div class="mountain-card" onclick="showGallery(${mountain.fjell_id})">
                ${mountain.foto ? `<img src="/bilder/${mountain.foto}" alt="${mountain.fjellnavn}" class="mountain-image">` : '<div class="no-image">📸</div>'}
                <div class="mountain-card-info">
                    <h3>${mountain.fjellnavn}</h3>
                    <p class="mountain-height">${mountain.hoyde}m</p>
                    <p class="mountain-description">${mountain.beskrivelse}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading mountains:", error);
        document.getElementById('error-message').textContent = "Failed to load mountains";
    }
}

async function showGallery(fjell_id) {
    try {
        const response = await fetch(`/mountain-gallery/${fjell_id}`);
        if (!response.ok) throw new Error("Failed to load gallery");
        
        const data = await response.json();
        
        // Update modal header
        document.getElementById('mountainName').textContent = data.mountain.fjellnavn;
        document.getElementById('mountainInfo').textContent = 
            `Height: ${data.mountain.hoyde}m | ${data.mountain.beskrivelse}`;
        
        // Update stats
        document.getElementById('ascentCount').textContent = data.total_ascents;
        document.getElementById('climbersCount').textContent = data.total_climbers;
        
        // Display trips
        const tripsDiv = document.getElementById('galleryTrips');
        
        if (data.trips.length === 0) {
            tripsDiv.innerHTML = '<p class="empty-message">No one has climbed this mountain yet</p>';
        } else {
            tripsDiv.innerHTML = data.trips.map(trip => `
                <div class="gallery-trip-card">
                    <h4>${trip.fornavn} ${trip.etternavn || ''}</h4>
                    <p class="trip-meta"><strong>@${trip.brukernavn}</strong></p>
                    <p class="trip-date"><strong>Climbed:</strong> ${new Date(trip.tidspunkt).toLocaleDateString()}</p>
                    ${trip.varighet ? `<p class="trip-duration"><strong>Duration:</strong> ${trip.varighet} minutes</p>` : ''}
                    ${trip.beskrivelse ? `<p class="trip-notes"><strong>Notes:</strong> ${trip.beskrivelse}</p>` : ''}
                </div>
            `).join('');
        }
        
        // Show modal
        document.getElementById('galleryModal').style.display = 'block';
    } catch (error) {
        console.error("Error loading gallery:", error);
        alert("Failed to load gallery");
    }
}

function closeGallery() {
    document.getElementById('galleryModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadMountains);
