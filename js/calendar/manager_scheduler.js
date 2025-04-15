console.log("manager_scheduler.js loaded");

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('currentUser') || sessionStorage.getItem('session');

// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);

// Test Print
console.log(`(manager_schedulerJS)The Current User is: ${currentUser.username}`);

// Display the current users's name in the header
const managerNameSidebar = document.getElementById('profile_scheduler_name');

// Decode the username from the session storage
const loggedName = currentUser.username ? decodeURIComponent(currentUser.username) : 'Not Logged In';

// Test Print the logged user
console.log(`(manager_schedulerJS)The logged in name is: ${loggedName}`);

// Set the name header to logged in user
managerNameSidebar.innerHTML = loggedName;

// Query the sidebar for the current user
const managerAccountSidebar = document.getElementById('profile_scheduler_account');

// Decode the account type from the session storage
const loggedAccountType = currentUser.accountType ? decodeURIComponent(currentUser.accountType) : 'Not Logged In';

// Test Print the account type
console.log(`(manager_schedulerJS)The logged in account type is: ${loggedAccountType}`);

// change the innerHTML of sidebar account type header to the current user's account type
managerAccountSidebar.innerHTML = loggedAccountType;


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// THIS IS WHERE YOU LOOP THROUGH THE EMPLOYEES FOR EMPLOYEE HOURS BUTTONS


// FIRST RETRIEVE THE USERS FROM THE LOCAL STORAGE BASE

// FIRST RETRIEVE THE USERS FROM THE MONGO DB 
