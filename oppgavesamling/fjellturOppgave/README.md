# Mountain Logger - Mountain Adventure Tracking System

A web application where users can log mountain climbs they've completed, build a friend network, and see which mountains their friends have visited.

## 🎯 Features Implemented

### ✅ Authentication & Authorization
- **User Registration** - Sign up with email, password, username, and optional first/last name
- **User Login** - Secure password-based authentication using bcrypt
- **Session Management** - Persistent sessions with automatic timeout protection
- **Password Security** - Passwords hashed with bcrypt (10 salt rounds)

### ✅ Trip Management
- **Log Mountain Climbs** - Record trips with mountain name, date, duration, and notes
- **View My Trips** - See all recorded mountain climbs with full details
- **Edit Trips** - Update trip information (coming soon in UI)
- **Delete Trips** - Remove trips from history
- **Trip Details** - Display mountain height, description, and photos

### ✅ Friend System
- **Send Friend Requests** - Request to connect with other users
- **Accept/Reject Requests** - Manage incoming friend requests
- **View Friends List** - See all accepted friends
- **View Friends' Shared Trips** - Only view mountain trips of accepted friends
- **Remove Friends** - Disconnect from friends in your network

### ✅ User Experience
- **Modern, Responsive Design** - Beautiful UI that works on desktop and mobile
- **Mountain Database** - Pre-populated with 9 Norwegian mountains with photos and descriptions
- **Navigation Bar** - Easy access to all main features
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client and server-side validation

## 📁 Project Structure

```
fjellturOppgave/
├── app.js                           # Main Express server (backend)
├── dbInit.js                        # Database initialization script
├── package.json                     # Project dependencies
├── fjelltur.db                      # SQLite database
└── public/                          # Frontend files
    ├── index.html                   # Login page
    ├── scriptLogin.js               # Login handler
    ├── register.html                # Registration page
    ├── registerScript.js            # Registration handler
    ├── dashboard.html               # Main dashboard (my trips & friends)
    ├── dashboardScript.js           # Dashboard logic
    ├── add-trip.html                # Form to log new trip
    ├── add-tripScript.js            # Trip submission handler
    ├── friends-trips.html           # View friends' mountains
    ├── friends-tripsScript.js       # Friends' trips logic
    ├── style.css                    # Comprehensive styling
    ├── bilder/                      # Mountain photos
    │   ├── fanaråken.jpg
    │   ├── oksen.jpg
    │   ├── soleibotntind.jpg
    │   └── ... (6 more images)
    ├── eks-fjellturer-for-person.html  # Demo page (legacy)
    ├── eks-fjellturer-for-person.js
    ├── index2.html                     # Demo page (legacy)
    └── script.js
```

## 🗄️ Database Schema

### Tables

**person**
- `brukernavn` (TEXT, PRIMARY KEY) - Username
- `fornavn` (TEXT) - First name
- `etternavn` (TEXT) - Last name
- `epost` (TEXT) - Email address
- `passord` (TEXT) - Hashed password

**fjell** (Mountains)
- `fjell_id` (INTEGER, PRIMARY KEY)
- `fjellnavn` (TEXT) - Mountain name
- `hoyde` (INTEGER) - Height in meters
- `beskrivelse` (TEXT) - Description
- `omraade_id` (INTEGER) - Area/region ID
- `foto` (TEXT) - Photo filename

**fjelltur** (Mountain Trips)
- `fjelltur_id` (INTEGER, PRIMARY KEY)
- `brukernavn` (TEXT, FOREIGN KEY) - User who took the trip
- `fjell_id` (INTEGER, FOREIGN KEY) - Mountain climbed
- `tidspunkt` (TEXT) - Date of trip
- `varighet` (INTEGER) - Duration in minutes
- `beskrivelse` (TEXT) - Trip notes

**friendship**
- `id` (INTEGER, PRIMARY KEY)
- `brukernavn1` (TEXT, FOREIGN KEY) - First user
- `brukernavn2` (TEXT, FOREIGN KEY) - Second user
- `status` (TEXT) - "pending" or "accepted"
- `created_at` (TEXT) - Timestamp
- UNIQUE constraint on (brukernavn1, brukernavn2)

**omraade** (Regions)
- `id` (INTEGER, PRIMARY KEY)
- `navn` (TEXT) - Region name
- `beskrivelse` (TEXT) - Description

**bilde** (Photos for trips)
- `bilde_id` (INTEGER, PRIMARY KEY)
- `tittel` (TEXT) - Photo title
- `bildetekst` (TEXT) - Photo caption
- `filnavn` (TEXT) - Filename
- `tur_id` (INTEGER, FOREIGN KEY) - Associated trip

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ 
- npm or similar package manager

### Installation & Setup

1. **Navigate to project directory:**
```bash
cd c:\Users\felix\Github\Utvikling-2025-2026\oppgavesamling\fjellturOppgave
```

2. **Install dependencies:**
```bash
npm install
```

3. **Initialize database (if needed):**
```bash
node dbInit.js
```

4. **Start the server:**
```bash
node app.js
```

The server will run on `http://localhost:3000`

## 🧪 Test Users

The database includes pre-configured test users with passwords:

| Username | Email | Password | Name |
|----------|-------|----------|------|
| harry | harry@potter.com | harry123 | Harry Potter |
| larry | larry@larry.com | larry123 | Leisure Suit Larry |
| fjellguden | fjellgud@outlook.com | fjell123 | Guri Fjellrud |
| hausnes | fjellhausnes@gmail.com | hausnes123 | Jo Bjørnar Hausnes |
| visjonæren | visjo@nær.com | visjo123 | Visjo Nær |

### Quick Test Flow:
1. Open `http://localhost:3000` in browser
2. Login with any test user credentials
3. You'll see your logged trips and friends
4. Click "Add Trip" to log a new mountain climb
5. Click "Friends' Trips" to search and add friends

## 🔌 API Endpoints

### Authentication
- `POST /register` - Create new account
- `POST /login` - Login with email and password
- `GET /logout` - Logout and clear session

### Trips
- `GET /my-trips` - Get current user's trips
- `GET /fjell_info` - Get all mountain information
- `POST /add-trip` - Log a new mountain climb
- `PUT /trip/:id` - Edit a trip
- `DELETE /trip/:id` - Delete a trip
- `GET /fjellturer/:brukernavn` - Get a specific user's trips

### Friends
- `POST /friend-request` - Send friend request
- `POST /friend-response` - Accept/reject friend request
- `GET /my-friends` - Get list of accepted friends
- `GET /friend-requests` - Get pending friend requests
- `GET /user/:brukernavn` - Get user profile info

### General
- `GET /allePersoner` - Get all registered users

## 🎨 UI Pages

### 1. Login (`/index.html`)
- Email and password fields
- Link to registration page
- Error messages for invalid credentials

### 2. Registration (`/register.html`)
- Username, email, password, confirm password fields
- Optional first and last name
- Password validation (min 6 characters)
- Passwords must match

### 3. Dashboard (`/dashboard.html`)
- **Left Side:** My trips list with edit/delete buttons
- **Right Side:** Friend requests (with accept/reject) and active friends list
- Navigation to add trips and view friends' trips

### 4. Add Trip (`/add-trip.html`)
- Mountain dropdown (populated from database)
- Date picker
- Duration field (optional)
- Notes/description textarea
- Real-time mountain info display

### 5. Friends' Trips (`/friends-trips.html`)
- Search for users by username
- View user profile
- Send friend requests (if not already friends)
- View friends' mountain trips with photos and details

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Session Management** - Express sessions with server-side storage
- ✅ **Authentication Middleware** - `kreverInnlogging` protects API endpoints
- ✅ **Ownership Validation** - Users can only edit/delete their own trips
- ✅ **Input Validation** - Both client and server-side
- ✅ **SQL Injection Prevention** - Parameterized queries with better-sqlite3
- ✅ **CORS Enabled** - Configured for frontend requests

## 🎯 Current Limitations & Future Enhancements

### Current Scope (MVP)
- ✅ Basic authentication with email/password
- ✅ Trip logging and viewing
- ✅ Friend system with requests
- ✅ Responsive mobile design
- ✅ Pre-populated mountains database

### Future Enhancements
- 🔄 Email verification for registration
- 🔄 Trip photos upload
- 🔄 Comments/reviews on friends' trips
- 🔄 Trip statistics and achievements
- 🔄 Mountain difficulty ratings
- 🔄 Weather integration
- 🔄 Export trip history
- 🔄 Notifications system
- 🔄 Social sharing
- 🔄 Admin panel for managing mountain data

## 📊 Database Statistics

- **Mountains:** 9 (Norwegian peaks from Jotunheimen, Vossafjella, Hardanger, and Skinstø regions)
- **Test Users:** 5 pre-configured
- **Sample Trips:** 10 (various users and mountains)
- **Demo Photo:** 8 images included

## 🛠️ Technology Stack

**Backend:**
- Node.js + Express.js
- SQLite with better-sqlite3
- bcrypt for password hashing
- express-session for session management
- CORS for cross-origin requests

**Frontend:**
- HTML5
- CSS3 (modern responsive design)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

## 📝 Notes for Developers

### Adding New Mountains
Edit the `fjell` table in the database and add image files to `public/bilder/`

### Customizing Styles
All colors and styling are defined in CSS custom properties at the top of `style.css`:
```css
--primary-color: #2c3e50;
--accent-color: #e8743b;
--success-color: #27ae60;
--danger-color: #e74c3c;
```

### Database Modifications
Run migrations using `dbInit.js` as template - all database changes should be idempotent.

### Testing API Endpoints
Use curl, Postman, or the browser console. Example:
```javascript
fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'harry@potter.com', password: 'harry123' })
}).then(r => r.json()).then(console.log)
```

## 📞 Support

This is a school project for IT students. For issues or enhancements:
1. Check the browser console for JavaScript errors
2. Check terminal output for server errors
3. Verify database exists at `fjelltur.db`
4. Ensure npm dependencies are installed

---

**Created:** March 2026  
**Status:** MVP Complete - Ready for Testing & Enhancement
