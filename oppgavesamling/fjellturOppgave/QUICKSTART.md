# Mountain Logger - Quick Start

## 🚀 Start the Server

```bash
cd c:\Users\felix\Github\Utvikling-2025-2026\oppgavesamling\fjellturOppgave
node app.js
```

Open browser: **`http://localhost:3000`**

---

## 👤 Test Users

| Email | Password |
|-------|----------|
| harry@potter.com | harry123 |
| larry@larry.com | larry123 |
| fjellgud@outlook.com | fjell123 |
| fjellhausnes@gmail.com | hausnes123 |
| visjo@nær.com | visjo123 |

---

## ✨ Features

- ✅ **Register** - Create new account with secure password
- ✅ **Login** - Email + password authentication
- ✅ **Log Trips** - Record mountains you've climbed
- ✅ **View Trips** - See all your mountain adventures
- ✅ **Friends** - Send/accept friend requests
- ✅ **Share Trips** - View friends' mountain climbs
- ✅ **Responsive** - Works on mobile and desktop

---

## 📍 Main Pages

1. **Login** (`/`) - Start here
2. **Dashboard** (`/dashboard.html`) - Your trips + friends
3. **Add Trip** (`/add-trip.html`) - Log a new climb
4. **Friends' Trips** (`/friends-trips.html`) - Search users & view trips

---

## 🎯 Quick Demo (3 min)

1. Login with `harry@potter.com` / `harry123`
2. Click "Add Trip" → select "Fanaråken" → pick date → log
3. Click "Friends' Trips" → search "larry" → send request
4. See Harry's trips on dashboard

Done! ✨

---

## 📞 Issues?

- Server not starting? Check terminal window - should say "Server kjører på http://localhost:3000"
- Can't login? Try with different test user - database might not have initialized yet
- No mountains in dropdown? Run: `node dbInit.js`

---

## 🗄️ Database

SQLite file: **fjelltur.db** (already set up with test data)

Reset/reinitialize:
```bash
node dbInit.js
```

---

Next Steps: Check [TESTING.md](TESTING.md) for detailed test scenarios!
