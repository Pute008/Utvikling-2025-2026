function logout() {
    if (confirm("Are you sure you want to logout?")) {
        // Clear session by redirecting to login (session expires automatically)
        window.location.href = "/index.html";
    }
}

async function loadUserStats(username) {
    try {
        const response = await fetch(`/user-stats/${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error("Failed to load stats");
        
        const stats = await response.json();
        
        // Update stats display
        const statsDiv = document.getElementById('user-stats');
        if (statsDiv) {
            statsDiv.innerHTML = `
                <div class="stat-box">
                    <h4>Mountains Climbed</h4>
                    <p class="stat-number">${stats.trips_count}</p>
                </div>
                <div class="stat-box">
                    <h4>Total Elevation</h4>
                    <p class="stat-number">${stats.total_elevation.toLocaleString()}m</p>
                </div>
                ${stats.highest_mountain ? `
                <div class="stat-box">
                    <h4>Highest Peak</h4>
                    <p class="stat-text">${stats.highest_mountain.fjellnavn}</p>
                    <p class="stat-text">${stats.highest_mountain.hoyde}m</p>
                </div>
                ` : ''}
                <div class="stat-box">
                    <h4>Friends</h4>
                    <p class="stat-number">${stats.friend_count}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error loading stats:", error);
    }
}

async function loadAchievements(username) {
    try {
        // Check and unlock new achievements first
        await fetch('/check-achievements', { method: 'POST' });
        
        // Get current user achievements
        const response = await fetch(`/user-achievements/${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error("Failed to load achievements");
        
        const achievements = await response.json();
        const achievementsDiv = document.getElementById('user-achievements');
        
        if (!achievementsDiv) return;
        
        const unlockedAchievements = achievements.filter(a => a.unlocked_at);
        const lockedAchievements = achievements.filter(a => !a.unlocked_at);
        
        let html = '';
        
        if (unlockedAchievements.length > 0) {
            html += '<div class="achievements-section"><h4>🏆 Unlocked</h4><div class="achievements-grid">';
            html += unlockedAchievements.map(a => `
                <div class="achievement-badge unlocked" title="${a.description}">
                    <div class="achievement-icon">${a.icon}</div>
                    <div class="achievement-name">${a.name}</div>
                </div>
            `).join('');
            html += '</div></div>';
        }
        
        if (lockedAchievements.length > 0) {
            html += '<div class="achievements-section"><h4>🔒 Locked</h4><div class="achievements-grid">';
            html += lockedAchievements.map(a => `
                <div class="achievement-badge locked" title="${a.description}">
                    <div class="achievement-icon">🔒</div>
                    <div class="achievement-name">${a.name}</div>
                </div>
            `).join('');
            html += '</div></div>';
        }
        
        achievementsDiv.innerHTML = html || '<p class="empty-message">No achievements yet</p>';
    } catch (error) {
        console.error("Error loading achievements:", error);
    }
}

async function loadMyTrips() {
    try {
        const response = await fetch('/my-trips');
        if (!response.ok) throw new Error("Failed to load trips");
        
        const trips = await response.json();
        const tripsDiv = document.getElementById('my-trips');
        
        if (trips.length === 0) {
            tripsDiv.innerHTML = '<p class="empty-message">No mountain climbs logged yet. <a href="add-trip.html">Add your first trip!</a></p>';
            return;
        }
        
        tripsDiv.innerHTML = trips.map(trip => `
            <div class="trip-card">
                <h3>${trip.fjellnavn}</h3>
                <p class="trip-date"><strong>Date:</strong> ${new Date(trip.tidspunkt).toLocaleDateString()}</p>
                <p class="trip-height"><strong>Height:</strong> ${trip.hoyde}m</p>
                ${trip.varighet ? `<p class="trip-duration"><strong>Duration:</strong> ${trip.varighet} minutes</p>` : ''}
                ${trip.beskrivelse ? `<p class="trip-description"><strong>Notes:</strong> ${trip.beskrivelse}</p>` : ''}
                <div class="trip-actions">
                    <button onclick="editTrip(${trip.fjelltur_id})" class="btn-small">Edit</button>
                    <button onclick="deleteTrip(${trip.fjelltur_id})" class="btn-small btn-danger">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading trips:", error);
        document.getElementById('my-trips').innerHTML = '<p class="error-message">Failed to load trips</p>';
    }
}

async function loadFriends() {
    try {
        const response = await fetch('/my-friends');
        if (!response.ok) throw new Error("Failed to load friends");
        
        const friends = await response.json();
        const friendsDiv = document.getElementById('my-friends');
        
        if (friends.length === 0) {
            friendsDiv.innerHTML = '<p class="empty-message">You haven\'t added any friends yet. Find friends and add them!</p>';
            return;
        }
        
        friendsDiv.innerHTML = friends.map(friend => `
            <div class="friend-item">
                <a href="friends-trips.html?user=${friend.venn_brukernavn}" class="friend-link">
                    <strong>${friend.venn_brukernavn}</strong>
                </a>
                <button onclick="removeFriend('${friend.venn_brukernavn}')" class="btn-small btn-danger">Remove</button>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading friends:", error);
        document.getElementById('my-friends').innerHTML = '<p class="error-message">Failed to load friends</p>';
    }
}

async function loadFriendRequests() {
    try {
        const response = await fetch('/friend-requests');
        if (!response.ok) throw new Error("Failed to load requests");
        
        const requests = await response.json();
        const requestsDiv = document.getElementById('friend-requests');
        const countSpan = document.getElementById('request-count');
        
        countSpan.textContent = requests.length;
        
        if (requests.length === 0) {
            requestsDiv.innerHTML = '<p class="empty-message">No pending requests</p>';
            return;
        }
        
        requestsDiv.innerHTML = requests.map(req => `
            <div class="friend-request-item">
                <strong>${req.fromBrukernavn}</strong> wants to be your friend
                <div class="request-actions">
                    <button onclick="respondFriendRequest('${req.fromBrukernavn}', 'accept')" class="btn-small btn-success">Accept</button>
                    <button onclick="respondFriendRequest('${req.fromBrukernavn}', 'reject')" class="btn-small btn-danger">Reject</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading friend requests:", error);
    }
}

async function deleteTrip(tripId) {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    
    try {
        const response = await fetch(`/trip/${tripId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Failed to delete trip");
        
        loadMyTrips(); // Refresh trips list
    } catch (error) {
        alert("Failed to delete trip");
        console.error("Error deleting trip:", error);
    }
}

function editTrip(tripId) {
    // For now, just a placeholder - could navigate to edit page
    alert("Edit functionality coming soon!");
}

async function removeFriend(brukernavn) {
    if (!confirm(`Remove ${brukernavn} from friends?`)) return;
    
    try {
        const response = await fetch('/friend-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromBrukernavn: brukernavn,
                action: 'reject'
            })
        });
        
        if (!response.ok) throw new Error("Failed to remove friend");
        loadFriends();
    } catch (error) {
        alert("Failed to remove friend");
        console.error("Error removing friend:", error);
    }
}

async function respondFriendRequest(fromBrukernavn, action) {
    try {
        const response = await fetch('/friend-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fromBrukernavn,
                action
            })
        });
        
        if (!response.ok) throw new Error("Failed to respond to request");
        
        loadFriendRequests();
        if (action === 'accept') {
            loadFriends();
        }
    } catch (error) {
        alert("Failed to respond to requests");
        console.error("Error responding to request:", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Get current user
    try {
        const response = await fetch('/me');
        const data = await response.json();
        const username = data.brukernavn;
        
        // Load all content
        loadMyTrips();
        loadFriends();
        loadFriendRequests();
        loadUserStats(username);
        loadAchievements(username);
    } catch (error) {
        console.error("Error loading dashboard:", error);
        loadMyTrips();
        loadFriends();
        loadFriendRequests();
    }
});
