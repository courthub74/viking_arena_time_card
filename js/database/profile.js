// When page is loaded
document.addEventListener('DOMContentLoaded', (e) => {
    // Query the divs for display

    // NAME
    const name_circle = document.getElementById("name_circle");

    // ACCOUNT
    const profile_acct_type = document.getElementById("profile_acct_type");

    // PIN NUMBER
    const profile_pin_type = document.getElementById("profile_pin_type");


    // Get the users array from the local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Get the current user from the local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    // If there is no current user, redirect to the login page
    if (!currentUser) {
        window.location.href = "index.html";
    }
    // Get the current user from the users array
    const user = users.find(user => user.username === currentUser.username);
});
