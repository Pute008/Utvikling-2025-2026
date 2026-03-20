# Project Structure - Mountain Logger

## Directory Layout

```
fjellturOppgave/
│
├── app.js ⭐ MAIN BACKEND SERVER
│   └── Contains all 13 API endpoints, authentication, trip management, friend system
│
├── dbInit.js
│   └── Database initialization script - adds password column and friendship table
│
├── fjelltur.db 🗄️ SQLITE DATABASE
│   └── Contains all data: users, mountains, trips, friendships
│
├── package.json
│   ├── express: ^5.2.1
│   ├── better-sqlite3: ^12.6.2
│   ├── bcrypt: ^6.0.0
│   ├── express-session: ^1.19.0
│   └── cors: ^2.8.6
│
├── public/ 🎨 FRONTEND FILES
│   │
│   ├── 📄 AUTH PAGES
│   │   ├── index.html (Login page)
│   │   ├── scriptLogin.js
│   │   ├── register.html (Sign up page)
│   │   └── registerScript.js
│   │
│   ├── 📄 MAIN PAGES
│   │   ├── dashboard.html (Main hub - trips & friends)
│   │   ├── dashboardScript.js
│   │   ├── add-trip.html (Log new mountain climb)
│   │   ├── add-tripScript.js
│   │   ├── friends-trips.html (Search & view friends)
│   │   └── friends-tripsScript.js
│   │
│   ├── 🎨 STYLING
│   │   └── style.css (1000+ lines - responsive design)
│   │
│   ├── 📸 IMAGES
│   │   └── bilder/
│   │       ├── fanaråken.jpg
│   │       ├── oksen.jpg
│   │       ├── soleibotntind.jpg
│   │       ├── horndalsnuten.jpg
│   │       ├── nesheimshorgi.jpg
│   │       ├── midtfjell.jpg
│   │       ├── olsskavlen.jpg
│   │       └── hallingskeid.jpg
│   │
│   └── 📄 LEGACY PAGES (Demo)
│       ├── index2.html
│       ├── script.js
│       ├── eks-fjellturer-for-person.html
│       └── eks-fjellturer-for-person.js
│
├── 📖 DOCUMENTATION
│   ├── README.md (Complete guide)
│   ├── QUICKSTART.md (Quick reference)
│   ├── TESTING.md (Test scenarios)
│   └── IMPLEMENTATION_SUMMARY.md (This file)
│
└── 🐙 GIT REPO FILES
    ├── .gitignore
    └── node_modules/ (npm packages)
```

---

## 📊 File Purposes

### Backend
| File | Purpose | Lines |
|------|---------|-------|
| `app.js` | Express server, routes, API endpoints | ~340 |
| `dbInit.js` | Database setup and seed data | ~80 |

### Frontend - Pages
| File | Purpose | Status |
|------|---------|--------|
| `index.html` | Login page | ✅ Complete |
| `register.html` | Registration form | ✅ Complete |
| `dashboard.html` | Main dashboard | ✅ Complete |
| `add-trip.html` | Trip logging form | ✅ Complete |
| `friends-trips.html` | Friend search/view | ✅ Complete |

### Frontend - Scripts
| File | Purpose | Lines |
|------|---------|-------|
| `scriptLogin.js` | Login handler | ~25 |
| `registerScript.js` | Registration handler | ~45 |
| `dashboardScript.js` | Dashboard logic | ~120 |
| `add-tripScript.js` | Trip addition logic | ~80 |
| `friends-tripsScript.js` | Friends logic | ~120 |

### Styling
| File | Purpose | Lines |
|------|---------|-------|
| `style.css` | Complete CSS for all pages | ~1000 |

---

## 🔄 Data Flow

### User Flow
```
index.html → Login → dashboard.html → Choose:
                                      ├─→ add-trip.html
                                      ├─→ friends-trips.html
                                      └─→ Dashboard features
```

### API Call Flow
```
Frontend Page → JavaScript → fetch() → Backend API → Database → Response → Update UI
```

### Example: Adding a Trip
```
add-trip.html form
    ↓
add-tripScript.js (collect data)
    ↓
fetch('/add-trip', {POST}) 
    ↓
app.js: app.post('/add-trip')
    ↓
Database: INSERT into fjelltur
    ↓
Response JSON
    ↓
dashboardScript.js: loadMyTrips() refreshes
    ↓
Trip appears on dashboard
```

---

## 🗄️ Database Tables

```
person (5 rows - test users)
├── brukernavn (PK): harry, larry, fjellguden, hausnes, visjonæren
├── epost: email addresses
├── passord: bcrypt hashed
└── fornavn, etternavn: optional names

fjell (9 rows - Norwegian mountains)
├── fjell_id (PK): 1-9
├── fjellnavn: Fanaråken, Oksen, etc.
├── hoyde: height in meters
├── beskrivelse: mountain description
├── omraade_id: FK to omraade
└── foto: filename in public/bilder/

fjelltur (10 rows - sample trips)
├── fjelltur_id (PK): 1-10
├── brukernavn (FK): linked to person
├── fjell_id (FK): linked to fjell
├── tidspunkt: date of trip
├── varighet: duration in minutes
└── beskrivelse: trip notes

friendship (0-N rows - dynamic friend requests)
├── id (PK)
├── brukernavn1 (FK): sorted alphabetically
├── brukernavn2 (FK): sorted alphabetically
├── status: 'pending' or 'accepted'
└── created_at: timestamp

omraade (4 rows - regions)
├── id (PK): 1-4
├── navn: Jotunheimen, Vossafjella, Hardanger, Skinstø
└── beskrivelse: region info

bilde (2 rows - example photos)
├── bilde_id (PK)
├── tittel: photo title
├── bildetekst: photo description
├── filnavn: filename
└── tur_id (FK): associated trip
```

---

## 🔌 API Endpoints Summary

### Auth (3)
- POST /register
- POST /login
- GET /logout

### Trips (6)
- GET /my-trips
- GET /fjell_info
- POST /add-trip
- PUT /trip/:id
- DELETE /trip/:id
- GET /fjellturer/:brukernavn

### Friends (4)
- POST /friend-request
- POST /friend-response
- GET /my-friends
- GET /friend-requests

### Utility (1)
- GET /user/:brukernavn

---

## 🎨 CSS Structure

```css
:root variables (15)
├── primary-color: #2c3e50
├── accent-color: #e8743b
├── success-color: #27ae60
└── ... more colors

Component Styles (20+ sections)
├── Navigation bar
├── Login/Register forms
├── Buttons & links
├── Cards & containers
├── Trip cards
├── Friend lists
├── Messages & alerts
├── Responsive breakpoints
└── Accessibility fixes
```

---

## 📝 Key Implementation Details

### Authentication
- Passwords hashed with **bcrypt** (10 rounds)
- Sessions managed by **express-session**
- Middleware protects authorized routes
- Test users pre-seeded with known passwords

### Database
- **SQLite** for lightweight, serverless storage
- **better-sqlite3** for synchronous queries
- Foreign key constraints enforced
- Unique constraints on usernames and emails

### Frontend
- **Vanilla JavaScript** (no frameworks)
- **async/await** for clean async code
- **CSS Grid & Flexbox** for layout
- **Mobile-first** responsive design

### Security
- Password hashing before storage
- Session tokens for state management
- Ownership validation on edits/deletes
- Parameterized SQL queries
- Input validation on server

---

## 🚀 Startup Sequence

```
1. User runs: node app.js
   ↓
2. Express server initializes
   ├─ Port 3000 opened
   ├─ Sessions configured
   ├─ Static files served from public/
   └─ CORS enabled
   ↓
3. Database file (fjelltur.db) loaded
   ├─ Verified tables exist
   ├─ Data accessible
   └─ Ready for queries
   ↓
4. Console output: "Server kjører på http://localhost:3000"
   ↓
5. Ready for browser requests
```

---

## 📦 Dependencies

```json
{
  "express": "^5.2.1" → Web framework
  "better-sqlite3": "^12.6.2" → Database driver
  "bcrypt": "^6.0.0" → Password hashing
  "express-session": "^1.19.0" → Session management
  "cors": "^2.8.6" → Cross-origin requests
}
```

All dependencies already installed via `npm install`

---

## 🎯 Project Size

| Component | Size |
|-----------|------|
| Backend code | ~340 lines |
| Frontend code | ~990 lines |
| CSS styling | ~1000 lines |
| Database | ~250 KB |
| Images | ~2-3 MB |
| **Total Project** | **~4 MB** |

---

## ✅ Quality Metrics

- **Code Coverage**: All core features implemented
- **Test Status**: Ready for demonstration
- **Security**: Industry standard password hashing
- **Performance**: Lightweight SQLite, minimal dependencies
- **Scalability**: Designed for school project scale
- **Maintainability**: Clean code, well-documented
- **Accessibility**: WCAG considerations included
- **Responsiveness**: Mobile to desktop all supported

---

## 🔍 File Relationships

```
app.js (backend hub)
    ├─→ reads fjelltur.db
    └─→ serves public/ folder
        ├─→ index.html (login)
        │   └─→ scriptLogin.js
        │       └─→ calls: POST /login
        │
        ├─→ register.html (signup)
        │   └─→ registerScript.js
        │       └─→ calls: POST /register
        │
        ├─→ dashboard.html (main)
        │   └─→ dashboardScript.js
        │       ├─→ calls: GET /my-trips
        │       ├─→ calls: GET /my-friends
        │       ├─→ calls: GET /friend-requests
        │       ├─→ calls: DELETE /trip/:id
        │       └─→ calls: POST /friend-response
        │
        ├─→ add-trip.html (form)
        │   └─→ add-tripScript.js
        │       ├─→ calls: GET /fjell_info
        │       └─→ calls: POST /add-trip
        │
        ├─→ friends-trips.html (search)
        │   └─→ friends-tripsScript.js
        │       ├─→ calls: GET /user/:brukernavn
        │       ├─→ calls: GET /fjellturer/:brukernavn
        │       └─→ calls: POST /friend-request
        │
        ├─→ style.css (styling all pages)
        │
        └─→ bilder/ (mountain photos)
```

---

This structure provides:
- ✅ Clear separation of concerns
- ✅ Easy to navigate codebase
- ✅ Scalable architecture
- ✅ Maintainable for future updates
- ✅ Professional project organization

---

**Ready to deploy and demonstrate!** 🚀
