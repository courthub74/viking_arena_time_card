// Test print the page
console.log("Sidebars JS file loaded successfully");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('session');
// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);

// Test print the current user
console.log(`(sidebarJS)The current user is: ${currentUser.username} and their role is: ${currentUser.accountType} session: ${currentUser.sessionId}`);

// User name from session storage
const logged_name = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';
// Account type from session storage
const logged_acct_type = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'N/A';
// Test print the logged in user name
console.log(`(sidebarJS)The logged in user is: ${logged_name}`);
// Test print the logged in user account type
console.log(`(sidebarJS)The logged in user account type is: ${logged_acct_type}`);
// Test print the logged in user account type
// console.log(`(sidebarJS)The logged in user account type is: ${currentUser.accountType}`);
// const logged_acct_type = currentUser.accountType;

// Query the name header
const name_header = document.querySelector("#employee_name");
// Query the slide in profile name
const slide_in_profile_name = document.getElementById('profile_calendar_name');
// Query the slide in account type
const slide_in_account_type = document.getElementById('profile_calendar_account');


// Set the name header to the logged in user
name_header.innerHTML = logged_name;

// Set the sidebar elements to the logged in user
slide_in_profile_name.innerHTML = logged_name;
slide_in_account_type.innerHTML = logged_acct_type;


