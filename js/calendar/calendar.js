console.log("calendar.js loaded");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('session');
// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);
// Test print the current user
console.log(`(calendarJS)The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);