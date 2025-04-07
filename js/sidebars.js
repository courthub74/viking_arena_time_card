// Test print the page
console.log("Sidebars JS file loaded successfully");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('session');
// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);

// Test print the current user
console.log(`The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);

// const logged_name = sessionStorage.getItem('username') ? decodeURIComponent(sessionStorage.getItem('username')) : 'Employee Name Here';
// const logged_acct_type = sessionStorage.getItem('acct_type') ? decodeURIComponent(sessionStorage.getItem('acct_type')) : 'N/A';

// Query the name header
const name_header = document.querySelector("#employee_name");
// Query the slide in profile name
const slide_in_profile_name = document.getElementById('profile_calendar_name');
// Query the slide in account type
const slide_in_account_type = document.getElementById('profile_calendar_account');

// Test print Session Storage
console.log(logged_name);
console.log(logged_acct_type);


