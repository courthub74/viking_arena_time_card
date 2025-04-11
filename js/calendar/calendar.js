console.log("calendar.js loaded");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');


// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);
// Test print the current user
console.log(`(calendarJS)The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);

// Display the current user's name in the header
const calendarNameHeader = document.getElementById('employee_name');
// Decode the username from the session storage
const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';
console.log(`(calendarJS)The logged in name is: ${loggedName}`);
// Set the name header to the logged in user
calendarNameHeader.innerHTML = loggedName;

// Query the sidebar for the current user
const sidebarNameHeader = document.getElementById('profile_calendar_name');
// Change the inner HTML of the sidebar name header to the current user's name
sidebarNameHeader.innerHTML = loggedName;
// Decode the account type from the session storage
const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';
console.log(`(calendarJS)The logged in account type is: ${loggedAccountType}`);
// Set the account type header to the logged in user
const sidebarAccountTypeHeader = document.getElementById('profile_calendar_account');
// Change the inner HTML of the sidebar account type header to the current user's account type
sidebarAccountTypeHeader.innerHTML = loggedAccountType;