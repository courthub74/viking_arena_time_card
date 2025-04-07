// Test Print the current user
// First get the current user from the session storage
// var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

// Then print the current user
// console.log(`The current user is: ${currentUser.username}`);

// Retrieve the current user from session storage
var currentUser = sessionStorage.getItem('session');
// Parse the current user from JSON string to object
var currentUser = JSON.parse(currentUser);

console.log(`The current user is: ${currentUser.username}`);
// Check if the current user is null or undefined
if (currentUser === null || currentUser === undefined) {
    // If the user is not logged in, redirect to the login page
    window.location.href = '../../index.html';
}


// Query the logout button from the dashboard page
const logoutManager = document.getElementById('logout_manager');

// Log out function
function logoutUser() {
    // Clear session storage
    sessionStorage.removeItem('currentUser');

    // Redirect to login page
    window.location.href = '../../index.html';
}


