// Test Print Page
console.log("Employee Day Confirm Page Now");

// Retrieve the Day entered Information from the localstorage

// Get logged in user from session storage
const confirmedUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(sessionStorage.getItem('session'));


// Error Handling (in this case if user gets logged out)
if (!confirmedUser) {
    alert("User got logged out");
    // return;
}

// Get all users from local storage
const allUsers = JSON.parse(localStorage.getItem('users')) || [];

// Testers to the console
console.log("All users:", allUsers.map(user => user.username));
console.log("All account types:", allUsers.map(user => user.accountType));
console.log("All hours entered:", allUsers.map(user => user.hours));
console.log(`Current user is ${confirmedUser.username}`);


// Find the logged in user in all users to retrieve the
    // information from the hours array
const confirmedUserIndex = allUsers.findIndex(user => user.username === confirmedUser.username);

// Test the index
console.log(confirmedUserIndex);

// confirmedUserIndex is the current user in the actual database
    // in this case, localStorage

// Error handling 
if (confirmedUserIndex === -1) {
    alert('User not found in database');
    // return;
}

// Get into the hours array for that particular user
const confirmedUserAccountTypeIndex = allUsers.findIndex(user => user.accountType === confirmedUser.accountType);

// Test this Index
console.log(confirmedUserAccountTypeIndex);

// Check if any hours are entered
if (confirmedUserAccountTypeIndex === -1) {
    alert("No Account type in the database");
}

// Retrieve the Day entered Information from the DB