# Mountain Logger - Testing Guide

## ✅ Server Running
The server is now running on `http://localhost:3000`

## 🧪 Step-by-Step Testing

### Test 1: Login with Existing User
1. Go to `http://localhost:3000`
2. Login with:
   - Email: `harry@potter.com`
   - Password: `harry123`
3. Should redirect to dashboard showing Harry's trips and friends

### Test 2: Registration (Create New Account)
1. Click "Sign up here" link on login page
2. Fill in:
   - Username: `testuser123`
   - Email: `testuser@example.com`
   - Password: `testpass123`
   - Confirm: `testpass123`
   - First Name: Test
   - Last Name: User
3. Click "Sign Up"
4. Should show success and redirect to login
5. Login with new credentials to verify

### Test 3: Add a Mountain Trip
1. After logging in, click "Add Trip"
2. Select a mountain from dropdown (e.g., "Fanaråken")
3. Pick today's date
4. Enter duration: 240 (minutes)
5. Add notes: "Amazing view!"
6. Click "Log Trip"
7. Should show success message and redirect to dashboard
8. Verify the trip appears in "My Mountain Climbs"

### Test 4: View and Delete Trip
1. On dashboard, view your trip in "My Mountain Climbs"
2. Click "Delete" button on any trip
3. Confirm deletion
4. Trip should disappear from list

### Test 5: Friend System - Send Request
1. Click "Friends' Trips" in navigation
2. Search for `larry` (another test user)
3. Click "+ Add Friend" button
4. Should show "Friend request sent!"
5. Button should show "✓ Friends" or pending status

### Test 6: Accept Friend Request
1. Login as a different user (e.g., larry@larry.com / larry123)
2. On dashboard, check "Friend Requests" section
3. See pending request from first user
4. Click "Accept" button
5. Request should move to friends list

### Test 7: View Friend's Trips
1. Go to "Friends' Trips" page
2. Search for your friend's username
3. Should see their profile and their trip list
4. Can only see trips if friendship is accepted

### Test 8: Responsive Design
1. Open browser dev tools (F12)
2. Toggle device toolbar to mobile size
3. Verify:
   - Navigation collapses properly
   - Forms stack vertically
   - Buttons are accessible
   - Text is readable

### Test 9: Session Timeout
1. Login successfully
2. Close browser/clear cookies
3. Try accessing `/dashboard.html` directly
4. Should redirect to login page

### Test 10: Error Handling
1. Try logging in with wrong password - Should see error message
2. Try registering with existing email - Should show error
3. Try adding trip without selecting mountain - Should show error
4. Try sending friend request to yourself - Should show error

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /"
- **Solution:** Server might not be running. Check terminal and restart with `node app.js`

### Issue: Mountains dropdown is empty
- **Solution:** Database not initialized. Run `node dbInit.js` to populate

### Issue: Login fails even with correct password
- **Solution:** Database password column might be missing. Run `node dbInit.js` again

### Issue: Images not showing
- **Solution:** Verify images exist in `public/bilder/` directory. They should be named: fanaråken.jpg, oksen.jpg, etc.

### Issue: Friend request not working
- **Solution:** Both users must be logged out, then logged back in for friendship list to update. Page refresh may be needed.

---

## 📊 Expected Behavior

### After Login
- Dashboard shows user's mountains in "My Mountain Climbs"
- Friend requests section shows pending invites
- Friends list shows accepted friends
- Navigation bar shows user's current page

### After Adding Trip
- New trip immediately appears in "My Mountain Climbs"
- Trip card shows: mountain name, date, height, duration, notes
- Delete button is available
- Edit button is available (UI only, functionality coming soon)

### Friend System
- Requests are one-way (person A requests, person B approves)
- Once accepted, both see each other in friends list
- Only friends can see each other's trip details
- Can remove friends by clicking "Remove" button

### Mountains Data
- 9 mountains total pre-loaded in database
- Each mountain has: name, height, description, region, photo
- Photos are stored in `public/bilder/` folder
- All mountains are from Norwegian regions

---

## 🔍 Browser Console Debugging

Open browser console (F12) and try these commands:

```javascript
// Test login endpoint
fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'harry@potter.com', password: 'harry123' })
}).then(r => r.json()).then(console.log)

// Get all mountains
fetch('/fjell_info').then(r => r.json()).then(console.log)

// Get my trips
fetch('/my-trips').then(r => r.json()).then(console.log)

// Get my friends
fetch('/my-friends').then(r => r.json()).then(console.log)
```

---

## ✨ Features Showcase

### Best Flow for Demo:
1. Create new account
2. Login with new account
3. Add 2-3 mountain trips
4. Create another test account
5. Send friend request from first account
6. Accept from second account
7. View friend's trips on "Friends' Trips" page
8. Show responsive design by toggling mobile view

---

## 📝 Notes

- All new passwords must be at least 6 characters
- All mountain data is read-only (controlled by admin/teacher)
- Each user can only see their own trip details
- Friend relationships are bidirectional once accepted
- Logout clears session - must login again to continue
