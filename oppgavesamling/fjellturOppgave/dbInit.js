const Database = require("better-sqlite3");
const db = new Database("fjelltur.db");
const bcrypt = require("bcrypt");

console.log("Starting database migration...");

// Check if passord column exists
try {
    db.prepare("ALTER TABLE person ADD COLUMN passord TEXT").run();
    console.log("✓ Added passord column to person table");
} catch (err) {
    if (err.message.includes("duplicate column")) {
        console.log("✓ passord column already exists");
    } else {
        console.error("Error adding passord column:", err);
    }
}

// Create friendship table if it doesn't exist
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS friendship (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brukernavn1 TEXT NOT NULL REFERENCES person(brukernavn),
            brukernavn2 TEXT NOT NULL REFERENCES person(brukernavn),
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(brukernavn1, brukernavn2),
            CHECK (brukernavn1 < brukernavn2)
        )
    `).run();
    console.log("✓ Friendship table created or already exists");
} catch (err) {
    console.error("Error creating friendship table:", err);
}

// Create achievements table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS achievement (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT,
            icon TEXT,
            requirement_type TEXT,
            requirement_value INTEGER
        )
    `).run();
    console.log("✓ Achievement table created or already exists");
} catch (err) {
    console.error("Error creating achievement table:", err);
}

// Create user_achievements table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS user_achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            brukernavn TEXT NOT NULL REFERENCES person(brukernavn),
            achievement_id INTEGER NOT NULL REFERENCES achievement(id),
            unlocked_at TEXT DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(brukernavn, achievement_id)
        )
    `).run();
    console.log("✓ User achievements table created or already exists");
} catch (err) {
    console.error("Error creating user_achievements table:", err);
}

// Seed achievements if they don't exist
try {
    const existingAchievements = db.prepare("SELECT COUNT(*) as count FROM achievement").get();
    
    if (existingAchievements.count === 0) {
        const achievements = [
            { name: 'First Peak', description: 'Climb your first mountain', icon: '⛰️', requirement_type: 'trips', requirement_value: 1 },
            { name: 'Peak Hunter', description: 'Climb 5 mountains', icon: '🏔️', requirement_type: 'trips', requirement_value: 5 },
            { name: 'Mountain Master', description: 'Climb 10 mountains', icon: '👑', requirement_type: 'trips', requirement_value: 10 },
            { name: 'Elevation Climber', description: 'Reach 5,000m total elevation', icon: '📈', requirement_type: 'elevation', requirement_value: 5000 },
            { name: 'Social Butterfly', description: 'Add 3 friends', icon: '🦋', requirement_type: 'friends', requirement_value: 3 },
            { name: 'Community Member', description: 'Add 5 friends', icon: '👥', requirement_type: 'friends', requirement_value: 5 }
        ];
        
        const insertStmt = db.prepare(`
            INSERT INTO achievement (name, description, icon, requirement_type, requirement_value)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        for (const ach of achievements) {
            insertStmt.run(ach.name, ach.description, ach.icon, ach.requirement_type, ach.requirement_value);
        }
        console.log("✓ Achievements seeded");
    } else {
        console.log("✓ Achievements already exist");
    }
} catch (err) {
    console.error("Error seeding achievements:", err);
}

// Hash existing passwords for demo users (only if they don't have passwords yet)
const users = [
    { brukernavn: 'harry', email: 'harry@potter.com', password: 'harry123' },
    { brukernavn: 'larry', email: 'larry@larry.com', password: 'larry123' },
    { brukernavn: 'fjellguden', email: 'fjellgud@outlook.com', password: 'fjell123' },
    { brukernavn: 'hausnes', email: 'fjellhausnes@gmail.com', password: 'hausnes123' },
    { brukernavn: 'visjonæren', email: 'visjo@nær.com', password: 'visjo123' }
];

const updateStmt = db.prepare("UPDATE person SET passord = ? WHERE brukernavn = ?");
const checkStmt = db.prepare("SELECT passord FROM person WHERE brukernavn = ?");

for (const user of users) {
    try {
        const existing = checkStmt.get(user.brukernavn);
        if (!existing || !existing.passord) {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            updateStmt.run(hashedPassword, user.brukernavn);
            console.log(`✓ Added password for user: ${user.brukernavn}`);
        } else {
            console.log(`✓ User ${user.brukernavn} already has a password`);
        }
    } catch (err) {
        console.error(`Error updating password for ${user.brukernavn}:`, err);
    }
}

console.log("Database migration complete!");
console.log("\nTest credentials:");
users.forEach(user => {
    console.log(`  ${user.brukernavn}: ${user.email} / ${user.password}`);
});
