const express = require("express");
const session = require("express-session");
const app = express();

const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");

const cors = require("cors");
app.use(cors());

const bcrypt = require("bcrypt");
app.use(cors());

app.use(express.static('public'));

app.use(express.json());

const port = 3000;

app.use(
    session({
        secret: "hemmeligNøkkel",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

function kreverInnlogging(req, res, next) {
    if(!req.session.user) {
        return res.redirect("/index.html")
    }
    next();
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }
    const user = db.prepare("SELECT * FROM person WHERE epost = ?").get(email);
    if (!user) {
        return res.status(401).json({ message: "Wrong email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.passord);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Wrong email or password" });
    }
    req.session.user = { brukernavn: user.brukernavn, epost: user.epost };
    res.json({ message: "Innlogging vellykket", redirect: "/dashboard.html" })
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out", redirect: "/index.html" });
    });
});

app.get('/main', kreverInnlogging, (req, res) => {
    res.sendFile(__dirname + "/index2.html");
})

app.get('/api/fjell_info', kreverInnlogging, (req, res) => { 
    const row = db.prepare('SELECT fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
    res.json(row);
});

app.get('/fjell_info', kreverInnlogging, (req, res) => {
    try {
        const row = db.prepare('SELECT fjell_id, fjellnavn, hoyde, beskrivelse, foto FROM fjell').all();
        res.json(row);
    } catch (error) {
        console.error('Error after catching fjell:', error);
        res.status(500).json({ message: "Could not get fjell" });
    }
})

app.get('/allePersoner', kreverInnlogging, (req, res) => {
    try {
        const row = db.prepare('SELECT brukernavn FROM person').all();
        res.json(row);
    } catch (error) {
        console.error('Error after catching brukernavn:', error);
        res.status(500).json({ message: "Could not get brukernavn" });
    }
})

app.get('/fjellturer/:brukernavn', kreverInnlogging, (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

    const row = db.prepare(`SELECT fjell.fjellnavn
        FROM person
        INNER JOIN fjelltur
        ON person.brukernavn = fjelltur.brukernavn
        INNER JOIN fjell
        ON fjelltur.fjell_id = fjell.fjell_id
        WHERE person.brukernavn = ?
    `).all(brukernavn);
    
    res.json(row);
})

app.post('/register', async (req, res) => {
    const { email, password, brukernavn, fornavn, etternavn } = req.body;
    
    if (!email || !password || !brukernavn) {
        return res.status(400).json({ message: "Email, password, and username required" });
    }
    
    const existing = db.prepare("SELECT * FROM person WHERE epost = ? OR brukernavn = ?").get(email, brukernavn);
    if (existing) {
        return res.status(400).json({ message: "Email or username already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        db.prepare(`INSERT INTO person (brukernavn, fornavn, etternavn, epost, passord) 
                    VALUES (?, ?, ?, ?, ?)`)
            .run(brukernavn, fornavn || '', etternavn || '', email, hashedPassword);
        
        res.json({ message: "Registration successful", redirect: "/index.html" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// ===== TRIP MANAGEMENT ENDPOINTS =====

app.post('/add-trip', kreverInnlogging, (req, res) => {
    const { fjell_id, tidspunkt, varighet, beskrivelse } = req.body;
    const brukernavn = req.session.user.brukernavn;
    
    if (!fjell_id || !tidspunkt) {
        return res.status(400).json({ message: "Mountain and date required" });
    }
    
    try {
        db.prepare(`INSERT INTO fjelltur (brukernavn, fjell_id, tidspunkt, varighet, beskrivelse)
                    VALUES (?, ?, ?, ?, ?)`)
            .run(brukernavn, fjell_id, tidspunkt, varighet || 0, beskrivelse || '');
        
        res.json({ message: "Trip added successfully" });
    } catch (error) {
        console.error('Error adding trip:', error);
        res.status(500).json({ message: "Could not add trip" });
    }
});

app.put('/trip/:id', kreverInnlogging, (req, res) => {
    const tripId = req.params.id;
    const brukernavn = req.session.user.brukernavn;
    const { tidspunkt, varighet, beskrivelse } = req.body;
    
    try {
        const trip = db.prepare('SELECT brukernavn FROM fjelltur WHERE fjelltur_id = ?').get(tripId);
        if (!trip || trip.brukernavn !== brukernavn) {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        db.prepare(`UPDATE fjelltur SET tidspunkt = ?, varighet = ?, beskrivelse = ? 
                    WHERE fjelltur_id = ?`)
            .run(tidspunkt, varighet || 0, beskrivelse || '', tripId);
        
        res.json({ message: "Trip updated successfully" });
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).json({ message: "Could not update trip" });
    }
});

app.delete('/trip/:id', kreverInnlogging, (req, res) => {
    const tripId = req.params.id;
    const brukernavn = req.session.user.brukernavn;
    
    try {
        const trip = db.prepare('SELECT brukernavn FROM fjelltur WHERE fjelltur_id = ?').get(tripId);
        if (!trip || trip.brukernavn !== brukernavn) {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        db.prepare('DELETE FROM fjelltur WHERE fjelltur_id = ?').run(tripId);
        res.json({ message: "Trip deleted successfully" });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: "Could not delete trip" });
    }
});

app.get('/my-trips', kreverInnlogging, (req, res) => {
    const brukernavn = req.session.user.brukernavn;
    
    try {
        const trips = db.prepare(`
            SELECT fjelltur.fjelltur_id, fjell.fjellnavn, fjelltur.tidspunkt, 
                   fjelltur.varighet, fjelltur.beskrivelse, fjell.hoyde, fjell.foto
            FROM fjelltur
            INNER JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id
            WHERE fjelltur.brukernavn = ?
            ORDER BY fjelltur.tidspunkt DESC
        `).all(brukernavn);
        
        res.json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: "Could not fetch trips" });
    }
});

app.get('/me', kreverInnlogging, (req, res) => {
    res.json({ brukernavn: req.session.user.brukernavn });
});

// ===== FRIEND SYSTEM ENDPOINTS =====

app.post('/friend-request', kreverInnlogging, (req, res) => {
    const { targetBrukernavn } = req.body;
    const brukernavn = req.session.user.brukernavn;
    
    if (!targetBrukernavn || targetBrukernavn === brukernavn) {
        return res.status(400).json({ message: "Invalid request" });
    }
    
    try {
        const user = db.prepare('SELECT brukernavn FROM person WHERE brukernavn = ?').get(targetBrukernavn);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const ordered = [brukernavn, targetBrukernavn].sort();
        const existing = db.prepare(`SELECT * FROM friendship 
                                     WHERE brukernavn1 = ? AND brukernavn2 = ?`)
            .get(ordered[0], ordered[1]);
        
        if (existing) {
            return res.status(400).json({ message: "Request already exists or already friends" });
        }
        
        db.prepare(`INSERT INTO friendship (brukernavn1, brukernavn2, status)
                    VALUES (?, ?, 'pending')`)
            .run(ordered[0], ordered[1]);
        
        res.json({ message: "Friend request sent" });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ message: "Could not send friend request" });
    }
});

app.post('/friend-response', kreverInnlogging, (req, res) => {
    const { fromBrukernavn, action } = req.body; // action: 'accept' or 'reject'
    const brukernavn = req.session.user.brukernavn;
    
    if (!fromBrukernavn || !['accept', 'reject'].includes(action)) {
        return res.status(400).json({ message: "Invalid request" });
    }
    
    try {
        const ordered = [fromBrukernavn, brukernavn].sort();
        const friendship = db.prepare(`SELECT * FROM friendship 
                                       WHERE brukernavn1 = ? AND brukernavn2 = ? AND status = 'pending'`)
            .get(ordered[0], ordered[1]);
        
        if (!friendship) {
            return res.status(404).json({ message: "Friend request not found" });
        }
        
        if (action === 'accept') {
            db.prepare(`UPDATE friendship SET status = 'accepted' 
                        WHERE brukernavn1 = ? AND brukernavn2 = ?`)
                .run(ordered[0], ordered[1]);
            res.json({ message: "Friend request accepted" });
        } else {
            db.prepare(`DELETE FROM friendship 
                        WHERE brukernavn1 = ? AND brukernavn2 = ?`)
                .run(ordered[0], ordered[1]);
            res.json({ message: "Friend request rejected" });
        }
    } catch (error) {
        console.error('Error responding to friend request:', error);
        res.status(500).json({ message: "Could not respond to friend request" });
    }
});

app.get('/my-friends', kreverInnlogging, (req, res) => {
    const brukernavn = req.session.user.brukernavn;
    
    try {
        const friends = db.prepare(`
            SELECT CASE 
                WHEN brukernavn1 = ? THEN brukernavn2 
                ELSE brukernavn1 
            END as venn_brukernavn
            FROM friendship
            WHERE (brukernavn1 = ? OR brukernavn2 = ?) AND status = 'accepted'
        `).all(brukernavn, brukernavn, brukernavn);
        
        res.json(friends);
    } catch (error) {
        console.error('Error fetching friends:', error);
        res.status(500).json({ message: "Could not fetch friends" });
    }
});

app.get('/friend-requests', kreverInnlogging, (req, res) => {
    const brukernavn = req.session.user.brukernavn;
    
    try {
        const requests = db.prepare(`
            SELECT brukernavn1 as fromBrukernavn
            FROM friendship
            WHERE brukernavn2 = ? AND status = 'pending'
        `).all(brukernavn);
        
        res.json(requests);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ message: "Could not fetch friend requests" });
    }
});

app.get('/search-users', kreverInnlogging, (req, res) => {
    const query = req.query.q;
    const myBrukernavn = req.session.user.brukernavn;
    
    if (!query || query.length < 2) {
        return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }
    
    try {
        const searchPattern = `%${query}%`;
        const results = db.prepare(`
            SELECT DISTINCT brukernavn, fornavn, etternavn 
            FROM person 
            WHERE (brukernavn LIKE ? OR fornavn LIKE ? OR etternavn LIKE ?)
            AND brukernavn != ?
            LIMIT 10
        `).all(searchPattern, searchPattern, searchPattern, myBrukernavn);
        
        res.json(results);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ message: "Could not search users" });
    }
});

app.get('/user/:brukernavn', kreverInnlogging, (req, res) => {
    const targetBrukernavn = req.params.brukernavn;
    const myBrukernavn = req.session.user.brukernavn;
    
    try {
        const user = db.prepare('SELECT brukernavn, fornavn, etternavn FROM person WHERE brukernavn = ?')
            .get(targetBrukernavn);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if we're friends
        let isFriend = false;
        if (myBrukernavn !== targetBrukernavn) {
            const ordered = [myBrukernavn, targetBrukernavn].sort();
            const friendship = db.prepare(`SELECT * FROM friendship 
                                           WHERE brukernavn1 = ? AND brukernavn2 = ? AND status = 'accepted'`)
                .get(ordered[0], ordered[1]);
            isFriend = !!friendship;
        }
        
        res.json({ ...user, isFriend, isOwnProfile: myBrukernavn === targetBrukernavn });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: "Could not fetch user" });
    }
});

// ===== STATS & ACHIEVEMENTS =====

app.get('/user-stats/:brukernavn', kreverInnlogging, (req, res) => {
    const targetBrukernavn = req.params.brukernavn;
    
    try {
        // Get trip count
        const tripCount = db.prepare(`
            SELECT COUNT(*) as count FROM fjelltur WHERE brukernavn = ?
        `).get(targetBrukernavn);
        
        // Get total elevation
        const elevationData = db.prepare(`
            SELECT COALESCE(SUM(fjell.hoyde), 0) as total_elevation
            FROM fjelltur
            INNER JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id
            WHERE fjelltur.brukernavn = ?
        `).get(targetBrukernavn);
        
        // Get highest mountain
        const highestMountain = db.prepare(`
            SELECT fjell.fjellnavn, fjell.hoyde
            FROM fjelltur
            INNER JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id
            WHERE fjelltur.brukernavn = ?
            ORDER BY fjell.hoyde DESC
            LIMIT 1
        `).get(targetBrukernavn);
        
        // Get earliest and latest trips
        const dates = db.prepare(`
            SELECT 
                MIN(fjelltur.tidspunkt) as earliest,
                MAX(fjelltur.tidspunkt) as latest
            FROM fjelltur
            WHERE brukernavn = ?
        `).get(targetBrukernavn);
        
        // Get friend count
        const friendCount = db.prepare(`
            SELECT COUNT(*) as count FROM friendship
            WHERE (brukernavn1 = ? OR brukernavn2 = ?) AND status = 'accepted'
        `).get(targetBrukernavn, targetBrukernavn);
        
        res.json({
            trips_count: tripCount.count,
            total_elevation: elevationData.total_elevation,
            highest_mountain: highestMountain || null,
            earliest_trip: dates.earliest,
            latest_trip: dates.latest,
            friend_count: friendCount.count
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        res.status(500).json({ message: "Could not fetch user stats" });
    }
});

app.get('/user-achievements/:brukernavn', kreverInnlogging, (req, res) => {
    const targetBrukernavn = req.params.brukernavn;
    
    try {
        const achievements = db.prepare(`
            SELECT a.id, a.name, a.description, a.icon, ua.unlocked_at
            FROM achievement a
            LEFT JOIN user_achievements ua ON a.id = ua.achievement_id AND ua.brukernavn = ?
            ORDER BY ua.unlocked_at DESC, a.name ASC
        `).all(targetBrukernavn);
        
        res.json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ message: "Could not fetch achievements" });
    }
});

app.post('/check-achievements', kreverInnlogging, (req, res) => {
    const brukernavn = req.session.user.brukernavn;
    
    try {
        // Get user stats
        const stats = db.prepare(`
            SELECT 
                (SELECT COUNT(*) FROM fjelltur WHERE brukernavn = ?) as trips,
                (SELECT COALESCE(SUM(fjell.hoyde), 0) FROM fjelltur 
                 INNER JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id 
                 WHERE fjelltur.brukernavn = ?) as total_elevation,
                (SELECT COUNT(*) FROM friendship 
                 WHERE (brukernavn1 = ? OR brukernavn2 = ?) AND status = 'accepted') as friends
        `).get(brukernavn, brukernavn, brukernavn, brukernavn);
        
        // Get all achievements
        const achievements = db.prepare('SELECT * FROM achievement').all();
        
        // Check each achievement
        for (const achievement of achievements) {
            let unlocked = false;
            
            if (achievement.requirement_type === 'trips' && stats.trips >= achievement.requirement_value) {
                unlocked = true;
            }
            if (achievement.requirement_type === 'elevation' && stats.total_elevation >= achievement.requirement_value) {
                unlocked = true;
            }
            if (achievement.requirement_type === 'friends' && stats.friends >= achievement.requirement_value) {
                unlocked = true;
            }
            
            if (unlocked) {
                // Check if already unlocked
                const existing = db.prepare(`
                    SELECT * FROM user_achievements 
                    WHERE brukernavn = ? AND achievement_id = ?
                `).get(brukernavn, achievement.id);
                
                if (!existing) {
                    db.prepare(`
                        INSERT INTO user_achievements (brukernavn, achievement_id)
                        VALUES (?, ?)
                    `).run(brukernavn, achievement.id);
                }
            }
        }
        
        res.json({ message: "Achievements checked" });
    } catch (error) {
        console.error('Error checking achievements:', error);
        res.status(500).json({ message: "Could not check achievements" });
    }
});

app.get('/mountain-gallery/:fjell_id', kreverInnlogging, (req, res) => {
    const fjell_id = req.params.fjell_id;
    
    try {
        const mountain = db.prepare('SELECT * FROM fjell WHERE fjell_id = ?').get(fjell_id);
        if (!mountain) {
            return res.status(404).json({ message: "Mountain not found" });
        }
        
        const trips = db.prepare(`
            SELECT 
                fjelltur.fjelltur_id, fjelltur.brukernavn, fjelltur.tidspunkt, 
                fjelltur.varighet, fjelltur.beskrivelse, person.fornavn, person.etternavn
            FROM fjelltur
            INNER JOIN person ON fjelltur.brukernavn = person.brukernavn
            WHERE fjelltur.fjell_id = ?
            ORDER BY fjelltur.tidspunkt DESC
        `).all(fjell_id);
        
        res.json({
            mountain,
            trips,
            total_climbers: trips.length,
            total_ascents: trips.length
        });
    } catch (error) {
        console.error('Error fetching mountain gallery:', error);
        res.status(500).json({ message: "Could not fetch gallery" });
    }
});

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`)
});