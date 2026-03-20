function logout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href = "/index.html";
    }
}

let searchTimeout;

async function performSearch(query) {
    if (query.length < 2) {
        document.getElementById('search-suggestions').innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(`/search-users?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Search failed");
        
        const results = await response.json();
        const suggestionsDiv = document.getElementById('search-suggestions');
        
        if (results.length === 0) {
            suggestionsDiv.innerHTML = '<div class="suggestion-item">No users found</div>';
            return;
        }
        
        suggestionsDiv.innerHTML = results.map(user => `
            <div class="suggestion-item" onclick="selectUser('${user.brukernavn}')">
                <strong>${user.brukernavn}</strong> - ${user.fornavn} ${user.etternavn || ''}
            </div>
        `).join('');
    } catch (error) {
        console.error("Error searching users:", error);
    }
}

function selectUser(brukernavn) {
    document.getElementById('userSearch').value = brukernavn;
    document.getElementById('search-suggestions').innerHTML = '';
    loadUserTrips(brukernavn);
}

function clearSearch() {
    document.getElementById('userSearch').value = '';
    document.getElementById('search-suggestions').innerHTML = '';
    document.getElementById('user-info').innerHTML = '';
    document.getElementById('friends-trips').innerHTML = '<p class="empty-message">Select a user to see their profile</p>';
}

async function loadUserTrips(brukernavn) {
    const errorDiv = document.getElementById('error-message');
    const userInfoDiv = document.getElementById('user-info');
    const tripsDiv = document.getElementById('friends-trips');
    
    errorDiv.textContent = "";
    
    try {
        // First, get user info
        const userResponse = await fetch(`/user/${encodeURIComponent(brukernavn)}`);
        if (!userResponse.ok) throw new Error("User not found");
        
        const user = await userResponse.json();
        
        // Display user info
        userInfoDiv.innerHTML = `
            <div class="user-card">
                <h3>${user.brukernavn}</h3>
                <p>${user.fornavn} ${user.etternavn}</p>
                ${user.isOwnProfile ? 
                    '<p class="own-profile">This is your profile</p>' :
                    `<button onclick="sendFriendRequest('${user.brukernavn}')" class="btn-primary">
                        ${user.isFriend ? '✓ Friends' : '+ Add Friend'}
                    </button>`
                }
            </div>
        `;
        
        // Get their trips only if they're a friend or it's own profile
        if (user.isFriend || user.isOwnProfile) {
            // We can view their trips
            const query = user.isOwnProfile ? '/my-trips' : `/fjellturer/${encodeURIComponent(brukernavn)}`;
            const tripsResponse = await fetch(query);
            
            if (!tripsResponse.ok) throw new Error("Could not load trips");
            
            const trips = user.isOwnProfile ? 
                await tripsResponse.json() :
                (await tripsResponse.json()).map((item, idx) => ({...item, fjelltur_id: idx}));
            
            if (trips.length === 0) {
                tripsDiv.innerHTML = '<p class="empty-message">No mountain climbs logged</p>';
                return;
            }
            
            // For non-own profiles, we need to fetch more details
            if (!user.isOwnProfile) {
                const allMountains = await fetch('/fjell_info').then(r => r.json());
                
                tripsDiv.innerHTML = trips.map((trip, idx) => {
                    const mountain = allMountains.find(m => m.fjellnavn === trip.fjellnavn);
                    return `
                        <div class="trip-card">
                            <h3>${trip.fjellnavn}</h3>
                            ${mountain && mountain.foto ? `<img src="/bilder/${mountain.foto}" alt="${trip.fjellnavn}" class="trip-image">` : ''}
                            ${mountain ? `<p class="trip-height"><strong>Height:</strong> ${mountain.hoyde}m</p>` : ''}
                            <p class="trip-description">${mountain ? mountain.beskrivelse : ''}</p>
                        </div>
                    `;
                }).join('');
            } else {
                // Own profile - show full trip details
                tripsDiv.innerHTML = trips.map(trip => `
                    <div class="trip-card">
                        <h3>${trip.fjellnavn}</h3>
                        <p class="trip-date"><strong>Date:</strong> ${new Date(trip.tidspunkt).toLocaleDateString()}</p>
                        <p class="trip-height"><strong>Height:</strong> ${trip.hoyde}m</p>
                        ${trip.varighet ? `<p class="trip-duration"><strong>Duration:</strong> ${trip.varighet} minutes</p>` : ''}
                        ${trip.beskrivelse ? `<p class="trip-description"><strong>Notes:</strong> ${trip.beskrivelse}</p>` : ''}
                    </div>
                `).join('');
            }
        } else {
            tripsDiv.innerHTML = `<p class="empty-message">You must be friends with ${user.brukernavn} to see their trips</p>`;
        }
    } catch (error) {
        console.error("Error loading user trips:", error);
        errorDiv.textContent = "User not found or couldn't load trips";
        userInfoDiv.innerHTML = "";
        tripsDiv.innerHTML = "";
    }
}

async function sendFriendRequest(targetBrukernavn) {
    try {
        const response = await fetch('/friend-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetBrukernavn })
        });
        
        const result = await response.json();
        if (response.ok) {
            alert("Friend request sent!");
            // Reload to update button
            await loadUserTrips(targetBrukernavn);
        } else {
            alert(result.message || "Failed to send friend request");
        }
    } catch (error) {
        alert("Failed to send friend request");
        console.error("Error:", error);
    }
}

// Live search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('userSearch');
    
    // Live search as user types
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300); // Wait 300ms after user stops typing
        } else {
            document.getElementById('search-suggestions').innerHTML = '';
        }
    });
    
    // Allow Enter key to select first result
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const suggestions = document.querySelectorAll('.suggestion-item');
            if (suggestions.length > 0) {
                suggestions[0].click();
            }
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            document.getElementById('search-suggestions').innerHTML = '';
        }
    });
    
    // Check URL params for auto-loading a user
    const params = new URLSearchParams(window.location.search);
    if (params.has('user')) {
        document.getElementById('userSearch').value = params.get('user');
        loadUserTrips(params.get('user'));
    }
});
